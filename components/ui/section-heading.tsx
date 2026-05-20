import type React from "react"

import { cn } from "@/lib/utils"

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
            inverse ? "text-white/60" : "text-[#1183D0]"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-inter text-[44px] leading-[1.05]",
          inverse ? "text-white" : "text-[#0e2951]"
        )}
      >
        {title}
      </h2>
      <div className={cn("h-1 w-24 rounded-full", inverse ? "bg-white" : "bg-[#1183D0]")} />
    </div>
  )
}
