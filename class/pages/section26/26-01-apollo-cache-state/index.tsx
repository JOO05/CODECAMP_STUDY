import {useQuery, gql, useMutation} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'

const FETCH_BOARDS = gql`
  query fetchBoards{
    fetchBoards{
      _id
      writer
      title
    }
  }
`
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){ 
    createBoard(createBoardInput: $createBoardInput){ 
      _id
      writer
      title
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
  const onClickSubmit =  () : void  => {
    void myFunction({
      variables:{
        createBoardInput: {
          writer:'작성자', password:"1", title:'제목', contents:"내용"
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
            } // 삭제되지 않은 것들만 필터링하여 보여주는 법
          }
        })
      }
    })
  }
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
          <button onClick={onClickDelete(el._id)}>삭제</button>
        </div>
      ))}
      <button onClick={onClickSubmit}>등록</button>
    </div>
  )
}