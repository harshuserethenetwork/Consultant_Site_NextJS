import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Styled stand-in drawn when an image file is not in /public yet: alt text +
 * the expected path, so the layout never shows a broken image icon.
 *
 * Pure UI with no file-system access, so it can be imported from BOTH Server
 * Components (<MediaImage>) and Client Components (the project filter grid).
 */
export interface MediaPlaceholderProps {
  /** Path the real file should live at, e.g. "/images/projects/orbit-pay.png". */
  src: string;
  /** Describes the missing image (kept visible so the slot stays meaningful). */
  alt: string;
  className?: string;
}

export function MediaPlaceholder({ src, alt, className }: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted via-background to-primary/10 p-6 text-center",
        className,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <ImageIcon className="size-5" aria-hidden="true" />
      </span>
      <p className="max-w-56 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {alt}
      </p>
      <p className="max-w-56 font-mono text-[0.65rem] break-all text-muted-foreground/70">
        {src}
      </p>
    </div>
  );
}

MediaPlaceholder.displayName = "MediaPlaceholder";
