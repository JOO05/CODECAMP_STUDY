import { useRouter } from "next/router"
import { useEffect } from "react"
const qqq = []
export default function ImagePreloadPage():JSX.Element {
  const router = useRouter()

  useEffect(()=> {
    const img = new Image()
    img.src="https://starwalk.space/gallery/images/what-is-space/750x422.jpg"
    img.onload = () => {
      qqq.push(img)
    }
  },[])
  const onClickMove = ():void => {
    void router.push("/section31/31-09-image-preload-moved")
  }
  return <button onClick={onClickMove}>페이지 이동</button>
}