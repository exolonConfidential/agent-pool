"use client";

import { Button } from "@/components/ui/button";

interface Prop {
  startRecording: () => void
  stopRecording: () => void
  isRecording: boolean
}

export const RecordButtons = ({startRecording, stopRecording, isRecording}: Prop) => {
  
  return (
    <div className="flex gap-2">
      <Button
        onClick={startRecording}
        disabled={isRecording}
        className="bg-green-600 px-3 py-1 rounded"
      >
        {isRecording ? "Listening" : "Ask Agent"}
      </Button>
      <Button
        onClick={stopRecording}
        disabled={!isRecording}
        className="bg-red-600 px-3 py-1 rounded"
      >
        Send
      </Button>
    </div>
  );
};


