import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import JestUnitTestMocking from "../../pages/section33/33-05-jest-unit-test-mocking"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from 'cross-fetch'
import mockRouter from 'next-router-mock'
jest.mock("next/router",()=> require("next-router-mock"))

it("게시글 값 등록 테스트", async ()=>{
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://mock.com/graphql", fetch
    }),
    cache: new InMemoryCache()
  })
  render(<ApolloProvider client={client}>
    <JestUnitTestMocking />
  </ApolloProvider>)
  fireEvent.change(screen.getByRole("input-writer"),{
    target: {value:"맹구"}
  })
  fireEvent.change(screen.getByRole("input-title"),{
    target: {value:"안녕하세요"}
  })
  fireEvent.change(screen.getByRole("input-contents"),{
    target: {value:"반갑습니다"}
  })
  fireEvent.click(screen.getByRole("submit-button"))
  await waitFor(()=>{
    expect(mockRouter.asPath).toEqual("/boards/qqq")
  }) // mockRouter의 현재 이동된 path가 저것이다
})