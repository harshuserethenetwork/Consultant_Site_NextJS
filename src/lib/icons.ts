/**
 * Icon lookup for the names used in `src/config/site.config.ts`.
 *
 * Config entries store icons as strings ("ShieldCheck", "Rocket", …) so the
 * config stays plain data. Components resolve them through <ConfigIcon>:
 *
 *   <ConfigIcon name={service.icon} className="size-6" />
 *
 * In JSX always index the exported `icons` map (never assign the result of a
 * function call to a component variable — the React Compiler lint rule cannot
 * prove that such a value keeps a stable identity). `getIcon()` exists for
 * non-JSX logic.
 *
 * To add an icon: import it from lucide-react and add it to `icons` below.
 * If a config uses a name that is missing here, the component renders without
 * an icon — the site never breaks.
 */
import {
  Award,
  BadgeCheck,
  BrainCircuit,
  Briefcase,
  Calendar,
  Clock,
  Cloud,
  Code,
  Compass,
  Cpu,
  Globe,
  Headphones,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Telescope,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/config";

export const icons: Record<string, LucideIcon | undefined> = {
  Award,
  BadgeCheck,
  BrainCircuit,
  Briefcase,
  Calendar,
  Clock,
  Cloud,
  Code,
  Compass,
  Cpu,
  Globe,
  Headphones,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Telescope,
  TrendingUp,
  Users,
} satisfies Record<string, LucideIcon>;

/** Resolves a config icon name to a lucide-react component (or undefined). */
export function getIcon(name?: IconName): LucideIcon | undefined {
  if (!name) return undefined;
  return icons[name];
}
