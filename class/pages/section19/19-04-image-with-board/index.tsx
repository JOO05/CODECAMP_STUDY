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
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){ 
    createBoard(createBoardInput: $createBoardInput){ 
      _id
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
    if (!isValid) return;
    
    const result = await uploadFile({ variables: {file}})
    setImageUrl(result.data?.uploadFile.url ?? "")
  }
  const onClickImage = (): void => {
    fileRef.current?.click();
  }

// 구분

  const [writer, setWriter] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [myFunction] = useMutation(CREATE_BOARD)

  const onClickSubmit = async () : Promise<void> => {
    const result = await myFunction({
      variables:{
        createBoardInput: {
          writer, password:"1", title,
          contents, images: [imageUrl]
        }
      }
    })
    console.log(result)
  }

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>):void => {
    setWriter(e.target.value)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>):void => {
    setTitle(e.target.value)
  }

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>):void => {
    setContents(e.target.value)
  }
  return (
    <>
    작성자: <input type='text' onChange={onChangeWriter} /><br />
    제목: <input type='text' onChange={onChangeTitle} /><br />
    내용: <input type='text' onChange={onChangeContents} /><br />
      <div style={{width:"100px", height:"100px", backgroundColor:"gray"}} onClick={onClickImage}>이미지 선택</div>
      <input type="file" onChange={onChangeFile} style={{display:"none"}} ref={fileRef} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} alt="" />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  )
}
