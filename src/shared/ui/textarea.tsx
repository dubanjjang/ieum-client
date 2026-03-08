import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface Props extends React.ComponentProps<"textarea"> {
  textareaClassName?: string;
}

function Textarea({
  disabled,
  className,
  textareaClassName,
  "aria-invalid": ariaInvalid,
  ...props
}: Props) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";

  return (
    <div
      data-disabled={disabled ? "" : undefined}
      aria-invalid={isInvalid ? "true" : undefined}
      className={cn(
        "border-input w-full rounded-lg border bg-white p-1.5 shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-2",
        "aria-invalid:ring-destructive/30 aria-invalid:border-destructive aria-invalid:ring-2",
        "data-disabled:bg-muted data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
    >
      <textarea
        data-slot="textarea"
        aria-invalid={ariaInvalid}
        disabled={disabled}
        className={cn(
          "placeholder:text-muted min-h-24 w-full resize-none px-2 py-1 outline-none",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
          textareaClassName,
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
