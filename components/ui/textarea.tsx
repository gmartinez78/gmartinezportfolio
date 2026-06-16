import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[180px] w-full rounded-[var(--ui-radius-field)] border-2 border-[var(--ui-color-border-strong)] bg-[var(--ui-color-surface-soft)] px-6 py-5 text-base text-[var(--ui-color-text-body)] outline-none transition-colors placeholder:text-[var(--ui-color-text-subtle)] focus-visible:border-[var(--ui-color-brand-primary)] focus-visible:ring-2 focus-visible:ring-[rgb(17_131_208_/_0.15)] disabled:cursor-not-allowed disabled:bg-[var(--ui-color-surface-soft-hover)] disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
