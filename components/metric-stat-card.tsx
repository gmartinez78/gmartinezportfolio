import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type MetricStatCardProps = {
  value: string
  label: string
  className?: string
  valueClassName?: string
  labelClassName?: string
}

export function MetricStatCard({
  value,
  label,
  className,
  valueClassName,
  labelClassName,
}: MetricStatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="px-4 py-5">
        <p className={cn("text-[24px] font-bold leading-none text-[var(--ui-color-text-strong)]", valueClassName)}>
          {value}
        </p>
        <p className={cn("mt-2 text-[13px] leading-[1.4] text-[var(--ui-color-text-strong)]", labelClassName)}>
          {label}
        </p>
      </CardContent>
    </Card>
  )
}
