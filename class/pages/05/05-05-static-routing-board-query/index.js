import { useRouter } from 'next/router'

export default function StaticRoutingPage(){
  const router = useRouter()
  const onClickMove = () => {
    router.push("/05-06-static-routed-board-query")
  }

  return (
  <button onClick={onClickMove}>게시글로</button>
  )
}