import {useState} from "react"

export default function SignUpStatePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailError, setEmailError] = useState("")

  function onChangeEmail(event){
    setEmail(event.target.value)
  }

  function onChangePassword(event){
    setPassword(event.target.value)
  }

  function onClickSignUp(){
    if (email.includes("@") === false){
      //document.getElementById("error").innerText="이메일이 올바르지 않습니다!! @가 없음!!"
      setEmailError("이메일이 올바르지 않습니다!! @가 없음!!")
    } else {
      //메세지 알림 이전, Backend 컴퓨터에 있는 API(함수) 요청하기
      alert("회원가입을 축하합니다!!")
    }
  }
  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail}/>
      <div>{emailError}</div>
      비밀번호: <input type="password" onChange={onChangePassword}/>
      <button onClick={onClickSignUp}>회원가입</button>
    </>
  )
}