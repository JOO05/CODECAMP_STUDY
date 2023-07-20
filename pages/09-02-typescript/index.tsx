export default function Tsx() {
  //선언과 할당 동시
  let a:string = "안녕"
  //선언과 할당 분리
  let b:string
  b="인사"
  //배열타입
  let f: number[] = [1,2,3]

  //타입 추측 (string으로 추측한다. 따라서 숫자로 재할당은 불가하다.)
  let h = "h"
  h="k"
  //객체타입
  interface IProfile {
    name: string
    age: number|string
    school: string
  }
  const profile:IProfile = {
    name:"철수",
    age:8,
    school:"초등학교"
  }
  profile.age="8"

  //함수타입
  const add = (n1:number,n2:number,unit:string) => {
    return n1 + n2 + unit
  }
  const g = add(10,20,"원")
  //any타입 (어느 값을 넣어도 된다.)
  let q:any = "sdf"
  q=1
  q=false
  return <></>
}