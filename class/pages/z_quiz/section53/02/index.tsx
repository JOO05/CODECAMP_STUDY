import { type ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
import { wrapOnChangeAsync } from "../../../../src/commons/libraries/asyncFunc"
import type { IMutation, IMutationCreateBoardArgs, IMutationUploadFileArgs } from "../../../../src/commons/types/generated/types"
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
      writer
      title
      contents
      images
    }
  }
`
interface IFormData {
  writer:string
  password:string
  title:string
  contents:string
}
export default function ImageUploadPage():JSX.Element {
  const { register, handleSubmit } = useForm<IFormData>()
  const [imageUrl, setImageUrl] = useState("")
  const [file, setFile] = useState<File>()
  const [myFunction] = useMutation<Pick<IMutation,"createBoard">,IMutationCreateBoardArgs>(CREATE_BOARD)
  const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">,IMutationUploadFileArgs>(UPLOAD_FILE)

  const onClickSubmit = async (data:IFormData) : Promise<void> => {
    try{
      const resultFile = await uploadFile({variables:{file}})
      const url = resultFile.data?.uploadFile.url
      if (url === undefined) return;
      await myFunction({
        variables:{
          createBoardInput: {
            writer:data.writer, password:data.password, 
            title:data.title, contents:data.contents, images: [url]
          }
        }
      })
      alert("등록 완료")
    } catch(error) {
      if (error instanceof Error){
        alert(error.message)
      }
    }
  }
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>):Promise<void> => {
    const file = event.target.files?.[0]
    if (file === undefined) return;
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result)
        setFile(file)
      }
    }
  }
  return (
    <>
      작성자: <input type='text' {...register("writer")} /><br />
      비밀번호: <input type='password' {...register("password")}  /><br />
      제목: <input type='text' {...register("title")}  /><br />
      내용: <input type='text' {...register("contents")}  /><br />
      <input type="file" onChange={wrapOnChangeAsync(onChangeFile)} />
      <img src={imageUrl} />
      <button onClick={wrapOnChangeAsync(handleSubmit(onClickSubmit))}>게시글 등록</button>
    </>
  )
}