import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Heading } from "./heading";

type PageIntroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

function PageIntro({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  titleClassName,
  children,
}: PageIntroProps) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-5", centered && "mx-auto items-center text-center", className)}>
      {eyebrow ? (
        <p className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[var(--ui-color-brand-ink)]">
          {eyebrow}
        </p>
      ) : null}
      <Heading as="h1" variant="page" className={titleClassName}>
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--ui-color-text-muted)]">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export { PageIntro };
