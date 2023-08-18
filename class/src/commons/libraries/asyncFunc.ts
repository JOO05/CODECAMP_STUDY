import type { FormEvent } from "react"

export const wrapAsync = (asyncFunc: ()=>Promise<void>) => () => {
  void asyncFunc()
}
export const wrapFormAsync = (asyncFunc: ()=>Promise<void>) => (event:FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  void asyncFunc()
}
export const wrapOnChangeAsync = <C>(asyncFunc: (event:C)=>Promise<void>) => (event:C) => {
  void asyncFunc(event)
}
/* asyncFunc() 안에 어떤 이벤트도 넣지 않고 있기 때문에
오류가 발생한다. */