import { useEffect } from "react"
import { useRouter } from "next/router"

export const useAuth = ():void => {
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem("accessToken")===null){
      alert("로그인 ㄱ")
      void router.push("/section23/24-05-custom-hooks-use-auth")
    }},[])
}