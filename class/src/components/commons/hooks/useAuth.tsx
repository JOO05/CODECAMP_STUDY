import { useEffect } from "react"
import { useRouter } from "next/router"

export const useAuth = ():void => {
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem("accessToken")===null){
      alert("로그인 ㄱ")
      void router.push("/z_quiz/section46/02")
    }},[])
}