import { useState } from 'react'

export default function CounterStatePage(){
  const result = useState(0)
  function handleClickCountUp(){result[1](result[0]+1)}
  function onClickCountDown(){result[1](result[0]-1)}

  return(
    <>
      <div>{result}</div>
      <button onClick={handleClickCountUp}>카운트 올리기!!!</button>
      <button onClick={onClickCountDown}>카운트 내리기!!!</button>
    </>
  )
}