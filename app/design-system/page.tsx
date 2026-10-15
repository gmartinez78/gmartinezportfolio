import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio Design System",
  description: "Internal reference for the portfolio's design tokens and reusable UI components.",
  path: "/design-system",
  noIndex: true,
});

type ColorToken = {
  name: string;
  variable: string;
  value: string;
  dark?: boolean;
};

type SurfaceToken = {
  name: string;
  variable: string;
  value: string;
  image?: boolean;
};

const colorTokens: ColorToken[] = [
  { name: "Primary", variable: "--ui-color-brand-primary", value: "#1183D0", dark: true },
  { name: "Primary soft", variable: "--ui-color-brand-primary-soft", value: "#E0EEFB" },
  { name: "Editorial", variable: "--ui-color-brand-editorial", value: "#E7688F", dark: true },
  { name: "Cyan", variable: "--ui-color-brand-cyan", value: "#39B8E7", dark: true },
  { name: "Amber", variable: "--ui-color-brand-amber", value: "#F0A51B" },
  { name: "Text strong", variable: "--ui-color-text-strong", value: "#0E2951", dark: true },
  { name: "Text body", variable: "--ui-color-text-body", value: "#3C3E3F", dark: true },
  { name: "Text muted", variable: "--ui-color-text-muted", value: "#5C7792", dark: true },
];

const surfaceTokens: SurfaceToken[] = [
  { name: "Base", variable: "--ui-color-surface-base", value: "#FFFFFF" },
  { name: "Soft", variable: "--ui-color-surface-soft", value: "#F7FBFF" },
  { name: "Glass", variable: "--ui-surface-glass", value: "Gradient", image: true },
  { name: "Editorial", variable: "--ui-surface-editorial", value: "Gradient", image: true },
];

const radiusTokens = [
  { name: "Field", variable: "--ui-radius-field", value: "22px" },
  { name: "Button", variable: "--ui-radius-button", value: "24px" },
  { name: "Card", variable: "--ui-radius-card", value: "28px" },
];

const shadowTokens = [
  { name: "Card", variable: "--ui-shadow-card" },
  { name: "Panel", variable: "--ui-shadow-panel" },
  { name: "Elevated", variable: "--ui-shadow-elevated" },
];

function TokenName({ name, variable, value }: { name: string; variable: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-[var(--ui-color-text-strong)]">{name}</span>
      <code className="text-[11px] leading-snug text-[var(--ui-color-text-muted)]">{variable}</code>
      {value ? <span className="text-xs text-[var(--ui-color-text-muted)]">{value}</span> : null}
    </div>
  );
}

function ColorTokenTile({ token }: { token: ColorToken }) {
  return (
    <Card variant="panel" className="gap-0 py-0">
      <div
        className="flex h-24 items-end border-b border-[var(--ui-color-border-strong)] p-3"
        style={{ backgroundColor: `var(${token.variable})` }}
      >
        <span className={`text-xs font-medium ${token.dark ? "text-white" : "text-[var(--ui-color-text-strong)]"}`}>
          {token.value}
        </span>
      </div>
      <CardContent className="py-4">
        <TokenName name={token.name} variable={token.variable} />
      </CardContent>
    </Card>
  );
}

function SurfaceTokenTile({ token }: { token: SurfaceToken }) {
  const style: CSSProperties = token.image
    ? { backgroundImage: `var(${token.variable})` }
    : { backgroundColor: `var(${token.variable})` };

  return (
    <Card variant="panel" className="gap-0 py-0">
      <div className="h-24 border-b border-[var(--ui-color-border-strong)]" style={style} />
      <CardContent className="py-4">
        <TokenName name={token.name} variable={token.variable} value={token.value} />
      </CardContent>
    </Card>
  );
}

function LibrarySection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-10 border-t border-[var(--ui-color-border-strong)] py-16 sm:py-20">
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[var(--ui-color-text-body)]">
      <SiteHeader />

      <Container as="section" size="wide" className="px-6 pb-8 pt-16 md:px-10 lg:px-14">
        <PageIntro
          eyebrow="Internal reference"
          title="Portfolio Design System"
          description="A live reference for the shared foundations and components used across the portfolio. Update a source token or primitive once, and every connected page follows."
        />

        <nav aria-label="Design system sections" className="mt-10 flex flex-wrap gap-2">
          {[
            ["tokens", "Tokens"],
            ["typography", "Typography"],
            ["components", "Components"],
          ].map(([id, label]) => (
            <Badge key={id} asChild variant="outline" size="default">
              <a href={`#${id}`}>{label}</a>
            </Badge>
          ))}
        </nav>

        <LibrarySection id="tokens" eyebrow="Foundation" title="Design tokens">
          <div className="grid gap-10">
            <div>
              <Heading as="h3" variant="feature" className="mb-5">
                Color
              </Heading>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {colorTokens.map((token) => (
                  <ColorTokenTile key={token.variable} token={token} />
                ))}
              </div>
            </div>

            <div>
              <Heading as="h3" variant="feature" className="mb-5">
                Surfaces
              </Heading>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {surfaceTokens.map((token) => (
                  <SurfaceTokenTile key={token.variable} token={token} />
                ))}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <Heading as="h3" variant="feature" className="mb-5">
                  Radius
                </Heading>
                <div className="grid gap-4 sm:grid-cols-3">
                  {radiusTokens.map((token) => (
                    <Card key={token.variable} variant="panel" className="gap-4 p-4">
                      <div
                        className="h-20 border-2 border-[var(--ui-color-brand-primary)] bg-[var(--ui-color-brand-primary-soft)]"
                        style={{ borderRadius: `var(${token.variable})` }}
                      />
                      <TokenName {...token} />
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Heading as="h3" variant="feature" className="mb-5">
                  Elevation
                </Heading>
                <div className="grid gap-4 sm:grid-cols-3">
                  {shadowTokens.map((token) => (
                    <div key={token.variable} className="rounded-[var(--ui-radius-field)] bg-white p-4" style={{ boxShadow: `var(${token.variable})` }}>
                      <div className="mb-5 h-16 rounded-[var(--ui-radius-field)] bg-[var(--ui-color-surface-soft)]" />
                      <TokenName {...token} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LibrarySection>

        <LibrarySection id="typography" eyebrow="Foundation" title="Typography roles">
          <Card variant="glass" className="gap-8 p-6 sm:p-8">
            <div className="flex flex-col gap-8">
              <div className="border-b border-[var(--ui-color-border-strong)] pb-8">
                <code className="mb-3 block text-xs text-[var(--ui-color-text-muted)]">page / public page H1</code>
                <Heading as="p" variant="page">Clear page-level hierarchy</Heading>
              </div>
              <div className="border-b border-[var(--ui-color-border-strong)] pb-8">
                <code className="mb-3 block text-xs text-[var(--ui-color-text-muted)]">section / standard content heading</code>
                <Heading as="p" variant="section">A consistent section heading</Heading>
              </div>
              <div className="border-b border-[var(--ui-color-border-strong)] pb-8">
                <code className="mb-3 block text-xs text-[var(--ui-color-text-muted)]">display / editorial statement</code>
                <Heading as="p" variant="display">Thoughtful, editorial emphasis</Heading>
              </div>
              <div className="border-b border-[var(--ui-color-border-strong)] pb-8">
                <code className="mb-3 block text-xs text-[var(--ui-color-text-muted)]">feature / highlighted content</code>
                <Heading as="p" variant="feature">Focused feature title</Heading>
              </div>
              <div>
                <code className="mb-3 block text-xs text-[var(--ui-color-text-muted)]">card / compact content title</code>
                <Heading as="p" variant="card">Reusable card title</Heading>
              </div>
            </div>
          </Card>
        </LibrarySection>

        <LibrarySection id="components" eyebrow="Primitives" title="Components">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card variant="panel" className="p-6 sm:p-8">
              <Heading as="h3" variant="feature">Buttons</Heading>
              <p className="text-sm leading-relaxed text-[var(--ui-color-text-muted)]">Use semantic variants rather than one-off colors and shapes.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" size="sm">Primary</Button>
                <Button type="button" variant="outline" size="sm">Outline</Button>
                <Button type="button" variant="secondary" size="sm">Secondary</Button>
                <Button type="button" variant="editorial" size="sm">Editorial</Button>
                <Button type="button" variant="ghost" size="sm">Ghost</Button>
              </div>
            </Card>

            <Card variant="panel" className="p-6 sm:p-8">
              <Heading as="h3" variant="feature">Badges</Heading>
              <p className="text-sm leading-relaxed text-[var(--ui-color-text-muted)]">Small, scannable labels for categorization and supporting metadata.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ghost">Ghost</Badge>
              </div>
            </Card>

            <Card variant="panel" className="p-6 sm:p-8">
              <Heading as="h3" variant="feature">Cards</Heading>
              <p className="text-sm leading-relaxed text-[var(--ui-color-text-muted)]">Shared card variants handle emphasis, depth, and surface treatment.</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {(["default", "glass", "editorial"] as const).map((variant) => (
                  <Card key={variant} variant={variant} className="min-h-24 justify-end p-4">
                    <Heading as="p" variant="card" className="capitalize">{variant}</Heading>
                  </Card>
                ))}
              </div>
            </Card>

            <Card variant="panel" className="p-6 sm:p-8">
              <Heading as="h3" variant="feature">Fields</Heading>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="design-system-email">Email address</Label>
                  <Input id="design-system-email" type="email" placeholder="name@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="design-system-message">Message</Label>
                  <Textarea id="design-system-message" placeholder="A multiline field reference." className="min-h-28" />
                </div>
              </div>
            </Card>
          </div>
        </LibrarySection>
      </Container>

      <SiteFooter />
    </main>
  );
}
