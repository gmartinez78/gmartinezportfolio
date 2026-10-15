import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ContentPanelProps = {
  children: ReactNode
  className?: string
}

export function ContentPanel({ children, className }: ContentPanelProps) {
  return (
    <Card
      variant="panel"
      className={cn(
        "overflow-hidden rounded-[24px] border-[#d7e8f7] p-0 py-0 shadow-[0_20px_48px_rgba(17,131,208,0.08)]",
        className
      )}
    >
      {children}
    </Card>
  )
}
