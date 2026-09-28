import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { fieldClasses } from "@/components/ui/Input";

/** Multi-line text field (contact form message, comments…). */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, rows = 5, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(fieldClasses, "min-h-32 resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

Textarea.displayName = "Textarea";
