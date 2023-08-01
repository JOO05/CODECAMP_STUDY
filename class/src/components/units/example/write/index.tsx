import { useRecoilState } from 'recoil'
import { QuizState } from '../../../../commons/stores'

export default function QuizWrite(props:any):JSX.Element {
  const [isEdit, setIsEdit] = useRecoilState(QuizState)
  return (<h1>
    {isEdit ? "수정" : "등록"}
  </h1>)
}