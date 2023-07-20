import { gql, useMutation } from '@apollo/client'

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String){ 
    createBoard(writer: $writer, title: $title, contents: $contents){ 
      _id
      number
      message
    }
  }
`
// #변수의 타입 적는 곳 #실제 우리가 전달할 변수 적는 곳

export default function GraphqlMutationPage(){
  const [myFunction] = useMutation(CREATE_BOARD)

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables:{
        writer:"훈이",
        title:"안녕하세요",
        contents:"반갑습니다"
      } // 변수 넣는 곳 variables 자체가 $ 역할을 해준다.
    })
    console.log(result)
    alert(result.data.createBoard.message)
  }

  return(
    <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
  )
}