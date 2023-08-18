import { gql, useMutation } from "@apollo/client"
import { type ChangeEvent, useState } from "react"
import type { IMutation, IMutationLoginUserExampleArgs } from "../../../src/commons/types/generated/types"
import { useRecoilState } from "recoil"
import { accessTokenState } from "../../../src/commons/stores"
import { useRouter } from "next/router"
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc"
const LOGIN_USER =gql`
  mutation loginUserExample($email:String!, $password:String!){
    loginUserExample(email:$email,password:$password){
      accessToken
    }
  }
`
export default function LoginPage():JSX.Element {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUserExample] = useMutation<Pick<IMutation,"loginUserExample">,IMutationLoginUserExampleArgs>(LOGIN_USER)
  const [, setAccessToken] = useRecoilState(accessTokenState)
  
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>):void => {
    setEmail(event.currentTarget.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>):void => {
    setPassword(event.currentTarget.value)
  }
  const onClickLogin = async ():Promise<void> => {
    try {
      const result = await loginUserExample({variables: { email, password }}) 
      const accessToken = result.data?.loginUserExample.accessToken

      if (accessToken=== undefined) {
        alert("로그인 실패")
        return ;}
      setAccessToken(accessToken)
      void router.push("/section30/30-01-login-refreshtoken-success")
    } catch(error) {
      if (error instanceof Error ) alert(error.message)
    }
  }

  return (
    <>
    이메일: <input type="text" onChange={onChangeEmail} />
    비밀번호: <input type="password" onChange={onChangePassword} />
    <button onClick={wrapAsync(onClickLogin)}>로그인</button>
    </>
  )
}