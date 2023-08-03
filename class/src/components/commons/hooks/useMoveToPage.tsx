import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { visitedPageState } from "../../../commons/stores"

interface IUseMoveToPageReturn {
  visitedPage: string
  onClickMoveToPage: (path:string) => () => void
}
export const useMoveToPage = ():IUseMoveToPageReturn => {
  const router = useRouter()
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState)
  const onClickMoveToPage = (path:string) => () => {
    setVisitedPage(path) // 로그인 페이지일 때는 set 하지 않도록 한다.
    // localStorage.setItem("visitedPage", path)라는 방법도 가능하다/
    void router.push(path)
  }
  return {visitedPage, onClickMoveToPage}
}
