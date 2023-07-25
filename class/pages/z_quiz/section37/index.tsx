import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../src/commons/types/generated/types'
import { type MouseEvent, useState } from 'react'
import styled from '@emotion/styled'

const A = styled.button`
    &.active{
  background-color:red;}
`
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
  const {data, refetch} = useQuery<
  Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  const { data: dataBoardsCount } = useQuery<
  Pick<IQuery,"fetchBoardsCount">,IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT)
  const [countIndex, setCountIndex] = useState(1);
  const [startPage, setStartPage] = useState(1)

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10)/10)
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
  const onClickPage = (event: MouseEvent<HTMLSpanElement>,index:number):void => {
    void refetch({page:Number(event.currentTarget.id)})
    setCountIndex(index);
  }
  console.log(startPage,lastPage)
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
        </div>
      ))}
      <button onClick={onClickPrevPage} disabled={startPage===1 && true}>이전</button>
      {new Array(10).fill(1).map((_, index) => (index + startPage <= lastPage) && (
        <A id={String(index+startPage)} key={index+startPage} onClick={e => { onClickPage(e, index+startPage); }}
        className={countIndex === index+startPage ? "active" : ""}>
          {index+startPage}
        </A>))}
      <button onClick={onClickNextPage} disabled={Math.ceil(startPage/10) === Math.ceil(lastPage/10) && true}>다음</button>
    </div>
  )
}