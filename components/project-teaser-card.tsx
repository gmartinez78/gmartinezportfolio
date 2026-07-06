"use client"

import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTranslateTag } from "@/lib/i18n/use-translate"

type ProjectTeaserCardProps = {
  href: string
  title: string
  company?: string
  year?: number | string
  description: string
  tags: string[]
  image?: string | null
  background?: string
  ctaLabel: string
  locked?: boolean
  id?: string
  dataCardId?: string
  variant?: "carousel" | "grid"
  inactive?: boolean
  active?: boolean
  onMouseEnter?: () => void
  onFocus?: () => void
}

export function ProjectTeaserCard({
  href,
  title,
  company,
  year,
  description,
  tags,
  image,
  background,
  ctaLabel,
  locked = false,
  id,
  dataCardId,
  variant = "grid",
  inactive = false,
  active = false,
  onMouseEnter,
  onFocus,
}: ProjectTeaserCardProps) {
  const isCarousel = variant === "carousel"
  const translateTag = useTranslateTag()

  return (
    <Link
      id={id}
      data-home-card-id={dataCardId}
      href={href}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={cn(
        "group flex min-w-0 flex-col gap-5 outline-none",
        isCarousel
          ? "min-w-[86%] snap-start rounded-[30px] bg-white p-0 transition-all md:min-w-[46%] xl:min-w-[31%]"
          : "cursor-pointer",
        inactive && "opacity-45"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] bg-[#e9f3fb] transition-all duration-300",
          isCarousel
            ? "h-[230px] group-hover:-translate-y-1 sm:h-[300px] xl:h-[230px]"
            : "h-[230px] shadow-[0_18px_52px_rgba(14,41,81,0.12)] group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(14,41,81,0.22)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_28px_70px_rgba(14,41,81,0.22)]",
        )}
        style={background ? { background } : undefined}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <div className="text-5xl font-inter font-bold text-[var(--ui-color-brand-primary)]">
                {year}
              </div>
              <div className="mt-2 text-xs leading-tight text-[var(--ui-color-text-muted)]">
                {company}
              </div>
            </div>
          </div>
        )}
        {active ? (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-[var(--ui-color-brand-primary)] ring-offset-4 ring-offset-white" />
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Badge key={tag} size="tag">
            {translateTag(tag)}
          </Badge>
        ))}
      </div>
      {isCarousel ? (
        <div className="flex min-h-[236px] flex-col justify-between">
          <div className="pb-4">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-xs font-medium text-[var(--ui-color-text-muted)]">
                {company}
              </span>
              <span className="text-[#bcd2ff]">·</span>
              <span className="text-xs text-[var(--ui-color-text-muted)]">{year}</span>
              {locked ? (
                <>
                  <span className="text-[#bcd2ff]">·</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ui-color-brand-primary)]">
                    Locked
                  </span>
                </>
              ) : null}
            </div>
            <h3 className="font-inter text-[30px] leading-snug text-[var(--ui-color-text-strong)] transition-colors duration-200">
              {title}
            </h3>
          </div>
          <div
            className={cn(
              "-mt-1 h-[148px] transition-all duration-300",
              active
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            <div className="flex h-full flex-col gap-3">
              <p className="text-[15px] leading-relaxed text-[var(--ui-color-text-muted)]">
                {description}
              </p>
              <span className="inline-flex text-[14px] font-medium text-[var(--ui-color-brand-primary)] underline-offset-2 group-hover:underline">
                {ctaLabel} →
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-inter text-[30px] leading-snug text-[var(--ui-color-text-strong)] transition-colors duration-200 group-hover:text-[var(--ui-color-text-strong)] group-focus-visible:text-[var(--ui-color-text-strong)]">
            {title}
          </h3>
          <div className="-mt-2 h-[116px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <div className="flex h-full flex-col justify-between">
              <p className="text-[15px] leading-relaxed text-[var(--ui-color-text-muted)]">
                {description}
              </p>
              <span className="inline-flex text-[14px] font-medium text-[var(--ui-color-brand-primary)] underline-offset-2 group-hover:underline group-focus-visible:underline">
                {ctaLabel} →
              </span>
            </div>
          </div>
        </>
      )}
    </Link>
  )
}
