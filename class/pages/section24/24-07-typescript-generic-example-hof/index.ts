// 1. HOF 일반 함수
function first<T>(arg1:T){
  return function second<U>(arg2:U): [T,U]{
    return [arg1,arg2]
  }
}
first()()
// 2. 화살표 함수
const first2 = <T>(arg1:T) => <U>(arg2:U): [T,U] => {
    return [arg1,arg2]
}
first2()()
// 3. 로그인 체크 함수
const 로그인체크 = <C>(Component:C) => <P>(props:P): [C,P] => {
  return [Component,props]
}
로그인체크()()