import { ChangeEvent } from 'react'
import { IQuery } from '../../../../commons/types/generated/types'

export interface IBoardWriteProps {
  isEdit: boolean
  data?: Pick<IQuery, "fetchBoard">
}
export interface IBoardWriteUIProps {
  onClickSubmit : () => void
  onClickUpdate : () => void
  onChangeWriter : (e:ChangeEvent<HTMLInputElement>) => void
  onChangeTitle : (e:ChangeEvent<HTMLInputElement>) => void
  onChangeContents : (e:ChangeEvent<HTMLInputElement>) => void
  myColor : string
  isEdit : boolean
  data? : Pick<IQuery, "fetchBoard">  
}
export interface IBlueButtonProps {
  color: string
}
export interface IMyVariables {
  number: number
  writer?: string
  title?: string
  contents?: string
}