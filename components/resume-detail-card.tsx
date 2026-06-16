import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ResumeDetailCardProps = {
  badge?: string
  title: string
  description?: string
  className?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: ReactNode
}

export function ResumeDetailCard({
  badge,
  title,
  description,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  children,
}: ResumeDetailCardProps) {
  return (
    <Card className={cn("rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(247,251,255,0.76)_100%)] p-0 py-0 shadow-[0_16px_40px_rgba(31,53,94,0.07)]", className)}>
      <CardContent className={cn("p-6", contentClassName)}>
        {badge ? <Badge size="tag">{badge}</Badge> : null}
        <h3 className={cn("mt-4 text-[18px] font-semibold text-[var(--ui-color-text-strong)]", titleClassName)}>
          {title}
        </h3>
        {description ? (
          <p className={cn("mt-2 text-[15px] leading-relaxed text-[var(--ui-color-text-muted)]", descriptionClassName)}>
            {description}
          </p>
        ) : null}
        {children}
      </CardContent>
    </Card>
  )
}
