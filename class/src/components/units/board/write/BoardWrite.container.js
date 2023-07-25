import { useMutation } from '@apollo/client'
import { useState } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import { CREATE_BOARD } from './BoardWrite.queries'

export default function BoardWrite() {
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
    alert(result.data.createBoard.number)
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
    <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
    />
  )
}