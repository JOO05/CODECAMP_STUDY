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
        const options = { center: new window.kakao.maps.LatLng(33.450701, 126.570667), level: 3 }; 

        const map = new window.kakao.maps.Map(container, options);

        const imageSrc = 'https://1000logos.net/wp-content/uploads/2017/06/Star-Wars-Logo-1.png'
        const imageSize = new window.kakao.maps.Size(64, 69); 
        const imageOption = {offset: new window.kakao.maps.Point(27, 69)}; 

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        const markerPosition  = new window.kakao.maps.LatLng(33.450701, 126.570667); 
        const marker = new window.kakao.maps.Marker({position: markerPosition,image: markerImage});
        
        marker.setMap(map);
        marker.setDraggable(true); 
      })
    } 
  },[])
  return <div id="map" style={{width:"500px",height:"400px"}} />
}