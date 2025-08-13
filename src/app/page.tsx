import { auth } from "@/lib/auth"
import { HomeView } from "@/modules/home/ui/views/home"
import { headers } from "next/headers"
import { redirect } from "next/navigation"  // this is a server side component we can't use useRouter from next/navigation


const page = async()=>{
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/auth/sign-in")
  }
  return (
    <HomeView/>
  )
}
export default page