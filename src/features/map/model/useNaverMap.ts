import { useEffect, useRef } from "react";

interface Props {
  mapDiv: string;
  mapOptions?: naver.maps.MapOptions;
  initLocation?: naver.maps.LatLng;
}

export default function useNaverMap({
  mapDiv,
  mapOptions,
  initLocation,
}: Props) {
  const mapRef = useRef<naver.maps.Map>(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    if (initLocation) {
      // 초기 위치가 주어지는 경우
      mapRef.current = new naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(initLocation),
        zoom: 16,
        ...mapOptions,
      });
    } else {
      // 초기 위치가 주어지지 않는 경우 현재 디바이스의 위치로 설정
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        mapRef.current = new window.naver.maps.Map(mapDiv, {
          center: new window.naver.maps.LatLng(
            coords.latitude,
            coords.longitude,
          ),
          zoom: 16,
          ...mapOptions,
        });
      });
    }
  }, [mapDiv, mapOptions, initLocation]);

  return {
    mapRef,
  };
}
