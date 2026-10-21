import type React from "react"

import { cn } from "@/lib/utils"
import { Heading } from "./heading"

export function SectionHeading({
  eyebrow,
  title,
  className,
  centered = false,
  inverse = false,
}: {
  eyebrow?: string
  title: React.ReactNode
  className?: string
  centered?: boolean
  inverse?: boolean
}) {
  return (
    <div className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-[13px] font-semibold uppercase tracking-[0.45em]",
            inverse ? "text-white/60" : "text-[var(--ui-color-brand-ink)]"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading as="h2" variant="section" tone={inverse ? "inverse" : "default"}>
        {title}
      </Heading>
    </div>
  )
}
