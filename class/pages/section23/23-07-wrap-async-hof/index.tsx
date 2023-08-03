import { gql, useMutation } from '@apollo/client'
import { wrapAsync } from '../../../src/commons/libraries/asyncFunc'
const CREATE_BOARD = gql`
  mutation{
    createBoard(writer:"철수", title:"제목", contents:"내용"){
      _id
      number
      message
    }
  }
`
export default function GraphqlMutationPage():JSX.Element{
  const [myFunction] = useMutation(CREATE_BOARD)
  const onClickSubmit = async (): Promise<void> => {
    const result = await myFunction()
    console.log(result)
    alert(result.data.createBoard.message)
  }

  return(
    <button onClick={wrapAsync(onClickSubmit)}>GRAPHQL-API(동기) 요청하기</button>
  )
}