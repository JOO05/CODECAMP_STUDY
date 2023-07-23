// class Monster {
//   power = 5
//   attack() {
//     console.log("공격")
//   }
// }
// // SuperMonster는 monster의 기능을 확장한 것이다. 상속을 받는다.
// class SuperMonster extends Monster {
//   run() {
//     console.log("도망")
//   } 
//   // attack을 더 강한 공격으로 바꿔쳐서 재정의, 즉 오버라이딩 된다.
//   attack() {
//     console.log("필살기")
//   }
// }
// const monster = new Monster()
// //attack과 power밖에 없다. SuperMonster의 경우 run까지 사용이 가능하다.