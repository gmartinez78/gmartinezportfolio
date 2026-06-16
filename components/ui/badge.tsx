import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[var(--ui-radius-pill)] border border-transparent whitespace-nowrap font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--ui-color-brand-primary-ring)] [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--ui-color-brand-primary-soft)] text-[var(--ui-color-brand-primary)] hover:bg-[var(--ui-color-brand-primary-soft-hover)]",
        secondary:
          "bg-[var(--ui-color-surface-soft-hover)] text-[var(--ui-color-text-muted)] hover:bg-[var(--ui-color-brand-primary-soft)]",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 hover:bg-destructive/20",
        outline:
          "border-[var(--ui-color-border-strong)] bg-[var(--ui-color-surface-base)] text-[var(--ui-color-brand-primary)] hover:bg-[var(--ui-color-surface-soft-hover)]",
        ghost:
          "bg-transparent text-[var(--ui-color-text-muted)] hover:bg-[var(--ui-color-brand-primary-soft)] hover:text-[var(--ui-color-brand-primary)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-8 px-4 py-1 text-sm",
        sm: "min-h-6 px-3 py-0.5 text-xs",
        tag: "h-[23px] w-fit px-3 text-xs leading-none",
        lg: "min-h-11 px-6 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
