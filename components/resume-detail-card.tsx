import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
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
    <Card variant="glass" className={cn("rounded-[30px] p-0 py-0", className)}>
      <CardContent className={cn("p-6", contentClassName)}>
        {badge ? <Badge size="tag">{badge}</Badge> : null}
        <Heading as="h3" variant="card" className={cn("mt-4 text-[18px]", titleClassName)}>
          {title}
        </Heading>
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
