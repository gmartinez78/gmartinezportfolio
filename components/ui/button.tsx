import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-5 whitespace-nowrap border-2 border-transparent bg-clip-padding font-semibold outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#1183D0]/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-[24px] bg-[#1183D0] text-white shadow-none hover:bg-[#0e75b8]",
        outline:
          "rounded-[24px] border-[#CFE5F8] bg-white text-[#1183D0] shadow-none hover:border-[#1183D0] hover:bg-white hover:text-[#1183D0]",
        secondary:
          "rounded-[24px] bg-[#E0EEFB] text-[#1183D0] shadow-none hover:bg-[#d4e9fb]",
        ghost:
          "rounded-[24px] bg-transparent text-[#5c7792] shadow-none hover:bg-transparent hover:text-[#1183D0]",
        destructive:
          "rounded-[24px] bg-[#d60060] text-white shadow-none hover:bg-[#b5004e]",
        link:
          "rounded-none bg-transparent px-0 text-[#5c7792] shadow-none underline-offset-4 hover:bg-transparent hover:text-[#1183D0] hover:underline",
      },
      size: {
        default: "h-14 px-10 text-xl",
        xs: "h-9 px-4 text-sm",
        sm: "h-11 px-7 text-base",
        lg: "h-16 px-12 text-2xl",
        xl: "h-[68px] px-14 text-2xl",
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
