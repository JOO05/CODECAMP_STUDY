const getPrimitive = (arg1:string, arg2:number, arg3:boolean):[boolean,number,string] => {
  return [arg3,arg2,arg1]
}
getPrimitive("철수",123,true)

const getAny = (arg1:any, arg2:any, arg3:any):[any,any,any] => {
  console.log(arg1 * 1000)
  // 에러 없이 실행된다.
  return [arg3,arg2,arg1]
}
getAny("철수",123,true)

const getUnknown = (arg1:unknown, arg2:unknown, arg3:unknown):[unknown,unknown,unknown] => {
  console.log(arg1 * 1000)
  // any 타입과 다르게 빨간 줄에 쳐진다. 따라서 typeof arg1이 숫자일 때만 찍히게 해준다.
  return [arg3,arg2,arg1]
}
getUnknown("철수",123,true)

function getGeneric<MyType1, MyType2, MyType3>(arg1:MyType1, arg2:MyType2, arg3:MyType3):[MyType3,MyType2,MyType1]{
  return [arg3,arg2,arg1]
}
getGeneric<string, number, boolean>("철수",123,true)
// any와 똑같이 사용 가능하나 넣는 순간 넣은 것으로 타입이 고정된다.
// 함수 사용할 때 앞에 <string, number, boolean>를 넣으면 넣기 전에 타입이 고정된다.
const getGeneric2 = <M1, M2, M3>(arg1:M1, arg2:M2, arg3:M3):[M3,M2,M1] => {
  return [arg3,arg2,arg1]
}
getGeneric2<string, number, boolean>("철수",123,true)