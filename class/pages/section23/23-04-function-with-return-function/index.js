export default function S(){
  // 함수를 반환하는 함수
  function c1 (apple) {
    return function (banana) {
      console.log(banana)
      console.log(apple)
    }
  }

  const a = (apple) => (banana) => {
      console.log(banana)
      console.log(apple)
  }
  a(1)(5)

  /* 괄호를 두 개 하면 b의 내용까지 실행된다. 
  따라서 함수를 실행하면 순서대로 5와 1이 찍힌다. */

  return <></>
}
