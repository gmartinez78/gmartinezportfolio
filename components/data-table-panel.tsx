import type { ReactNode } from "react"

import { ContentPanel } from "@/components/content-panel"
import { cn } from "@/lib/utils"

type DataTablePanelProps = {
  headers: ReactNode[]
  rows: ReactNode[][]
  columnsClassName: string
  headerClassName?: string
  rowClassName?: string
  wrapperClassName?: string
  minWidthClassName?: string
}

export function DataTablePanel({
  headers,
  rows,
  columnsClassName,
  headerClassName,
  rowClassName,
  wrapperClassName,
  minWidthClassName,
}: DataTablePanelProps) {
  return (
    <ContentPanel className={cn("md:block", wrapperClassName)}>
      <div className={cn(minWidthClassName)}>
        <div
          className={cn(
            "border-b border-[#d7e8f7] bg-[#f7f9fb] text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--ui-color-text-strong)]",
            columnsClassName,
            headerClassName
          )}
        >
          {headers.map((header, index) => (
            <div key={`header-${index}`}>{header}</div>
          ))}
        </div>
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={cn(
              "border-t border-[#d7e8f7] text-[15px] leading-[1.6] text-[var(--ui-color-text-muted)]",
              columnsClassName,
              rowClassName
            )}
          >
            {row.map((cell, cellIndex) => (
              <div key={`cell-${rowIndex}-${cellIndex}`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </ContentPanel>
  )
}
