import { type ReactNode, type Ref, type RefObject } from "react";
import { LocateFixed } from "lucide-react";

import useLocationContext from "@/features/map/provider/location-provider";
import AddressViewer from "@/features/map/ui/address-viewer";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface Props {
  initLocation?: naver.maps.LatLng;
  mapContainerRef: Ref<HTMLDivElement>;
  mapRef: RefObject<naver.maps.Map | null>;
  className?: string;
  bottomLeftActions?: ReactNode;
  bottomCenterActions?: ReactNode;
  bottomRightActions?: ReactNode;
  useReverseGeocode?: boolean;
}

export default function MapViewer({
  initLocation,
  mapContainerRef,
  mapRef,
  className,
  bottomLeftActions,
  bottomCenterActions,
  bottomRightActions,
  useReverseGeocode = false,
}: Props) {
  const { currentLocation } = useLocationContext();

  function handleClick() {
    const target = initLocation ?? currentLocation;
    if (!target) {
      return;
    }

    mapRef.current?.panTo(target);
  }

  return (
    <div className={cn("relative flex flex-col", className)}>
      {useReverseGeocode && (
        <AddressViewer className="absolute top-0 left-0 z-40" />
      )}

      <div ref={mapContainerRef} className="w-full flex-1" />

      <div className="absolute bottom-10 left-4 flex flex-col items-center justify-end gap-y-4">
        {bottomLeftActions}
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-end gap-y-4">
        {bottomCenterActions}
      </div>

      <div className="absolute right-4 bottom-10 flex flex-col items-center gap-y-4">
        {bottomRightActions}

        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          onClick={handleClick}
        >
          <LocateFixed className="text-primary size-5" />
        </Button>
      </div>
    </div>
  );
}
