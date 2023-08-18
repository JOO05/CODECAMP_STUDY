import { memo } from "react"

interface IWordProps { el: string }
function Word(props:IWordProps):JSX.Element {
  console.log("자식 렌더링",props.el)
  return <div>{props.el}</div>
}
export default memo(Word)