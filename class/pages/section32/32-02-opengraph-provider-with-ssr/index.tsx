import Head from "next/head"
import React from "react"
import { gql } from '@apollo/client'
import { GraphQLClient } from 'graphql-request'
const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId:ID!){
    fetchUseditem(useditemId:$useditemId){
      _id
      name
      remarks
      images
    }
  }
`
export default function OpengraphProviderPage(props:any):JSX.Element {
  /* props가 app component 거쳐서 들어온다. 그래서 pageProps를 적용한다. */
  return(
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0]} />
      </Head>
      <div>
        여기는 Body
      </div>
    </>
  )
}
// 해당 함수는 webpack 프론트엔드 서버 프로그램 쪽이라서 graphql 사용이 안된다. axios나 GraphQLClient를 쓴다.
export const getServerSideProps = async (): Promise<any> => {
  // api 요청
  const graphQLClient = new GraphQLClient(
    "https://backendonline.codebootcamp.co.kr/graphql"
  )
  const result = await graphQLClient.request(FETCH_USEDITEM,{
    useditemId:"64d87fa4bfc0f900299a5f27"
  })
  // 받은 결과 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks:result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      }
    }
  }
}
