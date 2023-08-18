import { gql, useMutation } from "@apollo/client"
import { type ChangeEvent, useState } from "react"
import type { IMutation, IMutationLoginUserArgs } from "../../../../src/commons/types/generated/types"
import { useRecoilState } from "recoil"
import { accessTokenState } from "../../../../src/commons/stores"
import { useRouter } from "next/router"
import { wrapFormAsync } from "../../../../src/commons/libraries/asyncFunc"
const LOGIN_USER =gql`
  mutation loginUser($email:String!, $password:String!){
    loginUser(email:$email,password:$password){
      accessToken
    }
  }
`
export default function LoginPage():JSX.Element {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser] = useMutation<Pick<IMutation,"loginUser">,IMutationLoginUserArgs>(LOGIN_USER)
  const [, setAccessToken] = useRecoilState(accessTokenState)
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>):void => {
    setEmail(event.currentTarget.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>):void => {
    setPassword(event.currentTarget.value)
  }
  const onClickLogin = async ():Promise<void> => {
    try {
      const result = await loginUser({variables: { email, password }}) 
      const accessToken = result.data?.loginUser.accessToken

      if (accessToken=== undefined) {
        alert("로그인 실패")
        return ;}
      setAccessToken(accessToken)
      localStorage.setItem("accessToken", accessToken)
      void router.push("/z_quiz/section50/loading")
    } catch(error) {
      if (error instanceof Error ) alert(error.message)
    }
  }
  return (
    <form  onSubmit={wrapFormAsync(onClickLogin)}>
    이메일: <input type="text" onChange={onChangeEmail} />
    비밀번호: <input type="password" onChange={onChangePassword} />
    <button>로그인</button>
    </form>
  )
}