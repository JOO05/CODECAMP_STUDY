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
  return <></>
}
