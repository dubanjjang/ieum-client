import { useNavigate } from "react-router";

import TermsForm from "@/features/terms/ui/terms-form";
import Fade from "@/shared/animation/fade";
import PopUpLayout from "@/shared/ui/pop-up-layout";

export default function TermsPage() {
  const nav = useNavigate();

  return (
    <Fade delay={0.2} className="flex flex-1 flex-col">
      <PopUpLayout
        title="약관 동의"
        className="flex flex-1 flex-col"
        onPrev={() => nav("/login")}
      >
        <TermsForm />
      </PopUpLayout>
    </Fade>
  );
}
