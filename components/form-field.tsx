import type * as React from "react"

import { cn } from "@/lib/utils"

function FormField({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FormFieldMessage({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-[var(--ui-color-text-muted)]",
        className
      )}
      {...props}
    />
  )
}

export { FormField, FormFieldMessage }
