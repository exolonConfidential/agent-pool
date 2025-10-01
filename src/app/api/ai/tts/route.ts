

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers
  });
   
  if(!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const model = "gemini-2.5-flash-preview-tts"; // Or the correct TTS-capable variant

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text }
          ],
        }
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Kore", // or another supported voice
            },
          },
        }
      }
    });

    const candidate = response.candidates?.[0];
    const inlineData = candidate?.content?.parts?.[0]?.inlineData;

    if (!inlineData?.data) {
      throw new Error("No audio data returned");
    }

    // inlineData.data is a base64 string
    return NextResponse.json({
      audioBase64: inlineData.data,
      mimeType: inlineData.mimeType ?? "audio/wav" // or whatever format is returned
    });
  } catch (err: any) {
    
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
