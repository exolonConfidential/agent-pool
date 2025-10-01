import { db } from "@/db";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import JSONL from "jsonl-parse-stringify";
import { user } from "../../auth-schema";
import { eq, inArray } from "drizzle-orm";
import { agents, meetings } from "@/db/schema";
import { GoogleGenAI } from "@google/genai";

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];
      const UserSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((user) => ({
            ...user,
          }))
        );

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
          }))
        );

      const speakers = [...UserSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const summary = await step.run("summarize-transcript", async () => {
      const ai = new GoogleGenAI({
        /* optionally: apiKey: process.env.GEMINI_API_KEY */
      });

      const resp = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize this meeting: ${JSON.stringify(transcriptWithSpeakers)}`,
      });

      return resp.text;
    });

    await step.run("update-summary", async () => {
      await db
      .update(meetings)
      .set({
        summary: summary,
        status: "completed",
      })
      .where(eq(meetings.id, event.data.meetingId));

    })

  }
);
