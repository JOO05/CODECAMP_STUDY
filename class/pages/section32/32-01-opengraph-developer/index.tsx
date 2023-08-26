import axios from "axios"
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc"
export default function OpengraphDeveloperPage():JSX.Element {
  const onClickEnter = async ():Promise<void> => {
    // HTTP같은 채팅 데이터에 주소가 있는지 찾는다.

    // 해당 주소로 스크래핑한다.
    const result = await axios.get("http://localhost:3000")

    // 메타태그에서 og:를 찾는다.
    console.log(result.data.split("<meta").filter((el:string)=> el.includes("og:")))
  }
  return (
    <button onClick={wrapAsync(onClickEnter)}>채팅 입력 후 엔터</button>
  )
}