import Head from "next/head"
export default function OpengraphProviderPage():JSX.Element {
  return(
    <>
      <Head>
        <meta property="og:title" content="중고마켓" />
        <meta property="og:description" content="나의 중고마켓에 오신 것을 환영합니다!" />
        <meta property="og:image" content="https://www.lottehotelmagazine.com/resources/d434c17f-5ac2-4b98-8021-f3bdd5cc26f4_img_TRAVEL_busan_detail01.jpg" />
      </Head>
      <div>
        여기는 Body
      </div>
    </>
  )
}