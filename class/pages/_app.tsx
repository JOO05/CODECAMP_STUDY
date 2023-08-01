import { type AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../src/components/commons/layout'
import ApolloSetting from '../src/components/commons/apollo'
import { Global } from '@emotion/react'
import { globalStyles } from '../src/commons/styles/globalStyles'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RecoilRoot } from 'recoil'

export default function App({ Component }:AppProps):JSX.Element {
  return (
    <RecoilRoot>
    <ApolloSetting>
      <>
      <Global styles={globalStyles} />
      <Layout>
        <Component />
      </Layout>
      </>
    </ApolloSetting>        
  </RecoilRoot>
  )
}