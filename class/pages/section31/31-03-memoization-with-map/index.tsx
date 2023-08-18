import { useState } from "react"
import Word from "./child"
export default function MemoizationWithMapParentPage():JSX.Element {
  const [data, setData] = useState("가나 다 라마바 사아자차")
  const onClickChange = ():void => {
    setData("가하 다 라파바 사아타차")
  }
  return (
    <>
      {data.split("").map((el,index)=>(
        <Word el={el} key={index} />
      ))}
      <button onClick={onClickChange}>change</button>
    </>
  )
}