export default function Child1(props:any):JSX.Element {
  return(
    <>
      <div>자식 1 {props.count}</div>
      <button onClick={props.onClickCount}>카운트 올리기!!!</button>
    </>
  )
}