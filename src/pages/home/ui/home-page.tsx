import { LocationProvider } from "@/entities/map/provider/location-provider";
import MapController from "@/widgets/map/ui/map-controller";

export default function HomePage() {
  return (
    <LocationProvider updateLocation>
      <MapController />
    </LocationProvider>
  );
}
