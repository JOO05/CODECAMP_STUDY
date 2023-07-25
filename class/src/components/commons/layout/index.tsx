import { useRouter } from "next/router"
import LayoutBanner from "./banner"
import LayoutFooter from "./footer"
import LayoutHeader from "./header"
import LayoutNavigation from "./navigation"

const HIDDEN_HEADERS = [  "/section14/14-01-props-children",]

interface ILayoutProps {
  children:JSX.Element
}

export default function Layout(props:ILayoutProps):JSX.Element {
  const router = useRouter()
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath)

  return (
    <div>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <div style={{height:"500px", display:"flex"}}>
        <div style={{width:"30%", backgroundColor:"orange"}}>사이드바</div>
        <div style={{width:"70%"}}>{props.children}</div>
      </div>
      <LayoutFooter />
  </div>
  )
}