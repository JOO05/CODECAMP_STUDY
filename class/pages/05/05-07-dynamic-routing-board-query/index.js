import { useRouter } from 'next/router'

export default function StaticRoutingPage(){
  const router = useRouter()
  const onClickMove1 = () => {
    router.push("/05/05-08-dynamic-routed-board-query/1")
  }

  const onClickMove100 = () => {
    router.push("/05/05-08-dynamic-routed-board-query/1433")
  }
  return (
    <>
      <button onClick={onClickMove1}>1번 게시글로</button><br />
      <button onClick={onClickMove100}>100번 게시글로</button><br />
    </>
  )
}