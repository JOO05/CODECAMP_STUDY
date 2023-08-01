import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '../../../commons/stores'
interface IApolloSettingProps {
  children: JSX.Element
}
const GLOBAL_STATE = new InMemoryCache()
export default function ApolloSetting(props:IApolloSettingProps):JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  
  if (process.browser) {
    console.log("브라우저")
    const result = localStorage.getItem("accessToken")
    setAccessToken(result ?? "")
  } else {
    // console.log("프론트엔드 서버 = yarn dev로 실행시킨 서버 내부")
  } // 해당 콘솔은 터미널 창에서도 확인 가능하다.

  // if (typeof window !== " undefind") {}와 일치한다.
  // useEffect(()=>{},[])로 대체할 수 있다.
  
  const uploadLink = createUploadLink({
    uri:"https://backendonline.codebootcamp.co.kr/graphql",
    headers: {Authorization: `Bearer ${accessToken}`}
  })

  const client = new ApolloClient({
    link:ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE
  })
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}