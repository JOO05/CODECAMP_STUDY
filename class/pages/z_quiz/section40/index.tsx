import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MyComponent():JSX.Element  {
  const router = useRouter()
  const [isChange, setIsChange] = useState(false)

  useEffect(()=> {alert("Rendered!")},[])
  useEffect(()=> {alert("Changed!")})
  useEffect(()=> {return () => {alert("Bye!")}},[])

  const onClickChange = (): void => {setIsChange(!isChange)};
	const onClickMove = (): void => {void router.push("/") }
  return (
    <>
      <div>{String(isChange)}</div>
			<button onClick={onClickChange}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </>
  );
}