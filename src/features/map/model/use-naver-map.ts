import { useEffect, useRef } from "react";

import useLocationContext from "@/entities/map/provider/location-provider";

interface Props {
  mapOptions?: naver.maps.MapOptions;
  initLocation?: naver.maps.LatLng;
  useUserMarker?: boolean;
}

export default function useNaverMap({
  mapOptions,
  initLocation,
  useUserMarker = false,
}: Props) {
  const { permitted, currentLocation } = useLocationContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map>(null);
  const userMarkerRef = useRef<naver.maps.Marker>(null);

  function createMarker(location: naver.maps.LatLng) {
    if (!mapRef.current) {
      return;
    }

    userMarkerRef.current = new naver.maps.Marker({
      position: new naver.maps.LatLng(location),
      map: mapRef.current,
      icon: {
        content:
          "<div class='size-6 bg-rose-500 border-4 border-white rounded-full' />",
        anchor: new window.naver.maps.Point(12, 12),
      },
      visible: true,
    });
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    if (initLocation) {
      // 초기 위치가 주어지는 경우
      mapRef.current = new naver.maps.Map(mapContainerRef.current, {
        center: new naver.maps.LatLng(initLocation),
        zoom: 16,
        ...mapOptions,
      });

      if (useUserMarker) {
        createMarker(initLocation);
      }
    } else {
      // 초기 위치가 주어지지 않는 경우 현재 디바이스의 위치로 설정
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        if (!mapContainerRef.current) {
          return;
        }
        const location = new naver.maps.LatLng(
          coords.latitude,
          coords.longitude,
        );
        mapRef.current = new naver.maps.Map(mapContainerRef.current, {
          center: location,
          zoom: 16,
          ...mapOptions,
        });

        if (useUserMarker) {
          createMarker(location);
        }
      });
    }
  }, [mapOptions, initLocation, useUserMarker]);

  useEffect(() => {
    if (!useUserMarker) {
      return;
    }

    // 위치 권한이 거부되면, 마커를 렌더링하지 않음
    userMarkerRef.current?.setVisible(permitted);
  }, [useUserMarker, permitted]);

  useEffect(() => {
    if (!useUserMarker || !currentLocation) {
      return;
    }

    // 현재 위치가 바뀌면, 마커의 위치도 갱신
    userMarkerRef.current?.setPosition(currentLocation);
  }, [useUserMarker, currentLocation]);

  return {
    mapContainerRef,
    mapRef,
    userMarkerRef,
  };
}
