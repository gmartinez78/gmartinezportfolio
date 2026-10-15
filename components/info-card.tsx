"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"

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
    <Card variant="glass" className="overflow-hidden rounded-[30px] p-0 py-0">
      <CardContent className="flex items-center gap-6 p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/78 text-[var(--ui-color-text-strong)] shadow-[0_10px_24px_rgba(31,53,94,0.06)]">
          {icon}
        </div>
        <div>
          <Heading as="h3" variant="card" className="text-base text-[var(--ui-color-text-body)]">{label}</Heading>
          {content}
        </div>
      </CardContent>
    </Card>
  )
}
