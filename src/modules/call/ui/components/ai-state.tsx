"use client" 


interface prop {
    isThinking: boolean;
    isRecording: boolean;
}

export const AiState = ({isThinking, isRecording}: prop) =>{
    return (
        <div className="flex items-center justify-center w-full py-2">
            {isThinking && "Thinking..."}
            {isRecording && "Listening..."}
        </div>
    )
}