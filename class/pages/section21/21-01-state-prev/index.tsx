import { useState } from 'react'

export default function CounterStatePage():JSX.Element {
  const [count, setCount] = useState(0)
  // 함수 선언식 및 매개변수 변동
  function handleClickCountUp():void {
    setCount(function(p) {
      // 로직 추가 가능
      return p + 1})}

  return(
    <><div>{count}</div>
      <button onClick={handleClickCountUp}>카운트 올리기!!!</button>
    </>
  )
}