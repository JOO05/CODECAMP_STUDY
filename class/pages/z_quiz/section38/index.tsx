import type { IQuery, IQueryFetchBoardsArgs } from "../../../src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller"
import {useQuery, gql} from '@apollo/client'

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
  const {data, fetchMore} = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)

  const onLoadMore = ():void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {page: Math.ceil((data?.fetchBoards.length ?? 10) /10) + 1},
      updateQuery:(prev, {fetchMoreResult}) => {
        if(fetchMoreResult.fetchBoards === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards],
          }
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        }
      }
    })
  }

  return (
    <div style={{height:"500px", overflow:"auto"}}>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true} useWindow={false}>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          <span style={{margin:"10px"}}>{el.writer}</span>
        </div>
      ))}
      </InfiniteScroll>
    </div>
  )
}