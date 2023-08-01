import { gql, useMutation } from "@apollo/client"
import { type ChangeEvent, useState, useRef } from "react"
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/types"
const UPLOAD_FILE = gql`
  mutation uploadFile($file:Upload!) {
    uploadFile(file:$file){
      url
    }
  }
`
export default function ImageUploadPage():JSX.Element {
  const [imageUrl, setImageUrl] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const [uploadFile] = useMutation<
  Pick<IMutation,"uploadFile">,
  IMutationUploadFileArgs>(UPLOAD_FILE)

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>):Promise<void> => {
    const file = event.target.files?.[0]
    console.log(file)
    const result = await uploadFile({ variables: {file}})
    console.log(result.data?.uploadFile.url)
    setImageUrl(result.data?.uploadFile.url ?? "")
  }
  const onClickImage = (): void => {
    // document.getElementById("파일태그ID")?.click()
    fileRef.current?.click();
  }
  return (
    <>
      <div style={{width:"100px", height:"100px", backgroundColor:"gray"}} onClick={onClickImage}>이미지 선택</div>
      <input type="file" onChange={onChangeFile} style={{display:"none"}} ref={fileRef} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} alt="" />
    </>
  )
}
