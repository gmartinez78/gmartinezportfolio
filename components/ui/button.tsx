import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-5 whitespace-nowrap border-2 border-transparent bg-clip-padding font-semibold outline-none transition-all focus-visible:ring-2 focus-visible:ring-[var(--ui-color-brand-primary-ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-[var(--ui-radius-button)] bg-[var(--ui-color-brand-primary)] text-white shadow-none hover:bg-[var(--ui-color-brand-primary-hover)]",
        outline:
          "rounded-[var(--ui-radius-button)] border-[var(--ui-color-border-strong)] bg-[var(--ui-color-surface-base)] text-[var(--ui-color-brand-primary)] shadow-none hover:border-[var(--ui-color-brand-primary)] hover:bg-[var(--ui-color-surface-base)] hover:text-[var(--ui-color-brand-primary)]",
        filter:
          "rounded-[var(--ui-radius-pill)] border-[var(--ui-color-border-strong)] bg-transparent text-[var(--ui-color-text-strong)] shadow-none hover:border-[var(--ui-color-brand-primary)] hover:bg-[var(--ui-color-brand-primary-soft)] hover:text-[var(--ui-color-brand-primary)]",
        secondary:
          "rounded-[var(--ui-radius-button)] bg-[var(--ui-color-brand-primary-soft)] text-[var(--ui-color-brand-primary)] shadow-none hover:bg-[var(--ui-color-brand-primary-soft-hover)]",
        editorial:
          "rounded-[var(--ui-radius-button)] bg-[var(--ui-color-brand-editorial)] text-white shadow-[0_12px_24px_rgba(231,104,143,0.25)] hover:-translate-y-0.5 hover:bg-[var(--ui-color-brand-editorial-hover)]",
        "editorial-outline":
          "rounded-[var(--ui-radius-button)] border border-[#31252a]/20 bg-white/60 text-[#31252a] shadow-none hover:-translate-y-0.5 hover:bg-white",
        tertiary:
          "rounded-[var(--ui-radius-button)] border-[var(--ui-color-border-strong)] bg-transparent text-[var(--ui-color-text-muted)] shadow-none hover:border-[var(--ui-color-border-muted)] hover:bg-[var(--ui-color-surface-base)] hover:text-[var(--ui-color-text-strong)]",
        ghost:
          "rounded-[var(--ui-radius-button)] bg-transparent text-[var(--ui-color-text-muted)] shadow-none hover:bg-transparent hover:text-[var(--ui-color-brand-primary)]",
        destructive:
          "rounded-[var(--ui-radius-button)] bg-[var(--ui-color-danger)] text-white shadow-none hover:bg-[var(--ui-color-danger-hover)]",
        link:
          "rounded-none bg-transparent px-0 text-[var(--ui-color-text-muted)] shadow-none underline-offset-4 hover:bg-transparent hover:text-[var(--ui-color-brand-primary)] hover:underline",
      },
      size: {
        default: "px-10 py-3 text-xl",
        xs: "px-4 py-2 text-sm",
        sm: "px-7 py-3 text-base",
        lg: "px-12 py-3 text-2xl",
        xl: "px-14 py-3 text-2xl",
        hero: "px-7 py-3.5 text-sm uppercase tracking-[0.08em]",
        icon: "h-10 w-10 rounded-full",
        "icon-xs": "h-7 w-7 rounded-full",
        "icon-sm": "h-9 w-9 rounded-full",
        "icon-lg": "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
