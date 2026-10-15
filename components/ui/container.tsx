import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      narrow: "max-w-[720px]",
      content: "max-w-[1080px]",
      wide: "max-w-[1280px]",
      screen: "max-w-[1440px]",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

function Container({
  as: Tag = "div",
  size,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & {
    as?: "div" | "section" | "article" | "main";
  }) {
  return <Tag className={cn(containerVariants({ size }), className)} {...props} />;
}

export { Container, containerVariants };
