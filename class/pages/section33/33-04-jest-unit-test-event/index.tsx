import { useState } from "react"
export default function JestUnitTestEvent():JSX.Element{
	const [count,setCount] = useState(0)
	const onClickCountUp = ():void => {
		setCount((prev) => prev + 1)
	}
	return(
		<>
			<div role="count">{count}</div>
			<button onClick={onClickCountUp} role="count-button">카운트 올리기</button>
		</>
	)
}