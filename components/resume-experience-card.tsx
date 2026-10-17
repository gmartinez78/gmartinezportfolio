import { useId, useState } from "react"

import { Badge } from "@/components/ui/badge"

type ExperienceBullet =
  | string
  | { segments: { text: string; bold?: boolean }[] }
  | { heading: string; items: string[] }

type ResumeExperienceCardProps = {
  role: string
  company: string
  period: string
  location: string
  bullets: ExperienceBullet[]
  tags: string[]
  className: string
  statusBadges: string[]
  expandLabel: string
  collapseLabel: string
}

const IMPACT_PHRASES = [
  "reduce design debt",
  "improving usability",
  "improving the conversion",
  "improving conversion",
  "completion rates",
  "completion time",
  "user confidence",
  "support tickets",
  "calls per year",
  "high-impact",
  "exceeding",
  "improving",
  "improved",
  "reduce",
  "reduced",
  "reducing",
  "increase",
  "increased",
  "increasing",
  "faster",
  "conversion",
]
const IMPACT_PATTERN = new RegExp(
  `(${IMPACT_PHRASES.join("|")}|\\b\\d[\\d,.]*(?:\\+)?(?:\\s?%)?)`,
  "gi",
)
const IMPACT_TOKEN_PATTERN = new RegExp(`^${IMPACT_PATTERN.source.slice(1, -1)}$`, "i")

function renderImpactText(text: string, keyPrefix: string) {
  return text.split(IMPACT_PATTERN).map((part, index) =>
    IMPACT_TOKEN_PATTERN.test(part) ? (
      <strong key={`${keyPrefix}-${index}`} className="font-semibold text-[#292929]">
        {part}
      </strong>
    ) : (
      <span key={`${keyPrefix}-${index}`}>{part}</span>
    )
  )
}

function ExperienceBulletText({ bullet }: { bullet: ExperienceBullet }) {
  const textClassName = "text-base leading-relaxed text-[#292929] sm:text-[17px]"

  if (typeof bullet === "string") {
    const openingPhrase = bullet.match(/^(\S+(?:\s+\S+){0,2})(\s+[\s\S]+)$/)

    return (
      <p className={textClassName}>
        {openingPhrase ? (
          <>
            <strong className="font-semibold text-[#292929]">{openingPhrase[1]}</strong>
            {renderImpactText(openingPhrase[2], "bullet")}
          </>
        ) : (
          renderImpactText(bullet, "bullet")
        )}
      </p>
    )
  }

  if ("segments" in bullet) {
    return (
      <p className={textClassName}>
        {bullet.segments.map((segment, index) =>
          segment.bold ? (
            <strong key={`${segment.text}-${index}`} className="font-semibold text-[#292929]">
              {segment.text}
            </strong>
          ) : (
            <span key={`${segment.text}-${index}`}>{renderImpactText(segment.text, `segment-${index}`)}</span>
          )
        )}
      </p>
    )
  }

  return (
    <div className={textClassName}>
      <p className="font-inter font-semibold text-[#292929]">{renderImpactText(bullet.heading, "heading")}</p>
      {bullet.items.map((item) => (
        <p key={item} className="mt-2">
          {renderImpactText(item, item)}
        </p>
      ))}
    </div>
  )
}

export function ResumeExperienceCard({
  role,
  company,
  period,
  location,
  bullets,
  tags,
  className,
  statusBadges,
  expandLabel,
  collapseLabel,
}: ResumeExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const detailsId = useId()
  const displayLocation = location.replace(/\s*\((?:remote|remoto|hybrid|híbrido)\)/i, "")

  return (
    <div className={className}>
      <div className="p-7 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-12">
          <div>
            <p className="mb-1 text-sm text-black">
              {period}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold leading-snug text-black sm:text-2xl">
                {role}
              </h3>
              {statusBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  size="sm"
                  className="border-black bg-transparent text-black hover:bg-transparent"
                >
                  {badge}
                </Badge>
              ))}
            </div>
            <p className="mt-1 font-playfair text-base italic text-black sm:text-lg">{company}</p>
            <p className="mt-0.5 text-sm text-black">{displayLocation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={tag}
                  size="sm"
                  className={`h-8 border-transparent px-4 text-xs text-black hover:text-black ${
                    [
                      "bg-[#c9e7ff] hover:bg-[#c9e7ff]",
                      "bg-[#f4e522] hover:bg-[#f4e522]",
                      "bg-[#efb9ed] hover:bg-[#efb9ed]",
                    ][index % 3]
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative min-h-24 min-w-0 md:min-h-0">
            <div
              id={detailsId}
              className={`${
                isExpanded ? "relative" : "absolute inset-0 overflow-hidden pb-4"
              }`}
            >
              {bullets.map((bullet, index) => (
                <div
                  key={typeof bullet === "string" ? bullet : "segments" in bullet ? bullet.segments.map(({ text }) => text).join("") : bullet.heading}
                  className={`${index === 0 ? "pb-6" : "py-6"} border-b border-[#e6e2e8] last:border-b-0`}
                >
                  <ExperienceBulletText bullet={bullet} />
                </div>
              ))}
            </div>
            {!isExpanded ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-white/85 to-white"
              />
            ) : null}
          </div>
        </div>
        {bullets.length > 1 ? (
          <button
            type="button"
            aria-label={`${isExpanded ? collapseLabel : expandLabel} ${role}`}
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="group mx-auto mt-4 flex items-center justify-center gap-1 rounded-full px-3 text-base font-medium text-[var(--ui-color-brand-primary)] transition-colors hover:bg-[var(--ui-color-brand-primary-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-color-brand-primary)]"
          >
            <span>{isExpanded ? collapseLabel : expandLabel}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  )
}
