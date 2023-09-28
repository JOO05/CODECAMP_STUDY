import {gql, useMutation} from '@apollo/client'
import { useRouter } from 'next/router'
import { type ChangeEvent, useState } from 'react'
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){ 
    createBoard(createBoardInput: $createBoardInput){ 
      _id
      writer
      title
      contents
    }
  }
`
export default function JestUnitTestMocking():JSX.Element{
  const router = useRouter()
  const [writer, setWriter] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [myFunction] = useMutation(CREATE_BOARD)
  const onClickSubmit = async ():Promise<void> => {
    const result = await myFunction({
      variables:{
        createBoardInput:{
          writer, title, contents, password:"1"
        }
      }
    })
    alert(result.data.createBoard.message)
    const boardId = result.data.createBoard._id
    router.push(`/boards/${boardId}`)
  }
  const onChangeWriter = (e:ChangeEvent<HTMLInputElement>):void => {
    setWriter(e.target.value)}

  const onChangeTitle = (e:ChangeEvent<HTMLInputElement>):void => {
    setTitle(e.target.value)}

  const onChangeContents = (e:ChangeEvent<HTMLInputElement>):void => {
    setContents(e.target.value)}
  return (
    <div>
      작성자: <input type='text' role="input-writer" onChange={onChangeWriter} /><br />
      제목: <input type='text' role="input-title" onChange={onChangeTitle} /><br />
      내용: <input type='text' role="input-contents" onChange={onChangeContents} /><br />
      <button onClick={onClickSubmit} role="submit-button">등록</button>
    </div>
  )
}