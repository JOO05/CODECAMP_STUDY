import { gql, useMutation } from '@apollo/client'
import { Fragment, useState, ChangeEvent } from 'react'
import { IMutation, IMutationCreateBoardArgs } from '../../src/commons/types/generated/types'

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
  const [writer, setWriter] = useState<string>('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [myFunction] = useMutation<Pick<IMutation, "createBoard">,IMutationCreateBoardArgs>(CREATE_BOARD)

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables:{
        writer:writer,
        title:title,
        contents:contents
      }
    })
    console.log(result)
    alert(result.data?.createBoard?.message)
  }

  const onChangeWriter = (e:ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value)
  }

  const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onChangeContents = (e:ChangeEvent<HTMLInputElement>) => {
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