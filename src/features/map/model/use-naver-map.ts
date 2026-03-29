import { useEffect, useRef } from "react";

import useLocationContext from "@/features/map/provider/location-provider";
import { DEFAULT_CIRCLE_RADIUS } from "@/features/map/type/type";

interface Props {
  initLocation?: naver.maps.LatLng;
  mapOptions?: naver.maps.MapOptions;
  markerOptions?: Partial<naver.maps.MarkerOptions>; // 마커에 대한 옵션을 설정할 경우 마커 객체 생성
  circleOptions?: Partial<naver.maps.CircleOptions>; // 원에 대한 옵션을 설정할 경우 원 객체 생성
  syncMarkerToCurrentLocation?: boolean; // 현재 위치가 바뀔 때 마커 위치를 갱신할지 여부
  syncCircleToCurrentLocation?: boolean; // 현재 위치가 바뀔 때 원 위치를 갱신할지 여부
}

export default function useNaverMap({
  initLocation,
  mapOptions,
  markerOptions,
  circleOptions,
  syncMarkerToCurrentLocation = true,
  syncCircleToCurrentLocation = true,
}: Props) {
  const { permitted, currentLocation } = useLocationContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map>(null);
  const markerRef = useRef<naver.maps.Marker>(null);
  const circleRef = useRef<naver.maps.Circle>(null);

  function createMarker(location: naver.maps.LatLng) {
    if (!mapRef.current || !markerOptions) {
      return;
    }

    markerRef.current = new naver.maps.Marker({
      position: new naver.maps.LatLng(location),
      map: mapRef.current,
      icon: {
        content:
          "<div class='size-6 bg-rose-500 border-4 border-white rounded-full' />",
        anchor: new window.naver.maps.Point(12, 12),
      },
      visible: true,
      ...markerOptions,
    });
  }

  function createRange(location: naver.maps.LatLng) {
    if (!mapRef.current) {
      return;
    }

    circleRef.current = new window.naver.maps.Circle({
      map: mapRef.current,
      center: new naver.maps.LatLng(location),
      radius: DEFAULT_CIRCLE_RADIUS,
      fillColor: "rgba(0, 255, 0, 0.2)",
      strokeColor: "rgba(0, 255, 0, 0.2)",
      strokeWeight: 1,
      ...circleOptions,
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

      if (markerOptions) {
        createMarker(initLocation);
      }

      if (circleOptions) {
        createRange(initLocation);
      }
    } else {
      // 초기 위치가 주어지지 않는 경우 현재 디바이스의 위치로 설정
      mapRef.current = new naver.maps.Map(mapContainerRef.current, {
        center: currentLocation,
        zoom: 16,
        ...mapOptions,
      });

      if (markerOptions) {
        createMarker(currentLocation!);
      }

      if (circleOptions) {
        createRange(currentLocation!);
      }
    }
  }, [mapOptions, markerOptions, circleOptions]);

  useEffect(() => {
    if (!markerOptions) {
      return;
    }

    // 위치 권한이 거부되면, 마커와 원을 렌더링하지 않음
    markerRef.current?.setVisible(permitted);
    circleRef.current?.setVisible(permitted);
  }, [permitted, markerOptions, circleOptions]);

  useEffect(() => {
    if (!permitted || !currentLocation) {
      return;
    }

    // 현재 위치가 바뀌면, 마커의 위치도 갱신
    if (syncMarkerToCurrentLocation && markerOptions) {
      markerRef.current?.setPosition(currentLocation);
    }

    // 현재 위치가 바뀌면, 원의 위치도 갱신
    if (syncCircleToCurrentLocation && circleOptions) {
      circleRef.current?.setCenter(currentLocation);
    }
  }, [
    permitted,
    currentLocation,
    syncMarkerToCurrentLocation,
    syncCircleToCurrentLocation,
    markerOptions,
    circleOptions,
  ]);

  return {
    mapContainerRef,
    mapRef,
    markerRef,
    circleRef,
  };
}
