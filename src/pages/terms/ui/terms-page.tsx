import { useNavigate } from "react-router";

import TermsForm from "@/features/terms/ui/terms-form";
import PopUpLayout from "@/shared/ui/pop-up-layout";

export default function TermsPage() {
  const nav = useNavigate();

  return (
    <PopUpLayout className="flex flex-1 flex-col" onPrev={() => nav("/login")}>
      <TermsForm />
    </PopUpLayout>
  );
}
