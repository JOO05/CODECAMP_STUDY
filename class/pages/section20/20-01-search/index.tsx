import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { useState, type ChangeEvent, type MouseEvent } from 'react'
const FETCH_BOARDS = gql`
  query fetchBoards($page:Int, $search: String){
    fetchBoards(page:$page, search:$search){
      _id
      writer
      title
      contents
    }
  }
`
export default function FetchBoardsPage():JSX.Element{
  const [search, setSearch] = useState("")
  const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  
  const onClickPage = (event: MouseEvent<HTMLSpanElement>):void => {
    void refetch({page:Number(event.currentTarget.id)})
  }
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>):void => {
    setSearch(event.currentTarget.value)
  }
  const onClickSearch = ():void => {
    void refetch({ search, page: 1 })
  }
  return (
    <div>
      검색어 입력: <input type='text' onChange={onChangeSearch} />
      <button onClick={onClickSearch}>검색하기</button> <br />
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <button id={String(index+1)} key={index+1} onClick={onClickPage}>{index+1}</button>
      ))}
    </div>
  )
}