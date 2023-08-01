/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { gql, useMutation } from "@apollo/client"
// import { type ChangeEvent, useState, useRef } from "react"
// import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/types"
// import { checkValidationFile } from "../../../src/commons/libraries/validationFile"
// import { LikeOutlined } from "@ant-design/icons"
// const UPLOAD_FILE = gql`
//   mutation uploadFile($file:Upload!) {
//     uploadFile(file:$file){
//       url
//     }
//   }
// `
// const CREATE_BOARD = gql`
//   mutation createBoard($createBoardInput: CreateBoardInput!){ 
//     createBoard(createBoardInput: $createBoardInput){ 
//       _id
//     }
//   }
// `
// export default function ImageUploadPage():JSX.Element {
//   const [imageUrl, setImageUrl] = useState("")
//   const fileRef = useRef<HTMLInputElement>(null)

//   const [uploadFile] = useMutation<
//   Pick<IMutation,"uploadFile">,
//   IMutationUploadFileArgs>(UPLOAD_FILE)

//   const onChangeFile = async (event: ChangeEvent<HTMLInputElement>):Promise<void> => {
//     const file = event.target.files?.[0]
//     const isValid = checkValidationFile(file);
//     if (!isValid) return;
    
//     const result = await uploadFile({ variables: {file}})
//     setImageUrl(result.data?.uploadFile.url ?? "")
//   }
//   const onClickImage = (): void => {
//     fileRef.current?.click();
//   }

// // 구분

//   const [writer, setWriter] = useState('')
//   const [password , setPassword] = useState('')
//   const [title, setTitle] = useState('')
//   const [contents, setContents] = useState('')

//   const [myFunction] = useMutation(CREATE_BOARD)

//   const onClickSubmit = async () : Promise<void> => {
//     await myFunction({
//       variables:{
//         createBoardInput: {
//           writer, password, title,
//           contents, images: [imageUrl]
//         }
//       }
//     })
//     alert("등록 완료")
//   }

//   const onChangeWriter = (e: ChangeEvent<HTMLInputElement>):void => {
//     setWriter(e.target.value)
//   }
//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>):void => {
//     setPassword(e.target.value)
//   }
//   const onChangeTitle = (e: ChangeEvent<HTMLInputElement>):void => {
//     setTitle(e.target.value)
//   }
//   const onChangeContents = (e: ChangeEvent<HTMLInputElement>):void => {
//     setContents(e.target.value)
//   }
//   return (
//     <>
//     작성자: <input type='text' onChange={onChangeWriter} /><br />
//     비밀번호: <input type='text' onChange={onChangePassword} /><br />
//     제목: <input type='text' onChange={onChangeTitle} /><br />
//     내용: <input type='text' onChange={onChangeContents} /><br />

//       <LikeOutlined onClick={onClickImage} rev={undefined} />
//       <input type="file" onChange={onChangeFile} style={{display:"none"}} ref={fileRef} />
//       <img src={`https://storage.googleapis.com/${imageUrl}`} alt="" />
//       <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
//     </>
//   )
// }
import { useEffect, useRef } from "react"

export default function refFocus():JSX.Element {
  const inputE1 = useRef<HTMLInputElement>(null);
  useEffect(()=> {inputE1.current?.focus();},[])
  return (
    <div>
      <input ref={inputE1}/>
    </div>
  )
}