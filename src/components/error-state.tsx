"use client"

import { AlertCircleIcon } from "lucide-react"

interface props {
    title: string,
    description: string
}

export const ErrorState = ( {title, description}: props) =>{
    
    return(
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col gap-y-6 p-10 shadow-sm items-center justify-center bg-background rounded-lg">
                <AlertCircleIcon className="size-6 text-red-500"/>
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}