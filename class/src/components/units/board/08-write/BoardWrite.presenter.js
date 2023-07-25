import { BlueButton, RedInput } from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  return(
    <>
      작성자: <RedInput type='text' onChange={props.onChangeWriter} /><br />
      제목: <input type='text' onChange={props.onChangeTitle} /><br />
      내용: <input type='text' onChange={props.onChangeContents} /><br />
      <BlueButton
      onClick={ props.isEdit ? props.onClickUpdate : props.onClickSubmit }
      color={props.myColor}>
        {props.isEdit ? "수정하기" : "등록하기"}
      </BlueButton>
  </>
  )
}