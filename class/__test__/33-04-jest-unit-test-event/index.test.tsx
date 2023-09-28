import {render, fireEvent, screen} from '@testing-library/react'
import "@testing-library/jest-dom"
import JestUnitTestEvent from "../../pages/section33/33-04-jest-unit-test-event"
it("버튼을 눌렀을 때 제대로 작동하나?",()=>{
  render(<JestUnitTestEvent />)
  fireEvent.click(screen.getByRole("count-button"))
  expect(screen.getByRole("count")).toHaveTextContent("1")
})