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
  const [imageUrl, setImageUrl] = useState("")
  const [file, setFile] = useState<File>() // 진짜 보내지는 파일
  const [myFunction] = useMutation(CREATE_BOARD)

  const [uploadFile] = useMutation<
  Pick<IMutation,"uploadFile">,
  IMutationUploadFileArgs>(UPLOAD_FILE)


  const onClickSubmit = async () : Promise<void> => {
    // 먼저 파일 업로드를 하고 나서 그 다음에 데이터를 전송해야 한다.
    const resultFile = await uploadFile({variables:{file}})
    const url = resultFile.data?.uploadFile.url
    const result = await myFunction({
      variables:{
        createBoardInput: {
          writer:"철", password:"1", title:"내",
          contents:"ㅋ", images: [url]
        }
      }
    })
    console.log(result)
  }
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>):Promise<void> => {
    const file = event.target.files?.[0]
    if (file === undefined) return;
    console.log(file)

    const result = URL.createObjectURL(file)

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result)
        setFile(file) // 추가된 코드, 이미지 미리보기 보여줌과 동시에 저장한다.
      }
    }
  }
  /* onChangeFile에서가 아닌onClickSumbit이 일어날 때 실제 이미지 파일이
  백엔드에 보내져야 한다 */
  return (
    <>
      <input type="file" onChange={wrapOnChangeAsync(onChangeFile)} />
      <img src={imageUrl} />
      <button onClick={wrapOnChangeAsync(onClickSubmit)}>게시글 등록</button>
    </>
  )
}