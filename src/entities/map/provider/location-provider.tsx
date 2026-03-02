import { createContext, type ReactNode, useContext } from "react";

import useLocation from "@/entities/map/model/use-location";

interface LocationContextType {
  permitted: boolean;
  currentLocation?: naver.maps.LatLng;
  fetchedLocation?: naver.maps.LatLng;
  setWatched: (watched: boolean) => void;
}

interface Props {
  updateLocation: boolean;
  children?: ReactNode;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export function LocationProvider({ updateLocation, children }: Props) {
  const { permitted, currentLocation, fetchedLocation, setWatched } =
    useLocation({
      updateLocation,
    });

  return (
    <LocationContext
      value={{ permitted, currentLocation, fetchedLocation, setWatched }}
    >
      {children}
    </LocationContext>
  );
}

export default function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext 훅은 LocationProvider 안에서 사용되어야 합니다.",
    );
  }
  return context;
}
