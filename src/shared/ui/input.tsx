import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface Props extends React.ComponentProps<"input"> {
  inputClassName?: string;
}

function Input({
  type,
  disabled,
  className,
  inputClassName,
  "aria-invalid": ariaInvalid,
  ...props
}: Props) {
  const [revealed, setRevealed] = React.useState(false);

  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  const isPassword = type === "password";
  const inputType = isPassword ? (revealed ? "text" : "password") : type;

  return (
    <div
      data-disabled={disabled ? "" : undefined}
      aria-invalid={isInvalid ? "true" : undefined}
      className={cn(
        "border-input bg-background flex w-full items-center gap-x-2 rounded-lg border shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-2",
        "aria-invalid:ring-destructive/30 aria-invalid:border-destructive aria-invalid:ring-2",
        "data-disabled:bg-muted data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
    >
      <input
        type={inputType}
        data-slot="input"
        aria-invalid={ariaInvalid}
        disabled={disabled}
        className={cn(
          "placeholder:text-muted selection:bg-primary selection:text-primary-foreground h-10 w-full min-w-0 bg-transparent px-3 py-1 outline-none",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName,
        )}
        {...props}
      />

      {isPassword && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          tabIndex={-1} // 키보드로도 포커스 안되게 처리
          disabled={disabled}
          aria-label={revealed ? "비밀번호 숨기기" : "비밀번호 표시"}
          className="text-muted-foreground mr-1 p-0 hover:bg-transparent"
          onClick={() => setRevealed((prev) => !prev)}
        >
          {revealed ? (
            <Eye className="size-5" />
          ) : (
            <EyeOff className="size-5" />
          )}
        </Button>
      )}
    </div>
  );
}

export { Input };
