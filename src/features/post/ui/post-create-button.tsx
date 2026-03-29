import { PencilLine } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/shared/ui/button";

export default function PostCreateButton() {
  return (
    <Button variant="outline" size="icon-lg" className="rounded-full" asChild>
      <Link to="/post/create">
        <PencilLine className="text-primary size-5" />
      </Link>
    </Button>
  );
}
