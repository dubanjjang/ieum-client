import type { PostCreateFormData } from "@/entities/post/type/type";
import { Button } from "@/shared/ui/button";
import Section from "@/shared/ui/section";
import MapFixer from "@/widgets/map/ui/map-fixer";

interface Props {
  formData: PostCreateFormData;
  onChange: (formData: PostCreateFormData) => void;
  onSubmit?: () => void;
}

export default function PostLocationForm({
  formData,
  onChange,
  onSubmit,
}: Props) {
  function handleDragEnd(center: naver.maps.LatLng | null) {
    onChange({
      ...formData,
      location: center,
    });
  }

  return (
    <Section
      title="🧭 현재 위치를 확인해 주세요"
      description="지도를 드래그하여 범위 내에서 위치를 상세하게 조정할 수 있어요."
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col gap-y-4">
        <MapFixer
          initLocation={formData.location ?? undefined}
          onDragEnd={handleDragEnd}
          className="flex-1"
        />
        <Button
          className="w-full"
          disabled={!formData.location}
          onClick={onSubmit}
        >
          다음
        </Button>
      </div>
    </Section>
  );
}
