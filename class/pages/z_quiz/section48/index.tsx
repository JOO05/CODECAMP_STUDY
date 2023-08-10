import {useQuery, gql, useMutation} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { type ChangeEvent, useState } from 'react'
const FETCH_BOARDS = gql`
  query fetchBoards{
    fetchBoards{
      _id
      writer
      title
      contents
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
    }
  }
`
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId:ID!){
    deleteBoard(boardId:$boardId)
  }
`

export default function FetchBoardsPage():JSX.Element{
  const {data} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  const [myFunction] = useMutation(CREATE_BOARD)
  const [deleteBoard] = useMutation(DELETE_BOARD)
  interface IPrev {
    __ref:string
  }
  const [writer, setWriter] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const onChangeWriter = (e:ChangeEvent<HTMLInputElement>):void => {
    setWriter(e.target.value)
  }
  const onChangePassword = (e:ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value)
  }
  const onChangeTitle = (e:ChangeEvent<HTMLInputElement>):void => {
    setTitle(e.target.value)
  }
  const onChangeContents = (e:ChangeEvent<HTMLInputElement>):void => {
    setContents(e.target.value)
  }
  const onClickSubmit =  () : void  => {
    void myFunction({
      variables:{
        createBoardInput: {
          writer, title, contents, password
        }
      },
      update(cache, {data}) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {return [data.createBoard, ...prev]}
          }
        })
      }
    })
  }
  const onClickDelete = (boardId:string) => () : void  => {
    void deleteBoard({
      variables:{boardId},
      update(cache, {data}) {
        cache.modify({
          fields: {
            fetchBoards: (prev:IPrev[], {readField}) => {
              const filteredPrev = prev.filter(el => readField("_id",el) !== data.deleteBoard)
              return [...filteredPrev]
            }
          }
        })
      }
    })
  }
  console.log(data)
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
          <button onClick={onClickDelete(el._id)}>삭제</button>
        </div>
      ))}
      작성자: <input type='text' onChange={onChangeWriter} /><br />
      비밀번호: <input type='password' onChange={onChangePassword} /><br />
      제목: <input type='text' onChange={onChangeTitle} /><br />
      내용: <input type='text' onChange={onChangeContents} /><br />
      <button onClick={onClickSubmit}>등록</button>
    </div>
  )
}