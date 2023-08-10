import * as yup from 'yup'
export const schema = yup.object({
  writer: yup.string().required("작성자 입력하기").max(5,"5글자 이내"),
  title: yup.string().required("제목 입력하기").max(100,"100글자 이내"),
  contents: yup.string().required("내용 입력하기").max(1000,"1000글자 이내"),
  password: yup.string().required("비밀번호 입력하기").max(8,"최대 8자리").matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).[^\s]*$/,"비번 다시"),
})