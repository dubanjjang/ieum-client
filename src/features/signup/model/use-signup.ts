import { useState } from "react";
import { z } from "zod";

export const SIGNUP_STEPS = [
  { step: "email-form", label: "이메일" },
  { step: "password-form", label: "비밀번호" },
  { step: "nickname-form", label: "닉네임" },
] as const;

export const signupSchema = z
  .object({
    email: z.email("올바른 이메일 형식이 아니에요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상으로 구성되어야 해요.")
      .max(29, "비밀번호는 30자 미만으로 구성되어야 해요.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        "비밀번호는 영문, 숫자, 특수문자를 최소 하나씩 포함해야 해요.",
      ),
    passwordCheck: z.string(),
    nickname: z
      .string()
      .min(2, "닉네임은 2자 이상으로 구성되어야 해요.")
      .max(10, "닉네임은 10자 이하로 구성되어야 해요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않아요.",
    path: ["passwordCheck"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export default function useSignup() {
  const [signupData, setSignupData] = useState<SignupFormData>({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function validate(field: keyof SignupFormData) {
    const result = signupSchema.safeParse(signupData);
    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === field,
      );
      if (fieldError) {
        setErrorMessage(fieldError.message);
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
