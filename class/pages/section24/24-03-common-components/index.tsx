import { useForm } from "react-hook-form"
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc"
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "./index.validation"
import Input01 from "../../../src/components/commons/inputs/01"
import Button01 from "../../../src/components/commons/buttons/01"

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
      작성자: <Input01 register={register("writer")} type="text" />
      <div style={{color:'red'}}>{formState.errors.writer?.message}</div>
      제목: <Input01 register={register("title")} type="text" />
      <div style={{color:'red'}}>{formState.errors.title?.message}</div>
      내용: <Input01 register={register("contents")} type="text" />
      <div style={{color:'red'}}>{formState.errors.contents?.message}</div>
      {/* 주소: <input type='text' {...register("boardAddress.addressDetail")}  /><br /> */}
      <Button01 title="등록" isActive={formState.isValid} />
    </form>
  )
}
