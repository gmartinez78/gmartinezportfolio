"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

type InfoCardProps = {
  icon: ReactNode
  label: string
  value: string
  href?: string | null
}

export function InfoCard({ icon, label, value, href }: InfoCardProps) {
  const content = href?.startsWith("/") ? (
    <Link
      href={href}
      className="text-sm font-medium text-[var(--ui-color-text-strong)] transition-colors hover:text-[var(--ui-color-brand-primary)]"
    >
      {value}
    </Link>
  ) : href ? (
    <a
      href={href}
      className="text-sm font-medium text-[var(--ui-color-text-strong)] transition-colors hover:text-[var(--ui-color-brand-primary)]"
    >
      {value}
    </a>
  ) : (
    <p className="text-sm font-medium text-[var(--ui-color-text-strong)]">{value}</p>
  )

  return (
    <Card className="overflow-hidden rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(247,251,255,0.74)_100%)] p-0 py-0 shadow-[0_18px_42px_rgba(31,53,94,0.08)]">
      <CardContent className="flex items-center gap-6 p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/78 text-[var(--ui-color-text-strong)] shadow-[0_10px_24px_rgba(31,53,94,0.06)]">
          {icon}
        </div>
        <div>
          <p className="text-base font-semibold text-[var(--ui-color-text-body)]">{label}</p>
          {content}
        </div>
      </CardContent>
    </Card>
  )
}
