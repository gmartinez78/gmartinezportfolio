import { cn } from "@/lib/utils"

type ChecklistItem = {
  label: string
  status: string
  statusClassName?: string
}

type ChecklistStatusCardProps = {
  eyebrow: string
  badge: string
  badgeClassName?: string
  items: ChecklistItem[]
  className?: string
}

export function ChecklistStatusCard({
  eyebrow,
  badge,
  badgeClassName,
  items,
  className,
}: ChecklistStatusCardProps) {
  return (
    <div className={cn("rounded-[18px] border border-[#e7edf6] bg-[#fbfcfe] p-3 shadow-[0_10px_22px_rgba(30,38,61,0.04)]", className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ui-color-text-strong)]">
          {eyebrow}
        </p>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]", badgeClassName)}>
          {badge}
        </span>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={`${item.label}-${item.status}`} className="flex items-center justify-between rounded-[12px] bg-white px-3 py-2">
            <span className="text-[12px] font-medium text-[var(--ui-color-text-muted)]">{item.label}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", item.statusClassName)}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
