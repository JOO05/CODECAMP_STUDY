import { useForm } from "react-hook-form"
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc"
interface IFormData {
  writer:string
  title:string
  contents:string
  boardAddress: {
    addressDetail: string
  }
}
export default function ReactHookFormPage():JSX.Element{
  const { register, handleSubmit } = useForm<IFormData>()
  const onClickSubmit = async (data:IFormData):Promise<void> => {}
  return(
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type='text' {...register("writer")} /><br />
      제목: <input type='text' {...register("title")} /><br />
      내용: <input type='text' {...register("contents")} /><br />
      주소: <input type='text' {...register("boardAddress.addressDetail")}  /><br />
      <button>요청하기</button>
    </form>
  )
}