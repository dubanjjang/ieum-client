import { useEffect, useRef, useState } from "react";

import { getDistance } from "@/entities/map/lib/utils";

interface Props {
  updateLocation: boolean;
}

const MARKER_UPDATE_DISTANCE = 2;
const FETCH_UPDATE_DISTANCE = 50;

export default function useLocation({ updateLocation }: Props) {
  const [permitted, setPermitted] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<
    naver.maps.LatLng | undefined
  >(undefined);
  const [fetchedLocation, setFetchedLocation] = useState<
    naver.maps.LatLng | undefined
  >(undefined);
  const currentLocationRef = useRef(currentLocation ?? null);
  const fetchedLocationRef = useRef(fetchedLocation ?? null);

  const [watched, setWatched] = useState(updateLocation);
  const watchId = useRef<number | null>(null);

  const watchPosition = () => {
    watchId.current = navigator.geolocation.watchPosition(
      (loc) => {
        const newLocation = new naver.maps.LatLng({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        });

        // 현재 위치 갱신 시도
        if (!currentLocationRef.current) {
          return;
        }
        let distance = getDistance(
          currentLocationRef.current.lat(),
          currentLocationRef.current.lng(),
          newLocation.lat(),
          newLocation.lng(),
        );
        if (distance < MARKER_UPDATE_DISTANCE) {
          return;
        }
        currentLocationRef.current = newLocation;
        setCurrentLocation(newLocation);

        // 마지막 API 호출 위치 갱신 시도

        if (!fetchedLocationRef.current) {
          return;
        }
        distance = getDistance(
          fetchedLocationRef.current.lat(),
          fetchedLocationRef.current.lng(),
          newLocation.lat(),
          newLocation.lng(),
        );
        if (distance < FETCH_UPDATE_DISTANCE) {
          return;
        }
        fetchedLocationRef.current = newLocation;
        setFetchedLocation(newLocation);
      },
      (error) => {
        console.error("위치 감지 실패:", error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  const clearWatch = () => {
    if (!watchId.current) {
      return;
    }

    navigator.geolocation.clearWatch(watchId.current);
    watchId.current = null;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const newLocation = new naver.maps.LatLng({
            lat: coords.latitude,
            lng: coords.longitude,
          });

          // 위치 권한 허용
          setPermitted(true);

          // 현재 위치와 마지막 패칭 위치를 갱신
          setCurrentLocation(newLocation);
          setFetchedLocation(newLocation);
          currentLocationRef.current = newLocation;
          fetchedLocationRef.current = newLocation;

          // 위치를 계속 트래킹
          if (updateLocation) {
            clearWatch();
            watchPosition();
          }
        },
        () => {
          setPermitted(false);
          console.error("위치 서비스 이용을 위해 위치 권한을 허용해 주세요.");
        },
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      console.error("이 브라우저는 Geolocation API를 지원하지 않습니다.");
    }

    return () => {
      clearWatch();
    };
  }, [updateLocation]);

  useEffect(() => {
    if (watched) {
      watchPosition();
    } else {
      clearWatch();
    }
  }, [watched]);

  return {
    permitted,
    currentLocation,
    fetchedLocation,
    setWatched,
  };
}
