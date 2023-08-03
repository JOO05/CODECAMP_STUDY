export default function Section45():JSX.Element {
  const quizCheck = (num:number) => () => {
    console.log(num)
  }
  return <button onClick={quizCheck(123)}>버튼</button>
}