import { gql, useMutation } from '@apollo/client'
import { Fragment, useState, type ChangeEvent } from 'react'
import type { IMutation,IMutationCreateBoardArgs,
} from "../../../src/commons/types/generated/types"
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){
    createBoard(createBoardInput: $createBoardInput){
      _id
    }
  }
`
export default function GraphqlMutationPage():JSX.Element {
  const [inputs, setInputs] = useState({
    writer:"",title:"",contents:"",password:""
  })
  const [myFunction] = useMutation<
    Pick<IMutation, "createBoard">,IMutationCreateBoardArgs>(CREATE_BOARD);

  const onClickSubmit = async () => {
    await myFunction({
      variables:{createBoardInput: {...inputs}
    }})
  }
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({...inputs, [event.target.id]: event.target.value})
  }
  return(
    <Fragment>
      작성자: <input type='text' id="writer" onChange={onChangeInputs} /><br />
      제목: <input type='text' id="title" onChange={onChangeInputs} /><br />
      내용: <input type='text' id="contents" onChange={onChangeInputs} /><br />
      비번: <input type='text' id="password" onChange={onChangeInputs} /><br />
      <button onClick={onClickSubmit}>요청하기</button>
    </Fragment>
  )
}