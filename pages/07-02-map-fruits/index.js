const COLOR = [
  {num:1,title:"red"},
  {num:2,title:"blue"},
  {num:3,title:"yellow"}
]
export default function MapFruitsPage() {

  return (
    <>
      {COLOR.map(el => <div>{el.num}{el.title}</div>)}
    </>
  )
}