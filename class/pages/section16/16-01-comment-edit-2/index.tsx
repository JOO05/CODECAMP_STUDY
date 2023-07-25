import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { useState, type MouseEvent } from 'react'
const FETCH_BOARDS = gql`
  query fetchBoards($page:Int){
    fetchBoards(page:$page){
      _id
      writer
      title
    }
  }
`
export default function FetchBoardsPage():JSX.Element{
  const {data} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  const [myIndex, setMyIndex] = useState([
    false,false,false,false,false,false,false,false,false,false
  ])

  const onClickEdit = (event:MouseEvent<HTMLButtonElement>):void => {
    const q = [...myIndex]
    q[Number(event.currentTarget.id)] = true
    setMyIndex(q)
  }
  return (
    <div>
      {data?.fetchBoards.map((el,index) => (
        !myIndex[index] ? (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
          <button onClick={onClickEdit} id={String(index)}>수정하기</button>
        </div> ) : (
          <input type='text' key={el._id} />
        )
      ))}
    </div>
  )
}