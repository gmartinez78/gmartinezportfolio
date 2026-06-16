import { cn } from "@/lib/utils"

type NarrativePanelSection = {
  title: string
  text?: string
  items?: string[]
  titleClassName?: string
  align?: "left" | "center"
}

type NarrativePanelCardProps = {
  badge: string
  description: string
  sections?: NarrativePanelSection[]
  className?: string
}

export function NarrativePanelCard({
  badge,
  description,
  sections = [],
  className,
}: NarrativePanelCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[24px] bg-white px-6 py-7 text-center shadow-[0_14px_34px_rgba(14,41,81,0.06)]",
        className
      )}
    >
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--ui-color-brand-primary)]">
        {badge}
      </p>
      <p className="mt-4 font-inter text-[15px] leading-[1.7] text-[var(--ui-color-text-muted)]">
        {description}
      </p>
      {sections.map((section, index) => (
        <div
          key={`${badge}-${section.title}-${index}`}
          className={cn(
            "mt-5 border-t border-[#d7e8f7] pt-5",
            section.align === "left" ? "text-left" : "text-center"
          )}
        >
          <p className={cn("font-inter text-[14px] font-semibold uppercase tracking-[0.12em]", section.titleClassName ?? "text-[var(--ui-color-text-muted)]")}>
            {section.title}
          </p>
          {section.text ? (
            <p className="mt-4 font-inter text-[15px] leading-[1.7] text-[var(--ui-color-text-muted)]">
              {section.text}
            </p>
          ) : null}
          {section.items?.length ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 font-inter text-[14px] leading-[1.7] text-[var(--ui-color-text-muted)]">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}
