import {useQuery, gql} from '@apollo/client'
import type { IBoard, IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
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
  const {data} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  const onClickBasket = (basket:IBoard) => () => {
    // 장바구니 가져오기
    const baskets:IBoard[] = JSON.parse(localStorage.getItem("baskets") ?? "[]")
    // 추가하려는 것이 기존 장바구니에 있는지 검증하기
    const temp = baskets.filter((el)=> el._id === basket._id)
    if (temp.length >= 1) {
      alert("이미 담았습니다.")
      return ;
    }
    // 내가 클릭한 것 추가하기
    
    const {__typename, ...rest} = basket
    baskets.push(rest)
    // 추가된 장바구니로 변경하기
    localStorage.setItem("baskets", JSON.stringify(baskets))
  }
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
          <button onClick={onClickBasket(el)}>장바구니 담기</button>
        </div>
      ))}
    </div>
  )
}