import { type ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import useSignup from "@/features/signup/model/use-signup";
import SignupForm from "@/features/signup/ui/signup-form";
import Fade from "@/shared/animation/fade";
import PopUpLayout from "@/shared/ui/pop-up-layout";

export default function SignupPage() {
  const location = useLocation();
  const termsData = location.state?.termsData;

  const nav = useNavigate();

  const { signupData, setSignupData, errorMessage, validate } =
    useSignup(termsData);

  function handleChangeForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 회원가입 페이지에 URL을 치고 강제로 들어올 경우 terms로 리다이렉트
  useEffect(() => {
    if (!termsData) {
      nav("/terms", { replace: true });
    }
  }, [termsData, nav]);

  // 회원가입 폼이 렌더링 됐다가 리다이렉트 되지 않도록 null 반환
  if (!location.state?.termsData) {
    return null;
  }

  return (
    <PopUpLayout
      title="회원 정보"
      onPrev={() => nav("/terms")}
      className="flex-1"
    >
      <Fade className="flex flex-1 flex-col">
        <SignupForm
          title="닉네임을 입력해 주세요."
          inputProps={{
            name: "nickname",
            maxLength: 10,
            placeholder: "닉네임을 입력해 주세요...",
            value: signupData.nickname,
            onChange: handleChangeForm,
          }}
          buttonText="회원가입"
          errorMessage={errorMessage}
          onSubmit={() => {
            if (validate("nickname")) {
              nav("/login");
            }
          }}
        />
      </Fade>
    </PopUpLayout>
  );
}
