import { Card, CardContent } from "@/components/ui/card"

type KeyValueItem = {
  label: string
  value: string
  valueClassName?: string
}

type KeyValueStackCardProps = {
  items: KeyValueItem[]
}

export function KeyValueStackCard({ items }: KeyValueStackCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 px-5 py-5">
        {items.map((item) => (
          <div key={`${item.label}-${item.value}`}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ui-color-brand-primary)]">
              {item.label}
            </p>
            <p className={item.valueClassName ?? "mt-2 text-[15px] leading-[1.6] text-[var(--ui-color-text-muted)]"}>
              {item.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
