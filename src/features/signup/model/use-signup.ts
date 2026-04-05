import { useState } from "react";

interface SignupData {
  nickname: string;
}

// TO DO: 회원가입 API 호출 시, 약관 동의 상태(termsData)를 같이 body에 추가해주어야 함
export default function useSignup() {
  const [signupData, setSignupData] = useState<SignupData>({
    nickname: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function validate(field: keyof SignupData) {
    const { nickname } = signupData;

    if (field === "nickname") {
      if (nickname.length < 2 || nickname.length > 10) {
        setErrorMessage("닉네임은 2자 이상 10자 이하로 구성되어야 해요.");
        return false;
      }

      if (/[^a-zA-Z0-9가-힣]/.test(nickname)) {
        setErrorMessage("닉네임에 특수문자는 사용할 수 없어요.");
        return false;
      }
    }

    // 에러 메시지 정리는 호출부에서 clearErrorMessage 함수를 호출하여 수행
    return true;
  }

  function clearErrorMessage() {
    setErrorMessage("");
  }

  return {
    signupData,
    setSignupData,
    errorMessage,
    validate,
    clearErrorMessage,
  };
}
