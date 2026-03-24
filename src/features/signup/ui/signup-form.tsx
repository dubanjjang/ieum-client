import type { InputHTMLAttributes, SubmitEvent } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface Props {
  title: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  buttonText?: string;
  errorMessage?: string;
  onSubmit?: (inputData: string) => void;
}

export default function SignupForm({
  title,
  inputProps,
  buttonText = "다음",
  errorMessage,
  onSubmit,
}: Props) {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData = inputProps?.name
      ? String(formData.get(inputProps.name))
      : "";
    onSubmit?.(inputData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <div className="space-y-5">
        <h1 className="truncate text-xl font-bold">{title}</h1>

        <div className="space-y-4">
          <Input
            {...inputProps}
            required
            autoFocus
            aria-invalid={!!errorMessage}
          />

          {/* {inputProps?.type === "password" && (
            <Input
              {...inputProps}
              name="passwordCheck"
              value={signupData.passwordCheck}
              placeholder="비밀번호를 한 번 더 입력해 주세요..."
              aria-invalid={!!errorMessage}
              required
            />
          )} */}

          <p className="text-destructive text-xs">{errorMessage}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
