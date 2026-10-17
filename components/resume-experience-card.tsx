import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"

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
    <Card variant="glass" className="overflow-hidden rounded-[34px] p-0 py-0">
      <CardContent className="p-6 sm:p-7">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.7fr)]">
          <div>
            <Heading as="h3" variant="card" className="text-lg">{role}</Heading>
            <p className="mt-0.5 text-sm text-[var(--ui-color-text-muted)]">{company}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} size="tag">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[var(--ui-color-border-strong)] text-sm text-[var(--ui-color-text-muted)]">
            <p className="py-3 first:pt-0 last:pb-0">
              {period}
            </p>
            <p className="py-3 first:pt-0 last:pb-0">
              {location}
            </p>
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
      </CardContent>
    </Card>
  )
}
