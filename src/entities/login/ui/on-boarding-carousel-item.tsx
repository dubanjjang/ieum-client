interface Props {
  title: string;
  description: string;
  img: string;
}

export default function OnBoardingCarouselItem({
  title,
  description,
  img,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex h-64 items-center justify-center">
        <img src={img} alt={"OnBoarding Image"} className="w-60 object-cover" />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-primary text-lg font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm font-normal break-all whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
