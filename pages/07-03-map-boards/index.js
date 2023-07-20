import {useQuery, gql} from '@apollo/client'
import styled from '@emotion/styled'

const FETCH_BOARDS = gql`
  query fetchBoards{
    fetchBoards{
      number
      writer
      title
      contents
    }
  }
`

const Row = styled.div`
  display: flex;
`

const Column = styled.div`
  width: 10%;
`
export default function FetchBoardsPage(){
  const {data} = useQuery(FETCH_BOARDS)
  console.log(data?.fetchBoards)
  
  return (
    <>
      {data?.fetchBoards.map((el) => 
  
        <Row>
          <Column><input type="checkbox" /></Column>
          <Column>{el.number}</Column>
          <Column>{el.title}</Column>
          <Column>{el.contents}</Column>
        </Row>
      )}
    </>
  )
}