import {useQuery, gql} from '@apollo/client'
import type { IQuery, IQueryFetchBoardArgs } from '../../src/commons/types/generated/types'

const FETCH_BOARD = gql`
  query fetchBoard($number: Int){
    fetchBoard(number:$number){
      writer
      title
      contents
    }
  }
`

export default function StaticRoutedPage(){
  const {data} = useQuery<Pick<IQuery, "fetchBoard">,IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: { number : 1111 }
  })
  return (
    <>
      <div>1번 페이지 이동 완료</div>
      <div>작성자: {data ? data.fetchBoard?.writer : "로딩" }</div>
      <div>제목: {data && data.fetchBoard?.title}</div>
      <div>내용: {data?.fetchBoard?.contents}</div>
    </>
  )
  // fetchBoard가 삭제될 가능성이 있으므로, 데이터가 있을 수도, 없을 수도 있음을 ?로 조건을 걸어줘야 한다.
}