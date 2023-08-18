import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, fromPromise } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { accessTokenState, restoreAccessTokenLoadable } from '../../../commons/stores'
import { onError } from '@apollo/client/link/error'
import { getAccessToken } from '../../../commons/libraries/getAccessToken'
import { useEffect } from 'react'

interface IApolloSettingProps {
  children: JSX.Element
}
const GLOBAL_STATE = new InMemoryCache()
export default function ApolloSetting(props:IApolloSettingProps):JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const a = useRecoilValueLoadable(restoreAccessTokenLoadable)

  useEffect(()=>{
    void a.toPromise().then((newAccessToken)=>{
      setAccessToken(newAccessToken?? "")
    })
  },[])
 

  const errorLink = onError(({graphQLErrors, operation, forward})=>{
    // 1-1. 에러 캐치
    if(typeof graphQLErrors !== "undefined") {
      for(const err of graphQLErrors){
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if(err.extensions.code === "UNAUTHENTICATED"){
          return fromPromise(
            // 2. refreshToken으로 accessToken 재발급
            getAccessToken().then((newAccessToken)=>{
              setAccessToken(newAccessToken?? "")
              
            // 3-1. 재발급받은 accessToken으로 방금 실패한 쿼리 재요청
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                Authorization: `Bearer ${newAccessToken}`
              }
            })
          })
            // 3-2. 지금 실패한 쿼리에 accessToken만 바꿔치기하고 재요청
          ).flatMap(()=>forward(operation))
        }
      }
    }
  })
  const uploadLink = createUploadLink({
    uri:"https://backendonline.codebootcamp.co.kr/graphql",
    headers: {Authorization: `Bearer ${accessToken}`},
    credentials: "include"
  })
  const client = new ApolloClient({
    link:ApolloLink.from([errorLink, uploadLink]), // uploadLink보다 먼저 실행되게끔
    cache: GLOBAL_STATE
  })
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}