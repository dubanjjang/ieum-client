import { MapPinIcon } from "lucide-react";

interface Props {
  profileImageUrl: string;
  author: string;
  address: string;
  content: string;
  createdAt: string;
}

export default function Post({
  profileImageUrl,
  author,
  address,
  content,
  createdAt,
}: Props) {
  return (
    <div className="bg-background space-y-4 px-5 py-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <div className="rounded-full border-2 border-green-300 bg-green-50 p-0.5 font-semibold">
            <img
              src={profileImageUrl}
              alt="프로필 이미지"
              className="size-8 object-cover"
            />
          </div>

          <div>
            <p className={"font-medium text-green-400"}>{author}</p>
            <div className="flex items-center gap-x-0.5 text-neutral-500">
              <MapPinIcon className="size-3" />
              <p className="text-xs">{address}</p>
            </div>
          </div>
        </div>

        <div className="text-end">
          <p className="text-sm text-neutral-300">{createdAt}</p>
        </div>
      </div>

      <div className="relative mb-6 line-clamp-5 max-h-32 overflow-hidden break-all whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}
