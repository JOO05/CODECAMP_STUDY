import axios from 'axios'
import { useState } from 'react'

export default function RestGetPage(){
  const [title, setTitle] = useState("")
  function onClickAsync(){
    const result = axios.get("https://koreanjson.com/posts/1")
    console.log(result)
  }

  async function onClickSync(){
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log(result)
    console.log(result.data)
    console.log(result.data.title)
    setTitle(result.data.title)
  }

  return (
    <>
      <button onClick={onClickAsync}>rest-api(비동기) 요청하기</button>
      <button onClick={onClickSync}>rest-api(동기) 요청하기</button>
      <div>{title}</div>
    </>
  )
}