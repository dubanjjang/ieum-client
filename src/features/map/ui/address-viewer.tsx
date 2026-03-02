import { MapPin } from "lucide-react";

import useNaverReverseGeocode from "@/features/map/model/use-naver-reverse-geocode";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export default function AddressViewer({ className }: Props) {
  const { address } = useNaverReverseGeocode();

  return (
    <div className={cn("w-full p-3", className)}>
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 drop-shadow-md">
        <div className="flex items-center justify-center rounded-full bg-neutral-100 p-1.5">
          <MapPin className="size-4 text-rose-500" />
        </div>

        <h1 className="truncate text-sm font-medium">{address}</h1>
      </div>
    </div>
  );
}
