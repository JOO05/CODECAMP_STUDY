import { useState } from 'react'

export default function CounterStatePage(){
  const [count, setCount] = useState(0)

  function handleClickCountUp(){
    setCount((prev) => prev +1)
    setCount((prev) => prev +1)
  }

  return(
    <>
      <div>{count}</div>
      <button onClick={handleClickCountUp}>카운트 올리기!!!</button>
    </>
  )
}