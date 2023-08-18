import axios from "axios";
import { Fragment, useState } from "react";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
export default function EventLoop():JSX.Element {
  const [info, setInfo] = useState([])
  const myCallback = ():void => {
    const a = new XMLHttpRequest()
    a.open("get",`http://numbersapi.com/random?min=1&max=200`)
    a.send()
    a.addEventListener("load",(res)=>{
      const num = res.target?.response.split(" ")[0] 
      const b = new XMLHttpRequest()
      b.open("get",`https://koreanjson.com/posts/${num}`)
      b.send()
      b.addEventListener("load",(res)=>{
        const userId = JSON.parse(res.target?.response).UserId 
        const c = new XMLHttpRequest()
        c.open("get",`https://koreanjson.com/posts?userId=${userId}`)
        c.send()
        c.addEventListener("load",(res)=>{
          setInfo(JSON.parse(res.target?.response))
        })
      })
    })
  }
  const myPromise = ():void => {
    void axios.get(`http://numbersapi.com/random?min=1&max=200`)
    .then((q)=>{
      const num = q.data.split(" ")[0]
      return axios.get(`https://koreanjson.com/posts/${String(num)}`)
    })
    .then((qq)=>{
        return axios.get(`https://koreanjson.com/posts?userId=${String(qq.data.UserId)}`)
    })
    .then((qqq)=>{
      setInfo(qqq.data)
    })
  } 
  const myAsyncAwait = async (): Promise<void> => {
    const res1 = await axios.get("http://numbersapi.com/random?min=1&max=200");
    const num = res1.data.split(" ")[0];

    const res2 = await axios.get(`https://koreanjson.com/posts/${num}`);
    const userId = res2.data.UserId;

    const res3 = await axios.get(`https://koreanjson.com/posts?userId=${userId}`);
    setInfo(res3.data)
  }
  console.log(info)
  return (
    <Fragment>
      <button onClick={myCallback}>Callback</button>
      <button onClick={myPromise}>Promise</button>
      <button onClick={wrapAsync(myAsyncAwait)}>AsyncAwait</button>
      {info?.map((info, index) =>
      <>
        <div key={index}>
          {info.title}
        </div><br />
      </>
      )}
    </Fragment>
  )
}