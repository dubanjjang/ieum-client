import { useEffect, useState } from "react";

import useLocationContext from "@/features/map/provider/location-provider";

export default function useNaverReverseGeocode() {
  const { currentLocation } = useLocationContext();

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!currentLocation) {
      return;
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(currentLocation),
      },
      (_, response: naver.maps.Service.ReverseGeocodeResponse) => {
        setAddress(response.v2.address.jibunAddress);
      },
    );
  }, [currentLocation]);

  return {
    address,
  };
}
