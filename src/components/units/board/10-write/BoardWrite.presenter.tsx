import { BlueButton, RedInput } from "./BoardWrite.styles";
import { IBoardWriteUIProps } from "./BoardWrite.types";

export default function BoardWriteUI(props:IBoardWriteUIProps) {
  return(
    <>
      작성자: <RedInput type='text' onChange={props.onChangeWriter}
      defaultValue={props.data?.fetchBoard?.writer} /><br />
      제목: <input type='text' onChange={props.onChangeTitle}
      defaultValue={props.data?.fetchBoard?.title} /><br />
      내용: <input type='text' onChange={props.onChangeContents}
      defaultValue={props.data?.fetchBoard?.contents} /><br />
      <BlueButton onClick={ props.isEdit ? props.onClickUpdate : props.onClickSubmit }
      color={props.myColor}>
        {props.isEdit ? "수정하기" : "등록하기"}
      </BlueButton>
  </>
  )
}