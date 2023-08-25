import { memo } from "react"
export default memo(function MemoizationChildPage():JSX.Element {
  console.log("자식이다")
  return <h1>자식</h1>
})