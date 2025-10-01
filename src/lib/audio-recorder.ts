"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

const blobToDataURLBase64 = (track: Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject();
    reader.readAsDataURL(track);
  });
};

export const useAudioRecorder = () => {
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = (audioTrack: MediaStream) => {
    const recorder = new MediaRecorder(audioTrack);
    recorderRef.current = recorder;
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    recorder.onstart = () =>{
      setIsRecording(true);
    }
    recorder.onstop = () =>{
      toast.error("Listening interrupted")
      setIsRecording(false)
    }
    recorder.start();
  };

  const stopRecording = (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!recorderRef.current || recorderRef.current.state === "inactive") {
        toast.error("Some error occured")
        resolve(null);
        return;
      }

      recorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.play()
        const base64 = await blobToDataURLBase64(blob);
        setIsRecording(false);
        resolve(base64);
      };

      recorderRef.current.stop();
      setIsRecording(false);
    });
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
};
