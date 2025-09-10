"use client"
import { StreamTheme, useCall } from "@stream-io/video-react-sdk"
import { useState } from "react"
import { CallLobby } from "./call-lobby"
import { CallActive } from "./call-active"
import { CallEnd } from "./call-end"

interface Prop {
    meetingName: string
}

export const CallUi = ({meetingName}:Prop) =>{
    const call = useCall()
    const [show,setShow] = useState<"lobby" | "call" | "ended">("lobby");
    const handleJoin = async() =>{
        if(!call ) return;
         await  call.join();
         setShow("call")
    }
    const handleLeave =  () =>{
        if(!call) return;
        call.endCall();
        setShow("ended")
    }

    return (
        <StreamTheme className="h-full w-full"> 
            {show === "lobby" && <CallLobby onJoin={handleJoin}/>}
            {show === "ended" && <CallEnd/>}
            {show === "call" && <CallActive onLeave = {handleLeave} meetingName={meetingName}/>}
        </StreamTheme>
    )
}