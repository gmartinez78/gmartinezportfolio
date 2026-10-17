"use client"

import type { FormEventHandler } from "react"

import { FormField, FormFieldMessage } from "@/components/form-field"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useTranslate } from "@/lib/i18n/use-translate"
import type { DictionaryKey } from "@/lib/i18n/dictionary"

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
  interestOptions?: string[]
  selectedInterests?: string[]
  onInterestToggle?: (interest: string) => void
  interestLabel?: string
  interestHint?: string
  messageLabel?: string
  messagePlaceholder?: string
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
  interestOptions = [],
  selectedInterests = [],
  onInterestToggle,
  interestLabel,
  interestHint,
  messageLabel,
  messagePlaceholder,
}: ContactFormCardProps) {
  const translate = useTranslate()

  return (
    <div className={cn("text-white", className)}>
      <div className={cn("p-8", contentClassName)}>
        <Heading as="h2" variant="card" className="mb-6 text-center text-xl text-white">
          {title}
        </Heading>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {interestOptions.length > 0 ? (
            <fieldset className="text-center">
              {interestLabel ? (
                <legend className="mb-3 w-full text-sm font-medium text-white/75">{interestLabel}</legend>
              ) : null}
              {interestHint ? <p className="mb-3 text-xs leading-relaxed text-white/60">{interestHint}</p> : null}
              <div className="flex flex-wrap justify-center gap-2.5">
                {interestOptions.map((interest) => {
                  const selected = selectedInterests.includes(interest)

                  return (
                    <button
                      key={interest}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onInterestToggle?.(interest)}
                      className={cn(
                        "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8df36] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2951]",
                        selected
                          ? "border-[#f8df36] bg-[#f8df36] text-[#141114]"
                          : "border-white/25 bg-white/5 text-white hover:border-white/55 hover:bg-white/10",
                      )}
                    >
                      {translate(`contactPage.interest.${interest}` as DictionaryKey)}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : null}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField>
              <Label htmlFor="contact-name" className="text-white">
                {translate("contactForm.name")} <span aria-hidden="true" className="text-[#f8df36]">*</span>
              </Label>
              <Input
                id="contact-name"
                type="text"
                value={values?.name ?? ""}
                onChange={(event) => onNameChange?.(event.target.value)}
                placeholder={translate("contactForm.namePlaceholder")}
                required
                aria-invalid={Boolean(errors?.name)}
                className="border-white/25 bg-white/5 text-white placeholder:text-white/45 focus-visible:border-[#f8df36] focus-visible:ring-[#f8df36]/20"
              />
              {errors?.name ? <FormFieldMessage className="text-[#c25b67]">{errors.name}</FormFieldMessage> : null}
            </FormField>
            <FormField>
              <Label htmlFor="contact-email" className="text-white">
                {translate("contactForm.email")} <span aria-hidden="true" className="text-[#f8df36]">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={values?.email ?? ""}
                onChange={(event) => onEmailChange?.(event.target.value)}
                placeholder={translate("contactForm.emailPlaceholder")}
                required
                aria-invalid={Boolean(errors?.email)}
                className="border-white/25 bg-white/5 text-white placeholder:text-white/45 focus-visible:border-[#f8df36] focus-visible:ring-[#f8df36]/20"
              />
              {errors?.email ? <FormFieldMessage className="text-[#c25b67]">{errors.email}</FormFieldMessage> : null}
            </FormField>
          </div>
          {showSubject ? (
            <FormField>
              <Label htmlFor="contact-subject" className="text-white">{translate("contactForm.subject")}</Label>
              <Input
                id="contact-subject"
                type="text"
                value={values?.subject ?? ""}
                onChange={(event) => onSubjectChange?.(event.target.value)}
                placeholder={translate("contactForm.subjectPlaceholder")}
                aria-invalid={Boolean(errors?.subject)}
                className="border-white/25 bg-white/5 text-white placeholder:text-white/45 focus-visible:border-[#f8df36] focus-visible:ring-[#f8df36]/20"
              />
              {errors?.subject ? <FormFieldMessage className="text-[#c25b67]">{errors.subject}</FormFieldMessage> : null}
            </FormField>
          ) : null}
          <FormField>
            <Label htmlFor="contact-message" className="text-white">{messageLabel ?? translate("contactForm.message")}</Label>
            <Textarea
              id="contact-message"
              rows={6}
              value={values?.message ?? ""}
              onChange={(event) => onMessageChange?.(event.target.value)}
              placeholder={messagePlaceholder ?? translate("contactForm.messagePlaceholder")}
              required
              className="resize-y border-white/25 bg-white/5 text-white placeholder:text-white/45 focus-visible:border-[#f8df36] focus-visible:ring-[#f8df36]/20"
              aria-invalid={Boolean(errors?.message)}
            />
            {errors?.message ? <FormFieldMessage className="text-[#c25b67]">{errors.message}</FormFieldMessage> : null}
          </FormField>
          {helperText ? (
            <p className="text-[13px] leading-6 text-white/75">
              {helperText}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={submitting}
            className={cn("mt-2 min-h-14 rounded-full bg-[#f8df36] text-[#141114] hover:bg-[#f2d92d]", submitClassName)}
          >
            {submitting ? translate("contactForm.sending") : submitLabel}
          </Button>
        </form>
      </div>
    </div>
  )
}
