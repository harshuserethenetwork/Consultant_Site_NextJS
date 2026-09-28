import { Mail } from "lucide-react";
import type { TeamMember } from "@/types/config";
import { Card } from "@/components/ui/Card";
import { MediaImage } from "@/components/ui/MediaImage";
import { SocialIcon } from "@/components/ui/SocialIcon";

/**
 * One person in the team grid: portrait, name, role, bio, skill chips and
 * social links. The whole card lifts on hover; the portrait zooms with it.
 *
 * Server Component — content comes from `siteConfig.team.members`.
 */
export interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="group h-full overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        <MediaImage
          image={member.image}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
        />
      </div>

      <div className="flex flex-col gap-3 p-6">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-primary">{member.role}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

        {member.skills && member.skills.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {member.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-md bg-muted px-2 py-0.5 text-[0.7rem] text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}

          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

TeamCard.displayName = "TeamCard";
