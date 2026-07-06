"use client"

import type { FormEventHandler } from "react"

import { FormField, FormFieldMessage } from "@/components/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useTranslate } from "@/lib/i18n/use-translate"

type ContactFormErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type ContactFormValues = {
  name: string
  email: string
  subject?: string
  message: string
}

type ContactFormCardProps = {
  title: string
  submitLabel: string
  onSubmit?: FormEventHandler<HTMLFormElement>
  values?: ContactFormValues
  errors?: ContactFormErrors
  submitting?: boolean
  showSubject?: boolean
  helperText?: string
  className?: string
  contentClassName?: string
  submitClassName?: string
  onNameChange?: (value: string) => void
  onEmailChange?: (value: string) => void
  onSubjectChange?: (value: string) => void
  onMessageChange?: (value: string) => void
}

export function ContactFormCard({
  title,
  submitLabel,
  onSubmit,
  values,
  errors,
  submitting = false,
  showSubject = true,
  helperText,
  className,
  contentClassName,
  submitClassName,
  onNameChange,
  onEmailChange,
  onSubjectChange,
  onMessageChange,
}: ContactFormCardProps) {
  const translate = useTranslate()

  return (
    <Card className={cn("overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(247,251,255,0.74)_100%)] p-0 py-0 shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl", className)}>
      <CardContent className={cn("p-8", contentClassName)}>
        <h2 className="mb-6 text-xl font-semibold text-[var(--ui-color-text-strong)]">
          {title}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <FormField>
              <Label htmlFor="contact-name">{translate("contactForm.name")}</Label>
              <Input
                id="contact-name"
                type="text"
                value={values?.name ?? ""}
                onChange={(event) => onNameChange?.(event.target.value)}
                placeholder={translate("contactForm.namePlaceholder")}
                aria-invalid={Boolean(errors?.name)}
              />
              {errors?.name ? <FormFieldMessage className="text-[#c25b67]">{errors.name}</FormFieldMessage> : null}
            </FormField>
            <FormField>
              <Label htmlFor="contact-email">{translate("contactForm.email")}</Label>
              <Input
                id="contact-email"
                type="email"
                value={values?.email ?? ""}
                onChange={(event) => onEmailChange?.(event.target.value)}
                placeholder={translate("contactForm.emailPlaceholder")}
                aria-invalid={Boolean(errors?.email)}
              />
              {errors?.email ? <FormFieldMessage className="text-[#c25b67]">{errors.email}</FormFieldMessage> : null}
            </FormField>
          </div>
          {showSubject ? (
            <FormField>
              <Label htmlFor="contact-subject">{translate("contactForm.subject")}</Label>
              <Input
                id="contact-subject"
                type="text"
                value={values?.subject ?? ""}
                onChange={(event) => onSubjectChange?.(event.target.value)}
                placeholder={translate("contactForm.subjectPlaceholder")}
                aria-invalid={Boolean(errors?.subject)}
              />
              {errors?.subject ? <FormFieldMessage className="text-[#c25b67]">{errors.subject}</FormFieldMessage> : null}
            </FormField>
          ) : null}
          <FormField>
            <Label htmlFor="contact-message">{translate("contactForm.message")}</Label>
            <Textarea
              id="contact-message"
              rows={6}
              value={values?.message ?? ""}
              onChange={(event) => onMessageChange?.(event.target.value)}
              placeholder={translate("contactForm.messagePlaceholder")}
              className="resize-none"
              aria-invalid={Boolean(errors?.message)}
            />
            {errors?.message ? <FormFieldMessage className="text-[#c25b67]">{errors.message}</FormFieldMessage> : null}
          </FormField>
          {helperText ? (
            <div className="rounded-[18px] border border-[#dce7f4] bg-white px-4 py-4 text-[13px] leading-7 text-[var(--ui-color-text-muted)]">
              {helperText}
            </div>
          ) : null}
          <Button
            type="submit"
            disabled={submitting}
            className={cn("mt-2", submitClassName)}
          >
            {submitting ? translate("contactForm.sending") : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
