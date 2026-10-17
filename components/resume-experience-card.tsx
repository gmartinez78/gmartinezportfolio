import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"

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
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-12">
          <div>
            <Heading as="h3" variant="card" className="text-xl sm:text-2xl">{role}</Heading>
            <p className="mt-0.5 text-sm text-[var(--ui-color-text-muted)]">{company}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} size="tag">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[var(--ui-color-border-strong)]">
            <p className="py-3 first:pt-0 text-sm text-[var(--ui-color-text-muted)]">
              {period} · {location}
            </p>
            {bullets.map((bullet) =>
              typeof bullet === "string" ? (
                <p key={bullet} className="py-3 text-sm leading-relaxed text-[var(--ui-color-text-body)]">
                  {bullet}
                </p>
              ) : "segments" in bullet ? (
                <p key={bullet.segments.map(({ text }) => text).join("")} className="py-3 text-sm leading-relaxed text-[var(--ui-color-text-body)]">
                  {bullet.segments.map((segment, index) =>
                    segment.bold ? (
                      <strong key={`${segment.text}-${index}`} className="font-semibold text-[var(--ui-color-text-strong)]">
                        {segment.text}
                      </strong>
                    ) : (
                      <span key={`${segment.text}-${index}`}>{segment.text}</span>
                    )
                  )}
                </p>
              ) : (
                <div key={bullet.heading} className="py-3 text-sm leading-relaxed text-[var(--ui-color-text-body)]">
                  <p className="font-inter font-semibold text-[var(--ui-color-text-strong)]">
                    {bullet.heading}
                  </p>
                  {bullet.items.map((item) => (
                    <p key={item} className="mt-2">
                      {item}
                    </p>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
