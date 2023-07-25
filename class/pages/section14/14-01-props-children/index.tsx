import Example from "../../../src/components/units/board/14-props-children-example";

export default function PropsChildrenPage():JSX.Element {
  return (
    <div>
      <p>위</p>
      <Example s="6"> {/* 쏙 들어가기 땡겨오기 */}
        <input type="text" placeholder="4" />
        <br />
        <button>5. </button>
      </Example>
      <p>아래</p>
    </div>
  )
}