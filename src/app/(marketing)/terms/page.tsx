import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

const { company, engagement } = siteConfig;

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The standard ${company.name} engagement structure: rate, minimum team, coverage, payment schedule and how final pricing is set.`,
};

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  );
}

/**
 * Terms of service: a plain-language summary of the published engagement
 * structure. The proposal and signed engagement agreement always govern —
 * this page does not replace them.
 */
export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of service"
        eyebrow="Legal"
        description="The standard engagement structure we publish, and how the final terms for your engagement are set."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of service" }]}
      />

      <Section padding="lg">
        <div className="flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-4">
            <H2>How engagements are agreed</H2>
            <P>
              {company.name} provides business process management, operations support
              and related functions as managed services. Every engagement begins with
              scoping: the functions in scope, the systems the team works in, the hours
              and days covered, the team shape and the price. Those points are set out
              in a proposal, and the engagement starts once the proposal is accepted and
              the engagement agreement is signed.
            </P>
            <P>
              The terms in the signed proposal and engagement agreement govern your
              engagement. This page summarises the standard structure we publish; where
              the two differ, your documents take precedence.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>The standard structure</H2>
            <P>
              Our published structure for a dedicated employee on a standard engagement
              is:
            </P>
            <dl className="divide-y divide-border border-y border-border">
              {engagement.terms.map((term) => (
                <div
                  key={term.label}
                  className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
                >
                  <dt className="text-xs font-semibold tracking-[0.08em] text-foreground uppercase">
                    {term.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">
                    <span className="block font-medium text-foreground">
                      {term.value}
                    </span>
                    {term.note}
                  </dd>
                </div>
              ))}
            </dl>
            <P>{engagement.caveat}</P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Changes and scaling</H2>
            <P>
              Team size, coverage and scope can be increased during an engagement. Any
              change is confirmed with you in writing — including its effect on price —
              before it takes effect. Nothing is added to an invoice that was not agreed
              first.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Using this website</H2>
            <P>
              The content on this website describes the services we offer. It is
              provided for general information and does not itself constitute an offer,
              a quote or a binding commitment. Platform and product names that appear on
              this site belong to their respective owners, and their mention describes
              operational capability only.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Contact</H2>
            <P>
              Questions about these terms can be sent through the contact page. We will
              respond using the details you provide.
            </P>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().getFullYear()} · {siteConfig.seo.siteUrl}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
