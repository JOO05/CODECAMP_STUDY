declare const window: typeof globalThis & {
  IMP: any
}
export default function PaymentPage():JSX.Element {
  const onClickPayment = ():void => {
    const IMP = window.IMP;
    IMP.init("imp27255777");

    IMP.request_pay({ // param
      pg: "kakaopay",
      pay_method: "card",
      // merchant_uid: "ORD20180131-0000011",
      name: "노르웨이 회전 의자",
      amount: 100,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
      m_redirect_url:""
    }, (rsp:any) => {
      if (rsp.success === true) {
        console.log(rsp)
      } else {
        // h
      }
    });
  }
  return (<>
	  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
	  <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
    <button onClick={onClickPayment}>결제</button>
  </>)
}
