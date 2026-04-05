import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import useNaverMap from "@/features/map/model/use-naver-map";
import useLocationContext from "@/features/map/provider/location-provider";
import { DEFAULT_CIRCLE_RADIUS } from "@/features/map/type/type";
import MapViewer from "@/features/map/ui/map-viewer";
import { cn } from "@/shared/lib/utils";

interface Props {
  initLocation?: naver.maps.LatLng;
  useReverseGeocode?: boolean;
  readOnly?: boolean;
  className?: string;
  onDragEnd?: (center: naver.maps.LatLng | null) => void;
}

export default function MapFixer({
  initLocation,
  useReverseGeocode = false,
  readOnly = false,
  className,
  onDragEnd,
}: Props) {
  const { permitted, getCurrentPositionAsync } = useLocationContext();
  const { mapContainerRef, mapRef, circleRef } = useNaverMap({
    initLocation,
    mapOptions: {
      zoom: 18,
    },
    circleOptions: readOnly ? undefined : {},
    markerOptions: readOnly
      ? {
          icon: {
            content:
              "<div class='flex flex-col items-center'><div class='bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs opacity-90 backdrop-blur-md'>내 위치</div><div class='bg-primary h-3 w-0.5'></div></div>",
            anchor: new naver.maps.Point(30, 36),
          },
        }
      : undefined,
    syncMarkerToCurrentLocation: !readOnly,
    syncCircleToCurrentLocation: !readOnly,
  });

  function updateCircleColor(isOutOfRange: boolean) {
    if (!circleRef.current) {
      return;
    }

    const color = isOutOfRange
      ? "rgba(255, 0, 0, 0.2)"
      : "rgba(0, 255, 0, 0.2)";
    circleRef.current.setOptions({
      center: circleRef.current.getCenter(),
      fillColor: color,
      strokeColor: color,
    });
  }

  useEffect(() => {
    if (readOnly) {
      return;
    }

    let listener: naver.maps.MapEventListener;

    async function init() {
      if (!mapRef.current) {
        return;
      }

      const location = await getCurrentPositionAsync();
      listener = naver.maps.Event.addListener(mapRef.current, "idle", () => {
        if (!mapRef.current) {
          return;
        }

        const projection = mapRef.current.getProjection();
        const newCenter = mapRef.current.getCenter();
        const distance = projection.getDistance(location, newCenter);
        const isOutOfRange = distance > DEFAULT_CIRCLE_RADIUS;
        onDragEnd?.(isOutOfRange ? null : new naver.maps.LatLng(newCenter));
        updateCircleColor(isOutOfRange);
      });

      // 최초 1회 createFormData에 반영
      if (!initLocation) {
        onDragEnd?.(location);
      }
    }

    init();

    return () => {
      if (listener) {
        naver.maps.Event.removeListener(listener);
      }
    };
  }, []);

  if (!permitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-y-10">
        <div className="flex flex-col items-center justify-center gap-y-3">
          <AlertTriangle className="size-8" />
          <h1 className="text-center font-medium">
            지도 서비스를 이용하려면
            <br />
            위치 권한이 필요해요.
          </h1>
        </div>

        <div className="text-muted-foreground list-disc text-xs">
          <div>
            브라우저로 접속 후 사이트 설정에서 위치 권한을 허용으로 변경
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative flex flex-col", className)}>
      <MapViewer
        initLocation={initLocation}
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        className="flex-1 overflow-hidden rounded-lg border"
        useReverseGeocode={useReverseGeocode}
      />

      {!readOnly && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+0.75rem)]">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs opacity-90 backdrop-blur-md">
              내 위치
            </div>
            <div className="bg-primary h-3 w-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}
