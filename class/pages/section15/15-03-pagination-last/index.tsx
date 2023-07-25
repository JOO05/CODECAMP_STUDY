import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../src/commons/types/generated/types'
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
const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`
export default function FetchBoardsPage():JSX.Element{
  const [startPage, setStartPage] = useState(1)

  const {data, refetch} = useQuery<
  Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  const { data: dataBoardsCount } = useQuery<
  Pick<IQuery,"fetchBoardsCount">,IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT)

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10)/10)

  const onClickPage = (event: MouseEvent<HTMLSpanElement>):void => {
    void refetch({page:Number(event.currentTarget.id)})
  }
  const onClickPrevPage = (): void => {
    if (startPage===1) return;
    setStartPage(startPage-10)
    void refetch({page:startPage-10})
  }
  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage+10)
      void refetch({page:startPage+10})
    }
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
      {new Array(10).fill(1).map((_, index) => 
        (index + startPage <= lastPage) && (
        <button id={String(index+startPage)} key={index+startPage} onClick={onClickPage}>
          {index+startPage}
        </button>) 
      )}
      <button onClick={onClickNextPage}>다음</button>
    </div>
  )
}