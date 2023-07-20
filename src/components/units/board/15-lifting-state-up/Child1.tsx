export default function Child1(props:any):JSX.Element {
  function onClickCountUp(): void{
    props.setCount((prev:number) => prev +1)}
  return(
    <>
      <div>자식 1 {props.count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
    </>
  )
}