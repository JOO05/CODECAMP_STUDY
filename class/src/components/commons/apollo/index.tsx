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
    const result = localStorage.getItem("accessToken")
    setAccessToken(result ?? "")}

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