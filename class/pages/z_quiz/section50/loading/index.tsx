import { gql, useQuery, useMutation } from "@apollo/client"
import type { IQuery } from "../../../../src/commons/types/generated/types"
import { loginCheck } from "../../../../src/components/commons/hocs/withAuth"
import { useRouter } from "next/router"
import type { ChangeEvent } from "react"
import { useState } from "react"
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`
const CREATE_POINT = gql`
  mutation createPointTransactionOfLoading($impUid:ID!){
    createPointTransactionOfLoading(impUid:$impUid){
      _id
      impUid
      amount
    }
  }
`
declare const window: typeof globalThis & {
  IMP: any
}
function LoadingPage():JSX.Element {
  const router = useRouter()
  const { data } = useQuery<Pick<IQuery,"fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)
  const [ myFunction ] = useMutation(CREATE_POINT)
  const selectList = [0,500,1000,2000,5000];
  const [Selected, setSelected] = useState(0);

  const handleSelect = (e:ChangeEvent<HTMLSelectElement>):void => {setSelected(Number(e.target.value));};
  
  const onClickPayment = ():void => {
    if (Selected === 0) { alert("금액을 선택해주세요."); return; }

    const IMP = window.IMP;
    IMP.init("imp27255777");

    IMP.request_pay({ // param
      pg: "kakaopay",
      pay_method: "card",
      // merchant_uid: "ORD20180131-0000011",
      name: `Section 50-${Selected}원 결제`,
      amount: Selected,
      buyer_email: data?.fetchUserLoggedIn.email,
      buyer_name: data?.fetchUserLoggedIn.name,
      buyer_tel: "",
      buyer_addr: "",
      buyer_postcode: "",
      m_redirect_url:""
    }, async (rsp:any) => {
      if (rsp.success === true) {
        await myFunction({
          variables:{ 
            impUid : data?.fetchUserLoggedIn._id,
            amount: Number(amount) + Selected
          }
        })
        const {Modal} = await import("antd")
        Modal.success({content:"등록 성공"})
        void router.push("/z_quiz/section50/complete")
      } else {
        alert("결제 실패")
      }
    });
  }
  
  return (<>
  <div>{data?.fetchUserLoggedIn.name}님 환영합니다.</div>
  <select onChange={handleSelect} value={Selected}>
    {selectList.map((item) => (
      <option value={item} key={item}>{item}</option>
    ))}
  </select>
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
	<script src="https://cdn.iamport.kr/v1/iamport.js" />
  <button onClick={onClickPayment}>충전하기</button>
  </>)
}
export default loginCheck(LoadingPage);