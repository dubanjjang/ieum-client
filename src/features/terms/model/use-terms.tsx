import { useState } from "react";

export interface TermsData {
  personalInformation: boolean;
  locationService: boolean;
  pushAlarm: boolean;
}

export default function useTerms() {
  const [termsData, setTermsData] = useState<TermsData>({
    personalInformation: false,
    locationService: false,
    pushAlarm: false,
  });

  return {
    termsData,
    setTermsData,
  };
}
