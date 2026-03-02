import { AlertTriangle } from "lucide-react";

import useLocationContext from "@/entities/map/provider/location-provider";
import useNaverMap from "@/features/map/model/use-naver-map";
import AddressViewer from "@/features/map/ui/address-viewer";
import MapViewer from "@/features/map/ui/map-viewer";

export default function MapController() {
  const { permitted, currentLocation } = useLocationContext();
  const { mapContainerRef, mapRef } = useNaverMap({
    initLocation: currentLocation,
    useUserMarker: true,
  });

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
    <div className="relative flex flex-1 flex-col">
      <AddressViewer className="absolute top-0 left-0 z-100" />
      <MapViewer
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        className="flex-1"
      />
    </div>
  );
}
