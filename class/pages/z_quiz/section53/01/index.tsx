import { useCallback, useMemo, useState } from "react"
import MemoizationChildPage from "./child"
export default function Section53Quiz01():JSX.Element{
  console.log("컨테이너가 렌더링 됩니다.")
  let countLet = 0
  const [countState,setCountState] = useState(0)

	const onClickCountLet = useCallback(():void=> {countLet += 1},[])

	const onClickCountState = useMemo(()=>():void=>
		{setCountState((prev)=>prev+1)},[])

  const a = useMemo(()=>Math.random(),[])
  console.log(a)

  return (
    <>
			<div> 카운트(let): {countLet} </div>
			<button onClick={onClickCountLet}> 카운트(let)</button>
			<div> 카운트(state): {countState} </div>
			<button onClick={onClickCountState}> 카운트(state)</button>
			<div> 카운트(state): {countState} </div>
			<button onClick={():void=>{setCountState((prev)=>prev+1)}}> 카운트(state)</button>
			<MemoizationChildPage />
		</>
	)
}