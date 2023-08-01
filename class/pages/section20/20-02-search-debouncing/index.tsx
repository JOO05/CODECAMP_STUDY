import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { type ChangeEvent, type MouseEvent } from 'react'
import _ from 'lodash';
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
  const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  
  const onClickPage = (event: MouseEvent<HTMLSpanElement>):void => {
    void refetch({page:Number(event.currentTarget.id)})
  }
  const getDebounce = _.debounce((value)=> {
    void refetch({search:value, page: 1})
  },500)
  // 0.5초 안에 추가입력이 없을 때 refetch가 나간다.
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>):void => {
    getDebounce(event.currentTarget.value)
  }
  return (
    <div>
      <input type='text' onChange={onChangeSearch} />
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