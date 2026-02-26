import useNaverMap from "@/features/map/model/useNaverMap";

export default function MapViewer() {
  useNaverMap({
    mapDiv: "map",
    initLocation: new naver.maps.LatLng({ lat: 37.501286, lng: 127.0396029 }),
  });

  return <div id="map" className="w-full flex-1"></div>;
}
