import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("m-0", {
  variants: {
    variant: {
      hero: "font-inter text-[length:var(--ui-font-size-hero)] leading-[var(--ui-line-height-display)] tracking-[var(--ui-tracking-display)]",
      page: "font-inter text-[length:var(--ui-font-size-page-title)] font-semibold leading-[var(--ui-line-height-heading)] tracking-[var(--ui-tracking-heading)]",
      profile: "font-inter text-[length:var(--ui-font-size-profile-title)] leading-[0.95] tracking-[var(--ui-tracking-heading)]",
      section: "font-inter text-[length:var(--ui-font-size-section-title)] font-semibold leading-[var(--ui-line-height-heading)] tracking-[var(--ui-tracking-heading)]",
      display: "font-inter text-[length:var(--ui-font-size-display-title)] leading-[var(--ui-line-height-display)] tracking-[var(--ui-tracking-display)]",
      feature: "font-inter text-[length:var(--ui-font-size-feature-title)] font-semibold leading-[1.12] tracking-[var(--ui-tracking-heading)]",
      card: "font-inter text-[length:var(--ui-font-size-card-title)] font-semibold leading-snug",
    },
    tone: {
      default: "text-[var(--ui-color-text-strong)]",
      editorial: "text-[var(--ui-color-text-editorial)]",
      muted: "text-[var(--ui-color-text-muted)]",
      inverse: "text-white",
    },
  },
  defaultVariants: {
    variant: "section",
    tone: "default",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p";

function Heading({
  as: Tag = "h2",
  variant,
  tone,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingTag;
  }) {
  return <Tag className={cn(headingVariants({ variant, tone }), className)} {...props} />;
}

export { Heading, headingVariants };
