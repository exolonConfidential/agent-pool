
import { auth } from "@/lib/auth"
import { SignInView } from "@/modules/auth/ui/views/sign-in"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const pageSignin = async ()=>{

    const session = await auth.api.getSession({
        headers: await headers()
      })
    
      if(!!session){
        redirect("/")
      }
    return (
        <SignInView/> 
    )
}
export default pageSignin


//http://localhost:3000/auth/sign-in