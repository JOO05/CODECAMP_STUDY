function useState<제너릭>(초기값: 제너릭): [제너릭, (변경값:제너릭)=>void] {
  const state = 초기값;
  const setState = (변경값:제너릭): void => {
  console.log(`${state}에서 ${변경값}으로 값을 변경하겠습니다!!`) // 1. state 변경하기
  console.log(`변경된 ${변경값}을 사용해서 컴포넌트를 리렌더링 하겠습니다!!`); // 2. 해당 컴포넌트를 리렌더링
  }
  return [state, setState];
}