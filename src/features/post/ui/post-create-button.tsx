import { PencilLine } from "lucide-react";

import { Button } from "@/shared/ui/button";

export default function PostCreateButton() {
  return (
    <Button variant="outline" size="icon-lg" className="rounded-full">
      <PencilLine className="text-primary size-5" />
    </Button>
  );
}
