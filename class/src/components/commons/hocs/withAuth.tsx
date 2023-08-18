import { useEffect } from "react"
import { useRouter } from "next/router"
import { useRecoilValueLoadable } from "recoil"
import { restoreAccessTokenLoadable } from "../../../commons/stores"

export const loginCheck = (Component:any) => (props:any) => {
  const router = useRouter()
  const a = useRecoilValueLoadable(restoreAccessTokenLoadable)

  useEffect(()=>{
    void a.toPromise().then((newAccessToken)=>{
      if (newAccessToken === undefined){
        alert("로그인 ㄱ")
        void router.push("/")
      }
    })
    },[])
  return <Component {...props} />
}