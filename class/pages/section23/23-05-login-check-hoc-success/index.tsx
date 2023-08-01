import { gql, useQuery } from "@apollo/client"
import type { IQuery } from "../../../src/commons/types/generated/types"
import { useEffect } from "react"
import { useRouter } from "next/router"
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`
export default function LoginSuccessPage():JSX.Element {
  const router = useRouter()
  const { data } = useQuery<Pick<IQuery,"fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)
  useEffect(()=>{
    if(localStorage.getItem("accessToken")===null){
      alert("로그인 ㄱ")
      void router.push("/section23/23-05-login-check-hoc")
    }},[])
  /* useEffect 안의 공지 사항이나 이동 경로를 바꿔야 하는 경우 useEffect가
  있는 곳마다 일일히 바꿔야 한다는 단점이 있다. 함수 형태로 따로 뽑아서 쓰게 한다.
  */
 
  return (
    <>{data?.fetchUserLoggedIn.name}님 환영합니다.</>
  )
}