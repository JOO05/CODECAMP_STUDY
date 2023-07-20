import { gql, useMutation } from '@apollo/client'
import { Fragment, useState } from 'react'
import {useRouter} from 'next/router'

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
  const router = useRouter()
  
  const onClickSubmit = async () => {
    try {
      /* 실패할 시 실행되는 catch, 백엔드 쪽으로 가서 전송 실패할 수 있으므로 */
      const result = await myFunction({
        variables:{
          writer:writer,
          title:title,
          contents:contents
        }
      })
      console.log(result)
      alert(result.data.createBoard.message)
      /* 게시글 등록에 성공했다는 메세지가 뜨고 바로 상세페이지 이동 */
      router.push(`/05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}`)
      /* 여기 총 5줄의 코드인데 한 줄이라도 실패하면 나머지 남은 코드는 다 실행x */
    } catch(error) {
      alert(error.message)
    }
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