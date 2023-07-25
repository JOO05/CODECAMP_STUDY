import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { type MouseEvent, useState } from 'react'

const FETCH_BOARDS = gql`
  query fetchBoards($page:Int){
    fetchBoards(page:$page){
      _id
      writer
      title
      contents
    }
  }
`
export default function FetchBoardsPage():JSX.Element{
  const [startPage, setStartPage] = useState(1)

  const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  
  const onClickPage = (event: MouseEvent<HTMLSpanElement>):void => {
    void refetch({page:Number(event.currentTarget.id)})
  }
  const onClickPrevPage = (): void => {
    setStartPage(startPage-10)
    void refetch({page:startPage-10})
  }
  const onClickNextPage = (): void => {
    setStartPage(startPage+10)
    void refetch({page:startPage+10})
  }
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
        </div>
      ))}
      <button onClick={onClickPrevPage}>이전</button>
      {new Array(10).fill(1).map((_, index) => (
        <button id={String(index+startPage)} key={index+startPage} onClick={onClickPage}>
          {index+startPage}
        </button>
      ))}
      <button onClick={onClickNextPage}>다음</button>
    </div>
  )
}