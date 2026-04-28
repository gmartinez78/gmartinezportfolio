import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[180px] w-full rounded-[22px] border-2 border-[#CFE5F8] bg-[#F7FBFF] px-6 py-5 text-base text-[#3c3e3f] outline-none transition-colors placeholder:text-[#9bb7d0] focus-visible:border-[#1183D0] focus-visible:ring-2 focus-visible:ring-[#1183D0]/15 disabled:cursor-not-allowed disabled:bg-[#F0F7FF] disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
