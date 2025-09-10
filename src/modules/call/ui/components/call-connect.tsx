"use client";

import { useTRPC } from "@/trpc/client";
import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { CallUi } from "./call-ui";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
    const trpc = useTRPC()
    const generateToken = useMutation(
        trpc.meetings.generateToken.mutationOptions()
    )
    const [client, setClient] = useState<StreamVideoClient>();
    useEffect(()=>{
        const _client  = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage
            },
            tokenProvider: generateToken.mutateAsync
        });
        setClient(_client)
      return () =>{
        _client.disconnectUser();
        setClient(undefined)
      }
    },[userId, userName,userImage, generateToken.mutateAsync])

    const [call, setCall] = useState<Call>()
    useEffect(()=>{
      if(!client) return;
      const _call = client.call("default",meetingId);
      _call.camera.disable();
      _call.microphone.disable();
      setCall(_call);

      return () =>{
        if(_call.state.callingState !== CallingState.LEFT){
          _call.leave();
          _call.endCall();
          setCall(undefined)
        }
      }
    },[client,meetingId])

  if(!call || !client){
    return (
      <div className="flex h-screen itmes-center justify-cetner bg-radial from-sidebar-accent to-sidebar">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUi meetingName={meetingName}/>
      </StreamCall>
    </StreamVideo>
  )
};
