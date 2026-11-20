"use client";

import { forwardRef, type AnchorHTMLAttributes } from "react";
import { BOOKING_URL } from "../lib/site";
import { useTranslate } from "../lib/i18n/use-translate";

export const BookACallLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function BookACallLink({ className, children, ...props }, ref) {
    const translate = useTranslate();

    return (
      <a
        {...props}
        ref={ref}
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children ?? translate("booking.cta")}
        <span className="sr-only"> ({translate("booking.opensInNewTab")})</span>
      </a>
    );
  },
);
