import { useEffect } from "react"

declare const window: typeof globalThis & { kakao: any; }

export default function KakaoMapPage():JSX.Element {
  useEffect(()=>{
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    new kakao.maps.Map(container, options); 
  },[])
  return (
    <>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=74e06881d01a40a457a1134a27c84753"></script>
    <div id="map" style={{width:"500px",height:"400px"}} />
    </>
  )
}