import QuizWrite from "../../../../src/components/units/example/write";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { QuizState } from "../../../../src/commons/stores";
export default function QuizNew():JSX.Element {
  const [isEdit, setIsEdit] = useRecoilState(QuizState)
  useEffect(()=>{setIsEdit(false)},[])
  return <QuizWrite  />
}