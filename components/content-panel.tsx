import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ContentPanelProps = {
  children: ReactNode
  className?: string
}

export function ContentPanel({ children, className }: ContentPanelProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_20px_48px_rgba(17,131,208,0.08)]",
        className
      )}
    >
      {children}
    </div>
  )
}
