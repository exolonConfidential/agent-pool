
import { auth } from "@/lib/auth"
import { SignUpView } from "@/modules/auth/ui/views/sign-up"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const pageSignup = async ()=>{
    const session = await auth.api.getSession({
        headers: await headers()
      })
    
      if(!!session){
        redirect("/")
      }
    return (
        <SignUpView/>    
    )
}
export default pageSignup

//http://localhost:3000/auth/sign-up