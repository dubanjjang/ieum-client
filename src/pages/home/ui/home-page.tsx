import { useEffect } from "react";

import useLocationContext from "@/entities/map/provider/location-provider";
import MapController from "@/widgets/map/ui/map-controller";

export default function HomePage() {
  const { getCurrentPositionAsync, watchPosition, clearWatch } =
    useLocationContext();

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

  return <MapController />;
}
