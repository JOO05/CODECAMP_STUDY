import axios from 'axios'
import { wrapAsync } from '../../../src/commons/libraries/asyncFunc'
import { useState } from 'react'

export default function isSubmitPage():JSX.Element{
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onClickSync = async ():Promise<void> => {
    setIsSubmitting(true)
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log(result)
    console.log(result.data.title)
    setIsSubmitting(false)
  }
  return <button onClick={wrapAsync(onClickSync)} disabled={isSubmitting}>비동기</button>
}
