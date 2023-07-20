import { gql, useMutation } from '@apollo/client'
import { Fragment, useState } from 'react'

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String){ 
    createBoard(writer: $writer, title: $title, contents: $contents){ 
      _id
      number
      message
    }
  }
`

export default function GraphqlMutationPage(){
  const [writer, setWriter] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [myFunction] = useMutation(CREATE_BOARD)

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables:{
        writer:writer,
        title:title,
        contents:contents
      }
    })
    console.log(result)
    alert(result.data.createBoard.message)
  }

  const onChangeWriter = (e) => {
    setWriter(e.target.value)
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeContents = (e) => {
    setContents(e.target.value)
  }

  return(
    <Fragment>
      작성자: <input type='text' onChange={onChangeWriter} /><br />
      제목: <input type='text' onChange={onChangeTitle} /><br />
      내용: <input type='text' onChange={onChangeContents} /><br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </Fragment>
  )
}