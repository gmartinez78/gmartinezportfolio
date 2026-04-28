import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent whitespace-nowrap font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#1183D0]/30 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#E0EEFB] text-[#1183D0] hover:bg-[#d4e9fb]",
        secondary:
          "bg-[#F0F7FF] text-[#5c7792] hover:bg-[#E0EEFB]",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 hover:bg-destructive/20",
        outline:
          "border-[#CFE5F8] bg-white text-[#1183D0] hover:bg-[#F0F7FF]",
        ghost:
          "bg-transparent text-[#5c7792] hover:bg-[#E0EEFB] hover:text-[#1183D0]",
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
