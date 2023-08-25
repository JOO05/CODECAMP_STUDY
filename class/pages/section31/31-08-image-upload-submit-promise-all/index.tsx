import { type ChangeEvent, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { wrapOnChangeAsync } from "../../../src/commons/libraries/asyncFunc"
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/types"
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
  const [imageUrls, setImageUrls] = useState(["","",""])
  const [files, setFiles] = useState<File[]>([])
  // 진짜 보내지는 파일 안에 파일 1, 파일 2, 파일 3이 들어간다.
  const [myFunction] = useMutation(CREATE_BOARD)

  const [uploadFile] = useMutation<
  Pick<IMutation,"uploadFile">,
  IMutationUploadFileArgs>(UPLOAD_FILE)

  const onClickSubmit = async () : Promise<void> => {
    // Promise 예제 리팩토링
    const results = await Promise.all(
      files.map(async(el)=> await uploadFile({variables:{file: el}}))
    )
    const resultUrls = results.map(el=>el.data?.uploadFile.url)
    
    const result = await myFunction({
      variables:{
        createBoardInput: {
          writer:"철", password:"1", title:"내",
          contents:"ㅋ", images: resultUrls
        }
      }
    })
    console.log(result)
  }
  const onChangeFile = (index:number) => async (event: ChangeEvent<HTMLInputElement>):Promise<void> => {
    const file = event.target.files?.[0]
    if (file === undefined) return;

    const result = URL.createObjectURL(file)
    console.log(result)

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        const tempUrls = [...imageUrls]
        tempUrls[index] = event.target?.result
        setImageUrls(tempUrls)
        const tempFiles = [...files]
        tempFiles[index] = file
        setFiles(tempFiles)
      }
    }
  }
  return (
    <>
      <input type="file" onChange={wrapOnChangeAsync(onChangeFile(0))} />
      <input type="file" onChange={wrapOnChangeAsync(onChangeFile(1))} />
      <input type="file" onChange={wrapOnChangeAsync(onChangeFile(2))} />
      <img src={imageUrls[0]} />
      <img src={imageUrls[1]} />
      <img src={imageUrls[2]} />
      <button onClick={wrapOnChangeAsync(onClickSubmit)}>게시글 등록</button>
    </>
  )
}