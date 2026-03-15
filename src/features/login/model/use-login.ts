import { useState } from "react";

// TO DO: 로그인 API 추가 후, handleSubmit 안에서 trigger 호출
export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState("");

  return {
    errorMessage,
  };
}
