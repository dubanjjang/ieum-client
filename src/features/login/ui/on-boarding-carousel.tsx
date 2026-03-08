import { useEffect, useState } from "react";

import OnBoardingCarouselItem from "@/entities/login/ui/on-boarding-carousel-item";
import OnboardingSlideImage1 from "@/features/login/assets/onboarding-slide-1.webp";
import OnboardingSlideImage2 from "@/features/login/assets/onboarding-slide-2.webp";
import OnboardingSlideImage3 from "@/features/login/assets/onboarding-slide-3.webp";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";

interface Props {
  className?: string;
}

const CAROUSEL_ITEM = [
  {
    title: "나의 이야기를 지도에 남겨요",
    description:
      "내가 머문 곳에 생각과 감정을 기록하고\n특별한 추억으로 간직해 보세요.",
    img: OnboardingSlideImage1,
  },
  {
    title: "다양한 감정을 확인해요",
    description:
      "곳곳에 쓰여진 사람들의 솔직한 마음을 둘러보고\n함께 공감해 보세요.",
    img: OnboardingSlideImage2,
  },
  {
    title: "지금 여기, 감정의 순간을 기록하다",
    description:
      "지금 바로 로그인하고\n다채로운 감정 지도를 함께 완성해 볼까요?",
    img: OnboardingSlideImage3,
  },
];

export default function OnBoardingCarousel({ className }: Props) {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);

  function handleClickStep(index: number) {
    if (!api) {
      return;
    }
    api.scrollTo(index);
  }

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-y-10",
        className,
      )}
    >
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {CAROUSEL_ITEM.map((item, index) => (
            <CarouselItem key={index}>
              <OnBoardingCarouselItem
                title={item.title}
                description={item.description}
                img={item.img}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="disabled:bg-transparent [&>svg]:animate-pulse disabled:[&>svg]:animate-none" />
        <CarouselNext className="disabled:bg-transparent [&>svg]:animate-pulse disabled:[&>svg]:animate-none" />
      </Carousel>

      <div className="flex w-full justify-center">
        {CAROUSEL_ITEM.map((_, index) => (
          <Button
            variant="ghost"
            size="xs"
            className="px-1.5 hover:bg-transparent"
            onClick={() => handleClickStep(index)}
          >
            <div
              key={index}
              className={cn(
                "size-2.5 cursor-pointer rounded-full bg-neutral-200",
                index + 1 === current && "bg-primary",
              )}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
