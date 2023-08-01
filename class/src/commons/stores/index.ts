// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { atom } from 'recoil'

export const isEditState = atom({
  key:"isEditState",
  default:true
})

export const QuizState = atom({
  key:"QuizState",
  default:true
})

export const accessTokenState = atom({
  key: "accessTokenState",
  default: ""
})