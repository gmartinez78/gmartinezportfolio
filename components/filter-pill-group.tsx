import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type FilterPillGroupProps = {
  items: string[]
  activeItem: string
  onSelect: (item: string) => void
  getLabel?: (item: string) => string
  className?: string
}

export function FilterPillGroup({
  items,
  activeItem,
  onSelect,
  getLabel,
  className,
}: FilterPillGroupProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {items.map((item) => (
        <Badge
          key={item}
          asChild
          variant={activeItem === item ? "default" : "outline"}
          size="tag"
        >
          <button
            type="button"
            aria-pressed={activeItem === item}
            onClick={() => onSelect(item)}
          >
            {getLabel ? getLabel(item) : item}
          </button>
        </Badge>
      ))}
    </div>
  )
}
