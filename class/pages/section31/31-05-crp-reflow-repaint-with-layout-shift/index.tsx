import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { type MouseEvent } from 'react'

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
  const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)

  const onClickPage = (event: MouseEvent<HTMLSpanElement>):void => {
    void refetch({page:Number(event.currentTarget.id)})}

  return (
    <div>
      {(data?.fetchBoards ?? new Array(10).fill(1)).map((el) => (
        <div key={el._id} style={{height:"30px"}}>
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