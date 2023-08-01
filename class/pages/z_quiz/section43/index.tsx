import Presenter from "./1";
import { useState } from "react";
export default function Container():JSX.Element {
  const [state, setState] = useState(0)
  const s = ():void => {
    setState(qwer => qwer + 1)
  }
  ["철수", "영희", "훈이", "맹구"].forEach((p,index) => {
    console.log(`${p}는 ${index+1}번째 칸에 들어있습니다.`)
  })
  return (
    <>
      <button onClick={s}>{state}</button>
      {Presenter({child:"철수",age:13})}
    </>
  );
}