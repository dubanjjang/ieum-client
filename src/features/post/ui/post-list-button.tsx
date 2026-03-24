import LetterImage from "@/features/post/assets/letter.svg";
import PostList from "@/features/post/ui/post-list";
import { Button } from "@/shared/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";

export default function PostListButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-10 gap-x-2 text-sm">
          <img src={LetterImage} alt="Letter image" className="size-6"></img>
          <p>이음글 모아보기</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-101">
        <PostList />
      </DrawerContent>
    </Drawer>
  );
}
