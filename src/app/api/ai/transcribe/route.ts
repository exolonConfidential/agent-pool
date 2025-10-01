// app/api/ai/transcribe/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const audioDataUrl: string | undefined = body?.audioBase64;

    if (!audioDataUrl) {
      return NextResponse.json(
        { error: "audioBase64 is required" },
        { status: 400 }
      );
    }

    // split "data:audio/webm;base64,AAAA..." into the mime and raw base64
    const parts = audioDataUrl.split(",");
    if (parts.length !== 2) {
      return NextResponse.json({ error: "Invalid data URL" }, { status: 400 });
    }
    const meta = parts[0]; // e.g. data:audio/webm;base64
    const base64Data = parts[1]; // the raw base64 string
    const mimeMatch = meta.match(/data:(.*);base64/);
    const mimeType = mimeMatch?.[1] ?? "audio/webm";

    // Prepare contents for the generateContent call: text instruction + inline audio
    const contents = [
      {
        text: "Transcribe the audio and then reply conversationally based on its content.",
      },
      {
        inlineData: {
          mimeType,
          data: base64Data, // <-- raw base64 (no "data:...," prefix)
        },
      },
    ];

    // Choose a multimodal model available to your project (example)
    const model = "gemini-2.5-flash"; // pick the model you have access to

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    // The SDK examples return `response.text` (string) with the generated text.
    const replyText = response?.text ?? "";

    return NextResponse.json({ reply: replyText });
  } catch (err: any) {
    console.error("Transcription error:", err);
    return NextResponse.json(
      { error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
