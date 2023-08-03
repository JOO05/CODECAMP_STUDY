import { useMoveToPage } from "../../../src/components/commons/hooks/useMoveToPage"

export default function CustomHooksUseMoveToPage():JSX.Element {
  const {onClickMoveToPage} = useMoveToPage()
  return (
    <>
      <button onClick={onClickMoveToPage("/board")}>게시판</button>
      <button onClick={onClickMoveToPage("/market")}>마켓</button>
      <button onClick={onClickMoveToPage("/mypages")}>마이페이지</button>
    </>
  )
}