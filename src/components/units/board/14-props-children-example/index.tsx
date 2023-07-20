interface IExampleProps {
  s:string;
  children: React.ReactNode[]
}
export default function Example(props:IExampleProps):JSX.Element {
  return (
    <div>
      <p>1. </p>
      <div>2. {props.s}</div>
      <div>3. {props.children}</div>
      <p>7. </p>
    </div>
  )
}