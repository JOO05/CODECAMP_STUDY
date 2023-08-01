import { useEffect } from "react";
import { isEditState } from "../../../src/commons/stores";
import BoardWrite from "../../../src/components/units/22-global-state/BoardWrite.container";
import { useRecoilState } from "recoil";

export default function GlobalStateWithRecoilPage(props:any): JSX.Element {
  const [isEdit, setIsEdit] = useRecoilState(isEditState)
  useEffect(()=>{
    setIsEdit(false)
  },[])
  return <BoardWrite />
}