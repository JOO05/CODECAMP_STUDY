import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function FunctionCounterPage():JSX.Element {
  const router = useRouter()

  // state = {count:0}
  const [count, setCount] = useState(0)

  // componentDidMount(): void {console.log("그려지고 나서 실행")}
  useEffect(()=> {console.log("그려지고 나서 실행")},[])

  // componentDidUpdate(): void {console.log("변경되고 나서 실행")}
  useEffect(()=> {console.log("변경되고 나서 실행")})

  // componentWillUnmount(): void {console.log("사라지기 전 실행")} 
  useEffect(()=> {return () => {console.log("사라지기 전 실행")}},[])

  // onClickCountUp = (): void => {console.log(this.state.count)this.setState({count: 1})}
  const onClickCountUp = (): void => {console.log(count);setCount(1);}

  // onClickMove = (): void => {void Router.push("/") } 
  const onClickMove = (): void => {void router.push("/") }

  // 1. useEffect 하나로 합치기
  useEffect(()=> {
    console.log("그려지거나 변경되고 나서 실행")
    return () => {console.log("사라지기 전 실행")}
  })
  // 2. useEffect 잘못된 사용법
  useEffect(()=> {
    setCount(1)
  },[count])

  // render():JSX.Element {return (<div><div>{this.state.count}</div>
  //       <button onClick={this.onClickCountUp}>카운트 올리기</button>
  //       <button onClick={this.onClickMove}>나가기</button></div>)}
  return (<div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
      <button onClick={onClickMove}>나가기</button>
    </div>)
}