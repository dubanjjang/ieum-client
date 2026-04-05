import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import useNaverMap from "@/features/map/model/use-naver-map";
import useLocationContext from "@/features/map/provider/location-provider";
import MapViewer from "@/features/map/ui/map-viewer";
import PostCreateButton from "@/features/post/ui/post-create-button";
import PostListButton from "@/widgets/post/ui/post-list-button";

export default function MapController() {
  const { permitted, getCurrentPositionAsync, watchPosition, clearWatch } =
    useLocationContext();
  const { mapContainerRef, mapRef } = useNaverMap({
    markerOptions: {},
  });

  useEffect(() => {
    async function init() {
      try {
        await getCurrentPositionAsync();
        watchPosition();
      } catch (error) {
        console.error(error);
      }
    }

    init();
    return () => {
      clearWatch();
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
    <MapViewer
      useReverseGeocode
      mapContainerRef={mapContainerRef}
      mapRef={mapRef}
      className="flex-1"
      bottomCenterActions={<PostListButton />}
      bottomRightActions={<PostCreateButton />}
    />
  );
}
