import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type ExperienceBullet = string | { heading: string; items: string[] }

type ResumeExperienceCardProps = {
  role: string
  company: string
  period: string
  location: string
  bullets: ExperienceBullet[]
  tags: string[]
}

export function ResumeExperienceCard({
  role,
  company,
  period,
  location,
  bullets,
  tags,
}: ResumeExperienceCardProps) {
  return (
    <Card className="overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(247,251,255,0.74)_100%)] p-0 py-0 shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl">
      <CardContent className="p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--ui-color-text-strong)]">{role}</h3>
            <p className="mt-0.5 text-sm text-[var(--ui-color-text-muted)]">{company}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              {period}
            </Badge>
            <Badge variant="secondary" size="sm">
              {location}
            </Badge>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet) =>
            typeof bullet === "string" ? (
              <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-[var(--ui-color-text-body)]">
                <span className="mt-1 shrink-0 text-[var(--ui-color-brand-primary)]">›</span>
                {bullet}
              </li>
            ) : (
              <li key={bullet.heading} className="text-sm leading-relaxed text-[var(--ui-color-text-body)]">
                <div className="flex gap-2">
                  <span className="mt-1 shrink-0 text-[var(--ui-color-brand-primary)]">›</span>
                  <span className="font-inter font-semibold text-[var(--ui-color-text-strong)]">
                    {bullet.heading}
                  </span>
                </div>
                <ul className="mt-2 space-y-2 pl-5">
                  {bullet.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--ui-color-text-body)]">
                      <span className="mt-1 shrink-0 text-[var(--ui-color-brand-primary)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} size="tag">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
