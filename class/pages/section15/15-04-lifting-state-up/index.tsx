import { useState } from 'react'
import Child1 from '../../../src/components/units/board/15-lifting-state-up/Child1'
import Child2 from '../../../src/components/units/board/15-lifting-state-up/Child2'
export default function CounterStatePage():JSX.Element {
  const [count, setCount] = useState(0)
  const onClickCount = ():void => {
    setCount((prev)=> prev + 1)
  }
  return(
    <>
      <Child1 count={count} onClickCount={onClickCount} />
      <div>==========</div>
      <Child2 count={count} onClickCount={onClickCount} />
    </>
  )
}