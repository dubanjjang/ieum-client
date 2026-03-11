import type { InputHTMLAttributes, SubmitEvent } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface Props {
  title: string;
  field: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  buttonText?: string;
  validator?: (inputData: string) => boolean;
  onSubmit?: () => void;
}

export default function SignupForm({
  title,
  field,
  inputProps,
  buttonText = "다음",
  validator,
  onSubmit,
}: Props) {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData = String(formData.get(field) ?? "");
    onSubmit?.();

    console.log(`$✅ {field} SignupForm 제출\n- 값: ${inputData}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <div className="space-y-5">
        <h1 className="truncate text-xl font-bold">{title}</h1>

        <div className="space-y-4">
          <Input name={field} {...inputProps} required autoFocus />

          {inputProps?.type === "password" && (
            <Input
              name="password-check"
              {...inputProps}
              placeholder="비밀번호를 한 번 더 입력해 주세요..."
              required
            />
          )}
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
