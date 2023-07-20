import { useMutation } from '@apollo/client'
import { useState } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import { CREATE_BOARD } from './BoardWrite.queries'

export default function BoardWrite07() {
  const [myColor, setMyColor] = useState('')

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
    if (e.target.value && title && contents){
      setMyColor(true)
    }
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
    if (writer && e.target.value && contents){
      setMyColor(true)
    }
  }

  const onChangeContents = (e) => {
    setContents(e.target.value)
    if (writer && title && e.target.value){
      setMyColor(true)
    }
  }

  return(
    <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      myColor={myColor}
    />
  )
}