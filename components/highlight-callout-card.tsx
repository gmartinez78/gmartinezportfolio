import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type HighlightTag = {
  label: string
  className: string
}

type HighlightCalloutCardProps = {
  icon: ReactNode
  title: string
  description: string
  tags: HighlightTag[]
  className?: string
}

export function HighlightCalloutCard({
  icon,
  title,
  description,
  tags,
  className,
}: HighlightCalloutCardProps) {
  return (
    <div className={cn("rounded-[24px] bg-white/88 p-4 shadow-[0_18px_34px_rgba(31,53,94,0.08)]", className)}>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <div>
          <p className="text-[14px] font-semibold text-[var(--ui-color-text-strong)]">{title}</p>
          <p className="text-[12px] text-[#7b8598]">{description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag.label} className={tag.className}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  )
}
