import { useState } from "react";

import Post from "@/features/post/ui/post";
import PostSortFilter, {
  type SortType,
} from "@/features/post/ui/post-sort-filter";

export default function PostList() {
  const [sortType, setSortType] = useState<SortType>("latest");

  return (
    <div className="bg-muted mt-4 flex h-[75dvh] flex-col">
      <PostSortFilter sortType={sortType} onChange={setSortType} />

      <div className="scrollbar-hide min-h-0 flex-1 space-y-2 overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <Post
            key={index}
            profileImageUrl=""
            author="슬퍼하는 강아지"
            address="서울특별시 중구 을지로동"
            content={`안녕하세요 ${index + 1}\n1\n2\n3\n4\n5`}
            createdAt="방금"
          />
        ))}
      </div>
    </div>
  );
}
