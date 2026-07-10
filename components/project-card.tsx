"use client"

import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslate, useTranslateTag } from "@/lib/i18n/use-translate"

type ProjectCardProps = {
  id?: string
  href: string
  title: string
  company: string
  year: number | string
  tagline: string
  tags: string[]
  previewImage?: string | null
  previewAlt: string
  stat: string
  statLabel: string
  background: string
  locked?: boolean
  reversed?: boolean
  ctaLabel?: string
}

export function ProjectCard({
  id,
  href,
  title,
  company,
  year,
  tagline,
  tags,
  previewImage,
  previewAlt,
  stat,
  statLabel,
  background,
  locked = false,
  reversed = false,
  ctaLabel,
}: ProjectCardProps) {
  const translate = useTranslate()
  const translateTag = useTranslateTag()
  const resolvedCtaLabel = ctaLabel ?? translate("projectsPage.viewCaseStudy")

  return (
    <Link
      id={id}
      href={href}
      className="group block transition-all duration-300 hover:-translate-y-1.5"
    >
      <Card className="relative flex overflow-hidden rounded-[40px] border border-white/55 bg-[linear-gradient(135deg,rgba(247,241,249,0.82)_0%,rgba(243,247,255,0.76)_40%,rgba(255,246,238,0.78)_100%)] p-0 py-0 shadow-[0_26px_70px_rgba(31,53,94,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/75 group-hover:shadow-[0_34px_84px_rgba(31,53,94,0.14)] md:flex-row">
        <div className="pointer-events-none absolute -left-12 top-10 h-44 w-44 rounded-full bg-[#d8ebff]/70 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-0 h-36 w-36 rounded-full bg-[#f0d9ff]/55 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#ffe7c7]/60 blur-3xl" />

        <div
          className={`relative flex h-64 w-full shrink-0 items-center justify-center overflow-hidden border-b border-white/35 bg-white/22 p-5 md:h-auto md:w-[340px] md:border-b-0 ${reversed ? "md:order-2" : ""}`}
          style={!previewImage ? { background } : undefined}
        >
          <div
            className={`relative h-full w-full overflow-hidden rounded-[30px] border border-white/60 bg-white/55 shadow-[0_18px_42px_rgba(31,53,94,0.08)] transition-transform duration-500 group-hover:scale-[1.03] ${reversed ? "md:rotate-[1.6deg]" : "md:rotate-[-1.6deg]"}`}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt={previewAlt}
                fill
                sizes="(min-width: 768px) 340px, 100vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <div className="text-5xl font-inter font-bold text-[var(--ui-color-brand-primary)]">
                    {stat}
                  </div>
                  <div className="mx-auto mt-1 max-w-[120px] text-xs leading-tight text-[var(--ui-color-text-muted)]">
                    {statLabel}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <CardContent className="relative flex flex-1 flex-col justify-between bg-transparent p-8 md:p-9">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/72 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ui-color-text-muted)]">
                {company}
              </span>
              <span className="rounded-full bg-white/62 px-3 py-1 text-[11px] font-medium text-[#6a7e9d]">
                {year}
              </span>
              {locked ? (
                <span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ui-color-brand-primary)]">
                  {translate("projectCard.locked")}
                </span>
              ) : null}
            </div>
            <h2 className="mb-5 font-inter text-[28px] leading-[1.08] text-[var(--ui-color-text-strong)]">
              {title}
            </h2>
            <p className="max-w-[560px] text-[15px] leading-[1.8] text-[var(--ui-color-text-muted)]">
              {tagline}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} size="tag">
                  {translateTag(tag)}
                </Badge>
              ))}
            </div>
            <span className="rounded-full bg-white/72 px-4 py-2 text-sm font-medium text-[var(--ui-color-brand-primary)] transition-colors group-hover:bg-white">
              {resolvedCtaLabel}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
