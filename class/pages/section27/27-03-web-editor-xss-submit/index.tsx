import dynamic from "next/dynamic"
import 'react-quill/dist/quill.snow.css';
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const ReactQuill = dynamic(async()=> await import("react-quill"),{ssr:false})

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){ 
    createBoard(createBoardInput: $createBoardInput){ 
      _id
      writer
      title
    }
  }
`
export default function WebEditorPage():JSX.Element {
  const router = useRouter()
  const [myFunction] = useMutation(CREATE_BOARD)
  const { register, handleSubmit, setValue, trigger } = useForm({mode:"onChange"})

  const onChangeContents = (value:string): void => {
    console.log(value)
    setValue("contents",value === "<p><br></p>" ? "" : value)
    void trigger("contents")
  }
  const onClickSubmit = async (data: any):Promise<void> => {
    const result = await myFunction({
      variables:{
        createBoardInput: {
          writer:data.writer, password:data.password, 
          title:data.title, contents:data.contents
        }
      }
    }) // 요청을 기다려야 하므로 await
    const {Modal} = await import("antd")
    Modal.success({content:"등록 성공"})

    const boardId = result.data.createBoard._id
    void router.push(`/section27/27-04-web-editor-hydration/${boardId}`)
  }
  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} /><br/>
      비밀번호: <input type="password" {...register("password")} /><br/>
      제목: <input type="text" {...register("title")} /><br/>
      내용: <ReactQuill onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  )
}