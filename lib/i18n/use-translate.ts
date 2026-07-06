"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { translate, translateTagLabel, type DictionaryKey } from "@/lib/i18n/dictionary";

export function useTranslate() {
  const { language } = useLanguage();

  return (key: DictionaryKey) => translate(key, language);
}

export function useTranslateTag() {
  const { language } = useLanguage();

  return (rawValue: string) => translateTagLabel(rawValue, language);
}
