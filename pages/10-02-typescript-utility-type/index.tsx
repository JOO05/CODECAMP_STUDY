export default function TypeScriptUtilityPage() {
  interface IProfile {
    name: string
    age?: number
    school: string
    hobby?: string
  }
  /* Pick 타입, 필요한 것만 골라 새롭게 만든다. */
  type aaa = Pick<IProfile, "name" | "age">

  /* Omit 타입, 선택한 것을 제외한다. */
  type bbb = Omit<IProfile, "school">

  /* Partial 타입, 저 요소 다 있어도 되고 없어도 되는 상태로 바뀐다. */
  type ccc = Partial<IProfile>

  /* Required 타입, 전체 다 필수로 바뀐다. */
  type ddd = Required<IProfile>

  /* Union 타입, 정의된 요소 중 하나밖에 값에 할당하지 못한다. */
  type eee = "철수" | "영희" | "훈이"
  let child: eee

  /* Record 타입, e에 넣어진 3개가 key가 되고, value가 각각의 IProfile이 된다. */
  type fff = Record<eee, IProfile>

  /* interface는 선언한 것이 한 곳에 합쳐진다.  아래에 선언되어도 해당 코드처럼
  사용이 가능하다. Partial 기능을 쓰면 빈 객체로 두어도 오류가 나지 않는다. */
  interface IProfile {
    candy: number
  }
  let p:Partial<IProfile> = {}
  p.name = "김"
  p.candy = 1
}