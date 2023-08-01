import { gql, useMutation } from "@apollo/client"
import { type ChangeEvent, useState, useRef } from "react"
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/types"
import { checkValidationFile } from "../../../src/commons/libraries/validationFile"
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
    const isValid = checkValidationFile(file);
    if (!isValid) return; // 아랫줄이 실행 안되게끔 함수를 종료한다.
    
    const result = await uploadFile({ variables: {file}})
    setImageUrl(result.data?.uploadFile.url ?? "")
  }
  const onClickImage = (): void => {
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
