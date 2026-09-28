import type { IconName } from "@/types/config";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Renders the icon named in the config, or nothing if the name is unknown.
 *
 *   <ConfigIcon name={service.icon} className="size-6" />
 *
 * Server Component — lucide-react components can be rendered on the server.
 */
export interface ConfigIconProps {
  name?: IconName;
  className?: string;
}

export function ConfigIcon({ name, className }: ConfigIconProps) {
  const Icon = name ? icons[name] : undefined;
  if (!Icon) return null;
  return <Icon className={cn("size-5 shrink-0", className)} aria-hidden="true" />;
}

ConfigIcon.displayName = "ConfigIcon";
