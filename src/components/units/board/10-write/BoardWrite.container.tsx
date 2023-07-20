import { useMutation } from '@apollo/client'
import { ChangeEvent, useState } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries'
import { useRouter } from 'next/router'
import { IBoardWriteProps, IMyVariables } from './BoardWrite.types'

export default function BoardWrite(props:IBoardWriteProps) {
  const [myColor, setMyColor] = useState('')
  const router = useRouter()

  const [writer, setWriter] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [createBoard] = useMutation(CREATE_BOARD)
  const [updateBoard] = useMutation(UPDATE_BOARD)

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables:{ writer, title, contents }
    })
    console.log(result)
    alert(result.data.createBoard.message)
    router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`)
  }
  const onClickUpdate = async () => {

    const myVariables:IMyVariables = {
      number:Number(router.query.number)
    }
    if (writer) myVariables.writer = writer
    if (title) myVariables.title = title
    if (contents) myVariables.contents = contents

    const result = await updateBoard({
      variables: myVariables 
    })
    console.log(result)
    alert(result.data.updateBoard.message)
    router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`)
  }

  const onChangeWriter = (e:ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value)
    if (e.target.value && title && contents){
      setMyColor(" ")
    }
  }

  const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (writer && e.target.value && contents){
      setMyColor(" ")
    }
  }

  const onChangeContents = (e:ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value)
    if (writer && title && e.target.value){
      setMyColor(" ")
    }
  }

  return(
    <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      myColor={myColor}
      isEdit={props.isEdit}
      data={props.data}
    />
  )
}