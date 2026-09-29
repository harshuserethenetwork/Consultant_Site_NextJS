import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

/** Shared chrome for every form control (inputs, textareas, selects). */
export const fieldClasses =
  "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground " +
  "disabled:cursor-not-allowed disabled:opacity-60 " +
  '[&[aria-invalid="true"]]:border-destructive [&[aria-invalid="true"]]:ring-1 [&[aria-invalid="true"]]:ring-destructive/40';

/**
 * Text input. Spread `register()` output from react-hook-form straight onto it:
 *   <Input {...register("email")} aria-invalid={!!errors.email} />
 * The `ref` prop is supported because React 19 passes refs as normal props.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export function Input({ className, type = "text", ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(fieldClasses, "h-11", className)}
      {...props}
    />
  );
}

Input.displayName = "Input";
