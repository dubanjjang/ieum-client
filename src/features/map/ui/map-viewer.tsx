import { type Ref, type RefObject } from "react";
import { LocateFixed } from "lucide-react";

import useLocationContext from "@/entities/map/provider/location-provider";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface Props {
  mapContainerRef: Ref<HTMLDivElement>;
  mapRef: RefObject<naver.maps.Map | null>;
  className?: string;
}

export default function MapViewer({
  mapContainerRef,
  mapRef,
  className,
}: Props) {
  const { currentLocation } = useLocationContext();

  function handleClick() {
    if (!currentLocation) {
      return;
    }

    mapRef.current?.panTo(currentLocation);
  }

  return (
    <div className={cn("relative flex flex-col", className)}>
      <div ref={mapContainerRef} className="w-full flex-1" />
      <Button
        variant="outline"
        className="absolute right-4 bottom-10 cursor-pointer rounded-full px-2! py-2!"
        onClick={handleClick}
      >
        <LocateFixed className="text-primary-foreground size-5" />
      </Button>
    </div>
  );
}
