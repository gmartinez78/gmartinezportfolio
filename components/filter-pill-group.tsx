import { Badge } from "@/components/ui/badge"

type FilterPillGroupProps = {
  items: string[]
  activeItem: string
  onSelect: (item: string) => void
  getLabel?: (item: string) => string
}

export function FilterPillGroup({
  items,
  activeItem,
  onSelect,
  getLabel,
}: FilterPillGroupProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
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
