import { useForm } from "react-hook-form"
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc"
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "./index.validation"

interface IFormData {
  writer:string
  title:string
  contents:string
  // boardAddress: {
  //   addressDetail: string
  // }
}

export default function ReactHookFormPage():JSX.Element{
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange"
  })
  const onClickSubmit = async (data:IFormData):Promise<void> => {}
  return(
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type='text' {...register("writer")} /><br />
      <div style={{color:'red'}}>{formState.errors.writer?.message}</div>
      제목: <input type='text' {...register("title")}  /><br />
      <div style={{color:'red'}}>{formState.errors.title?.message}</div>
      내용: <input type='text' {...register("contents")}  /><br />
      <div style={{color:'red'}}>{formState.errors.contents?.message}</div>
      {/* 주소: <input type='text' {...register("boardAddress.addressDetail")}  /><br /> */}
      <button style={{ backgroundColor : formState.isValid ? "yellow" : ""}}>요청하기</button>
    </form>
  )
}