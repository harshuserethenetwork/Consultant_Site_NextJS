import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import type { Faq } from "@/types/config";
import { Accordion } from "@/components/ui/Accordion";
import { buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * FAQ: heading + contact note on the left, the animated <Accordion> on the
 * right. Items are grouped by `category` (config) in the order they appear.
 *
 * Server Component — the accordion brings its own client boundary.
 */
export function FAQ() {
  if (!siteConfig.features.faq) return null;
  const { faq } = siteConfig;
  if (faq.items.length === 0) return null;

  const groups = groupByCategory(faq.items);

  return (
    <Section id="faq" tone="default" padding="lg" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-2 lg:self-start">
          <SlideUp>
            <SectionHeading {...faq.heading} />
          </SlideUp>

          {faq.contactNote ? (
            <FadeIn delay={0.1} className="mt-8">
              <p className="text-sm font-medium text-foreground">
                {faq.contactNote.label}
              </p>
              <Link
                href={faq.contactNote.cta.href}
                target={faq.contactNote.cta.external ? "_blank" : undefined}
                rel={faq.contactNote.cta.external ? "noopener noreferrer" : undefined}
                className={buttonVariants({ className: "mt-4" })}
              >
                {faq.contactNote.cta.label}
              </Link>
            </FadeIn>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 lg:col-span-3">
          {groups.map((group, groupIndex) => (
            <SlideUp
              key={`${groupIndex}-${group.category ?? "group"}`}
              delay={0.1 + groupIndex * 0.05}
            >
              {group.category ? (
                <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  {group.category}
                </p>
              ) : null}
              <Accordion items={group.items} />
            </SlideUp>
          ))}
        </div>
      </div>
    </Section>
  );
}

FAQ.displayName = "FAQ";

interface FaqGroup {
  category?: string;
  items: Faq[];
}

/** Keeps config order; consecutive items with the same category share a group. */
function groupByCategory(items: Faq[]): FaqGroup[] {
  const groups: FaqGroup[] = [];

  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.category === item.category) {
      last.items.push(item);
    } else {
      groups.push({ category: item.category, items: [item] });
    }
  }

  return groups;
}
