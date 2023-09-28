import JestUnitTestPage from "../../pages/section33/33-03-jest-unit-test-snapshot"
import {render} from '@testing-library/react'
import "@testing-library/jest-dom"
it("스냅샷 테스트로 기존 사진이랑 바뀐 게 없는지 비교해보자",()=>{
  const result = render(<JestUnitTestPage />)
  expect(result.container).toMatchSnapshot() // 찍어놓은 게 없으면 새로 만들어준다.
})