import { Component } from "react";
export default class ClassCounterPage extends Component {
  state = {
    count:0
  }
  // setState 함수는 필요 없다. 대신 이렇게 쓰면 자동으로 인식한다.
  // 이 객체 내부에 모든 state를 넣는다.

  onClickCountUp (): void {
    this.setState({
      count: 1
    })
  }
  // this는 클래스 자기자신을 이야기한다. 정의된 state와 onClickCountUp에도 앞에 this가 생략되어있다.
  // this. 치면 여러 기능들이 나오는데 extends한 Component 안의 기능을 지칭한다.
  // this.state.count를 읽지 못한다고 뜨는데 우리는 this 성질을 이해할 필요가 있다.

  render():JSX.Element {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기</button>
      </div>
    )
  }
}