import{ createAvatar}  from "@dicebear/core"
import { botttsNeutral, initials} from "@dicebear/collection"
import { cn } from "@/lib/utils"
import { Avatar,AvatarFallback, AvatarImage} from "./ui/avatar"

interface AvatarProps {
    seed: string,
    className?: string,
    varient: "initials" | "botttsNeutral"
}
export const GeneratedAvatar = ({seed, className, varient}: AvatarProps)=>{
    let avatar
    if(varient === "initials"){
       avatar =  createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42
        })
    } else {
        avatar = createAvatar(botttsNeutral,{
            seed
        })
    }

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}