import * as yup from 'yup'
export const schema = yup.object({
  writer: yup.string().required("작성자 입력하기"),
  title: yup.string().required("제목 입력하기"),
  contents: yup.string().required("내용 입력하기"),
  email: yup.string().email("이메일 형식 아님").required("이메일 입력하기"),
  password: yup.string().min(4,"최소 4자리").max(15,"최대 15").required("비밀번호 입력하기"),
  phone: yup.string().matches(/^\d{3}-\d{3,4}-\d{4}$/,"휴대폰 형식 아님").required("비밀번호 입력하기"),
})