import { useEffect, useRef, useState } from "react";
import { MapPinIcon } from "lucide-react";

import {
  type POST_REACTION_TYPE,
  POST_REACTIONS,
} from "@/features/post/type/type";
import PostReactionButton from "@/features/post/ui/post-reaction-button";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

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
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOverflow, setIsOverflow] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedEmoticon, setSelectedEmoticon] =
    useState<POST_REACTION_TYPE | null>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    setIsOverflow(
      contentRef.current.scrollHeight > contentRef.current.clientHeight,
    );
  }, [content]);

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

      <div
        ref={contentRef}
        className={cn(
          "relative overflow-hidden break-all whitespace-pre-wrap",
          isCollapsed ? "max-h-28" : "max-h-fit",
        )}
      >
        <p className="w-full">{content}</p>

        {isOverflow &&
          (!isCollapsed ? (
            <Button
              variant="ghost"
              className="block h-auto w-full p-0 text-sm text-neutral-500 hover:bg-transparent"
              onClick={() => setIsCollapsed(true)}
            >
              접기
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="to-background absolute bottom-0 flex w-full rounded-none bg-linear-to-b from-transparent p-0 pb-1 text-center text-sm text-neutral-500 hover:bg-transparent"
              onClick={() => setIsCollapsed(false)}
            >
              더보기
            </Button>
          ))}
      </div>

      <div className="flex">
        {Object.keys(POST_REACTIONS).map((key) => {
          const type = key as POST_REACTION_TYPE;
          return (
            <PostReactionButton
              key={key}
              type={type}
              isAnimated={key === selectedEmoticon}
              count={0}
              onClick={() => setSelectedEmoticon(type)}
              onAnimationComplete={() => setSelectedEmoticon(null)}
            />
          );
        })}
      </div>
    </div>
  );
}
