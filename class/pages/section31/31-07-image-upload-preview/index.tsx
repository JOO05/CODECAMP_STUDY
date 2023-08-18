import { type ChangeEvent, useState } from "react"
import { wrapOnChangeAsync } from "../../../src/commons/libraries/asyncFunc"
export default function ImageUploadPage():JSX.Element {
  const [imageUrl, setImageUrl] = useState("")
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>):Promise<void> => {
    const file = event.target.files?.[0]
    if (file === undefined) return;
    console.log(file)

    // 내 브라우저에서만 접근 가능한 가짜 url
    const result = URL.createObjectURL(file)
    console.log(result)

    // 다른 브라우저에서도 접근 가능한 진짜 url
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (event) => {
      console.log(event.target?.result)
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result)
      }
    }
  }
  return (
    <>
      <input type="file" onChange={wrapOnChangeAsync(onChangeFile)} />
      <img src={imageUrl} />
    </>
  )
}