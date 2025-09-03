
import {z } from "zod"

export const agentInsertShcema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    instructions: z.string().min(1, {message: "Instructions are required"}),
})

export const agentUpdataShcema  = agentInsertShcema.extend({
    id: z.string().min(1,{message: "Id is required"})
})