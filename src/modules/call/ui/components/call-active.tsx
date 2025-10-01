"use client";

import {
  Call,
  CallControls,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";
import { RecordButtons } from "./record-buttons";
import { useAudioRecorder } from "@/lib/audio-recorder";
import { toast } from "sonner";
import { useState } from "react";
import { AiState } from "./ai-state";
import { useCall } from "@stream-io/video-react-sdk";
import { base64PcmToWavUrl ,pcmToWav} from "@/lib/pcmToWave";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();
  const [isThinking, setIsThinking] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const userCall = useCall();

  const injectAudioIntoCall = async (call: Call, baseAudio64: string) => {
    const sampleRate = 24000;
    const pcmBytes = Uint8Array.from(atob(baseAudio64), (c) => c.charCodeAt(0));

    // 2. Convert PCM → WAV
    const wavBuffer = pcmToWav(pcmBytes.buffer, sampleRate);

    // 3. Decode
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(wavBuffer);

    // 4. Create MediaStreamDestination
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    const dest = audioCtx.createMediaStreamDestination();
    source.connect(dest);
    source.start();
    // publish AI audio into the Stream call
    await call.publish(dest.stream, 1);


    const url = base64PcmToWavUrl(baseAudio64, 24000, 1);

      const audio = new Audio(url);
      audio.play();

    // 🔄 cleanup when audio finishes
    source.onended = () => {
      call.stopPublish();
    };
  };

  const handleStart = () => {
    if (!localParticipant?.audioStream) {
      toast.error("Turn on mic");
      return;
    }
    startRecording(localParticipant.audioStream);
  };

  const handleStop = async () => {
    const base64 = await stopRecording();
    if (!base64) return;

    try {
      setIsThinking(true);
      

      const res = await fetch("/api/ai/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioBase64: base64 }),
      });

      const data = await res.json();
      

      const ttsRes = await fetch("/api/ai/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.reply }),
      });

      const ttsData = await ttsRes.json();
      if (!ttsData.audioBase64) toast.error("Some error occured")

      // convert base64 → Blob
      const { audioBase64 } = ttsData;

      
      if (userCall) {
        await injectAudioIntoCall(userCall, audioBase64);
      }
    } catch (err) {
      toast.error("Some error occurred");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
        <Link
          href={"/"}
          className="flex items-center justify-center p-1 bg-white/10 rounded-full"
        >
          <Image src={"/logo.svg"} width={22} height={22} alt="Logo" />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <AiState isRecording={isRecording} isThinking={isThinking} />
      <div className="bg-[#101213] flex gap-x-2 justify-center items-center rounded-full px-4">
        <CallControls onLeave={onLeave} />
        <RecordButtons
          isRecording={isRecording}
          startRecording={handleStart}
          stopRecording={handleStop}
        />
      </div>
    </div>
  );
};
