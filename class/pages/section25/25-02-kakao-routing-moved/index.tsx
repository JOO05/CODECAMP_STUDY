import { useEffect } from "react"

declare const window: typeof globalThis & { kakao: any; }

export default function KakaoMapRoutedPage():JSX.Element {
  useEffect(()=>{
    const script = document.createElement("script")
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=74e06881d01a40a457a1134a27c84753&autoload=false"
    document.head.appendChild(script)
    script.onload = () => {
      window.kakao.maps.load(function(){
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };     
      const map = new window.kakao.maps.Map(container, options);
      console.log(map)
      })
    }
  },[])
  return <div id="map" style={{width:"500px",height:"400px"}} />
}