import { type ComponentType, useEffect, type ReactElement } from "react"
import { useRouter } from "next/router"

export const loginCheck = (Component:ComponentType) =>
 <P extends Record<string, unknown>>(props:P):ReactElement<P> => {
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem("accessToken")===null){
      alert("로그인 ㄱ")
      void router.push("/")
    }},[])
  return <Component {...props} />
}