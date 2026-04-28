import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full min-w-0 rounded-[22px] border-2 border-[#CFE5F8] bg-[#F7FBFF] px-6 py-3 text-base text-[#3c3e3f] outline-none transition-colors placeholder:text-[#9bb7d0] focus-visible:border-[#1183D0] focus-visible:ring-2 focus-visible:ring-[#1183D0]/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F0F7FF] disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
