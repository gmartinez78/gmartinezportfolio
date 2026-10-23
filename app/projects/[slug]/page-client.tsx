"use client";

import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, BadgeDollarSign, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, Component, Contact, CreditCard, LayoutTemplate, Menu, Minus, MousePointerClick, PanelTop, Pill, Plus, RotateCcw, Tag, TextCursorInput, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import { Kalam, Newsreader } from "next/font/google";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContentPanel } from "@/components/content-panel";
import { CalendarKeeperPrototypeViews } from "@/components/calendar-keeper-prototype-views";
import { CalendarKeeperServiceBlueprint } from "@/components/calendar-keeper-service-blueprint";
import { DataTablePanel } from "@/components/data-table-panel";
import { KeyValueStackCard } from "@/components/key-value-stack-card";
import { MetricStatCard } from "@/components/metric-stat-card";
import { NarrativePanelCard } from "@/components/narrative-panel-card";
import { ProjectTeaserCard } from "@/components/project-teaser-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  isHiddenCaseStudySlug,
  resolveHomeCardId,
  resolveHomeCardImage,
  resolveProjectHeroImage,
  resolveProjectHref,
  resolveTrustedLogo,
  resolveToolIconOptional,
  usePublicCaseStudies,
  usePublicCaseStudy,
} from "@/lib/cms/public";
import type { CaseStudyContentBlock, CaseStudyRecord, CaseStudyReflection } from "@/lib/cms/types";
import { withBasePath } from "@/lib/site";
import { useTranslate } from "@/lib/i18n/use-translate";
import { useLanguage, type Language } from "@/lib/i18n/language-context";
import { translate } from "@/lib/i18n/dictionary";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
});

type PayloadRow = {
  metric?: string;
  label?: string;
  value?: string;
  context?: string;
};

type ProblemMetric = {
  value: string;
  label: string;
  context?: string;
};

type HighlightMetric = {
  value: string;
  label: string;
  context?: string;
};

type CalendarKeeperUserNeed = {
  id: string;
  title: string;
  needs: string[];
  goal?: string;
  consequence?: string;
  jtbd?: string;
};

type LowFiFlowStep = {
  title?: string;
  caption?: string;
  rows?: string[];
  action?: string;
  decision?: string;
};

function LowFiFlowMap({
  persona,
  description,
  steps,
}: {
  persona: string;
  description: string;
  steps: LowFiFlowStep[];
}) {
  return (
    <div className="mt-8 border-t border-[#d9e5f2] pt-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">Low-fi flow mapping</p>
          <p className="mt-1 font-inter text-[18px] font-semibold text-[#0e2951]">{persona}</p>
        </div>
        <p className="max-w-[520px] text-[13px] leading-[1.55] text-[#5c7792]">{description}</p>
      </div>

      <div className="overflow-x-auto rounded-[18px] border border-[#d9e5f2] bg-[linear-gradient(#edf3f8_1px,transparent_1px),linear-gradient(90deg,#edf3f8_1px,transparent_1px)] bg-[size:20px_20px] p-5">
        <div className="flex min-w-[1080px] items-center gap-3 py-4">
          {steps.map((step, index) => (
            <Fragment key={`${step.title}-${index}`}>
              {step.decision ? (
                <div className="flex w-[104px] shrink-0 flex-col items-center gap-3">
                  <div className="flex h-[74px] w-[74px] rotate-45 items-center justify-center rounded-[12px] border border-[#9ebcd7] bg-white shadow-[0_8px_18px_rgba(14,41,81,0.08)]">
                    <p className="w-[60px] -rotate-45 text-center text-[10px] font-semibold leading-[1.2] text-[#0e2951]">{step.decision}</p>
                  </div>
                  <span className="rounded-full bg-[#fff2a8] px-2 py-1 text-[9px] font-medium text-[#6a5800]">Decision</span>
                </div>
              ) : (
                <article className="w-[164px] shrink-0 overflow-hidden rounded-[10px] border border-[#b8d1e6] bg-white shadow-[0_8px_18px_rgba(14,41,81,0.08)]">
                  <div className="bg-[#1183D0] px-3 py-2 text-[10px] font-semibold text-white">{step.title}</div>
                  <div className="space-y-2 p-3">
                    {step.caption ? <p className="text-[10px] leading-[1.35] text-[#5c7792]">{step.caption}</p> : null}
                    {step.rows?.map((row) => (
                      <div key={row} className="rounded-[4px] border border-[#d9e5f2] bg-[#f8fbff] px-2 py-1.5 text-[9px] text-[#31526e]">{row}</div>
                    ))}
                    {step.action ? <div className="rounded-[4px] bg-[#d31383] px-2 py-1.5 text-center text-[9px] font-semibold text-white">{step.action}</div> : null}
                  </div>
                </article>
              )}
              {index < steps.length - 1 ? <span className="shrink-0 text-[24px] font-light text-[#8ba9c1]" aria-hidden="true">→</span> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

const CONFIDENTIAL_PLACEHOLDER_SLUG = "zapiano-marketing";

const HOME_BANNER_GRADIENT =
  "linear-gradient(90deg, #e6f1fb 0%, #eee7fb 37%, #f9e5ee 68%, #fcf0e2 100%)";
const HOME_BANNER_GRADIENT_OVERLAY =
  "radial-gradient(circle at top,rgba(171,160,246,0.16),transparent 42%),radial-gradient(circle at 72% 26%,rgba(255,174,202,0.18),transparent 32%),radial-gradient(circle at 92% 50%,rgba(255,224,189,0.2),transparent 24%),linear-gradient(180deg,rgba(118,141,177,0.06)_0%,rgba(255,255,255,0)_58%)";
const REVERSETECH_STICKY_HEADER_OFFSET = 88;
const RELATED_PROJECT_BACKGROUNDS: Record<string, string> = {
  reversetech: "linear-gradient(180deg, #eef4fb 0%, #eef4fb 100%)",
};

const NAYYA_HIGHLIGHT_METRICS: Record<Language, HighlightMetric[]> = {
  en: [
    { value: "307%", label: "IRR", context: "Projected ROI,estimated return from increased plan uptake (NPV $11.4M)." },
    { value: "~115,500", label: "Annual Benefits", context: "Enrollments completed 5% above the 100K goal." },
    { value: "67%", label: "Conversion Rate", context: "Users who received Nayya recommendations that fit their needs and enrolled in a plan." },
  ],
  es: [
    { value: "307%", label: "VAN", context: "ROI proyectado, retorno estimado por mayor adopción de planes (VPN $11.4M)." },
    { value: "~115,500", label: "Beneficios anuales", context: "Inscripciones completadas un 5% por encima de la meta de 100K." },
    { value: "67%", label: "Tasa de conversión", context: "Usuarios que recibieron recomendaciones de Nayya ajustadas a sus necesidades y se inscribieron en un plan." },
  ],
  de: [
    { value: "307%", label: "Interner Zinsfuß", context: "Prognostizierter ROI, geschätzter Rückfluss durch höhere Planaufnahme (Barwert 11,4 Mio. $)." },
    { value: "~115,500", label: "Jährliche Leistungen", context: "Abgeschlossene Einschreibungen 5 % über dem Ziel von 100 Tsd." },
    { value: "67%", label: "Konversionsrate", context: "Nutzer, die passende Nayya-Empfehlungen erhielten und sich für einen Plan angemeldet haben." },
  ],
};

const NAYYA_PROBLEM_METRICS: Record<Language, ProblemMetric[]> = {
  en: [
    { value: "32%", label: "of employees dropped off before completing the benefits selection flow" },
    { value: "44%", label: "of employees felt confident they had selected the best plan for their needs" },
    { value: "48%", label: "understood why they needed to continue in a separate experience" },
    { value: "2.9/5", label: "trust score for the transition in testing" },
  ],
  es: [
    { value: "32%", label: "de los empleados abandonó antes de completar el flujo de selección de beneficios" },
    { value: "44%", label: "de los empleados se sintió seguro de haber elegido el mejor plan para sus necesidades" },
    { value: "48%", label: "entendió por qué debía continuar en una experiencia separada" },
    { value: "2.9/5", label: "puntuación de confianza sobre la transición en las pruebas" },
  ],
  de: [
    { value: "32%", label: "der Nutzer brechen vor dem Abschluss des Leistungswahl-Flusses ab" },
    { value: "44%", label: "der Nutzer waren sich sicher, den besten Plan für ihre Bedürfnisse gewählt zu haben" },
    { value: "48%", label: "verstanden, warum sie in einer separaten Erfahrung weitermachen mussten" },
    { value: "2.9/5", label: "Vertrauenswert für den Übergang in den Tests" },
  ],
};

const CONFIDENTIAL_PROBLEM_METRICS: ProblemMetric[] = [
  { value: "6.0%", label: "conversion rate on the original control campaign" },
  { value: "$4.20", label: "cost per purchase before the redesign and experiment" },
  { value: "2,847", label: "purchases generated by the baseline control variant" },
];

type BenchmarkScore = "strong" | "partial" | "missing";

type ConfidentialBenchmarkRow = {
  product: string;
  domain: string;
  group: "Direct competitors" | "Zapiano";
  badge?: "Before" | "After";
  scores: BenchmarkScore[];
  takeaway: string;
};

type ConfidentialAbTestRow = {
  metric: string;
  variantA: string;
  variantB: string;
  takeaway: string;
};

const CONFIDENTIAL_BENCHMARK_HEADERS = [
  "Low-friction entry offer",
  "Beginner vs returner path",
  "Founder credibility upfront",
  "Community proof on page",
  "Pricing clarity",
  "Mobile-first clarity",
  "CTA visibility & clarity",
] as const;

const CONFIDENTIAL_BENCHMARK_ROWS: ConfidentialBenchmarkRow[] = [
  {
    product: "Simply Piano",
    domain: "hellosimply.com",
    group: "Direct competitors",
    scores: ["strong", "strong", "missing", "partial", "strong", "strong", "strong"],
    takeaway: "7-day free trial sets category baseline. Onboarding quiz segments by level.",
  },
  {
    product: "Skoove",
    domain: "skoove.com",
    group: "Direct competitors",
    scores: ["strong", "partial", "missing", "missing", "strong", "strong", "strong"],
    takeaway: "Free tier as entry hook. Skips segmentation, treats all visitors as beginners.",
  },
  {
    product: "Flowkey",
    domain: "flowkey.com",
    group: "Direct competitors",
    scores: ["strong", "strong", "missing", "missing", "strong", "strong", "strong"],
    takeaway: "Strong hero video. Beginner / intermediate / returner paths clearly labeled.",
  },
  {
    product: "Yousician",
    domain: "yousician.com",
    group: "Direct competitors",
    scores: ["strong", "strong", "missing", "partial", "partial", "strong", "strong"],
    takeaway: "10M+ user social proof. Pricing transparency criticized in user reviews.",
  },
  {
    product: "Pianote",
    domain: "pianote.com",
    group: "Direct competitors",
    scores: ["strong", "strong", "strong", "strong", "strong", "strong", "strong"],
    takeaway: "Category gold standard. Real teachers in hero, community is core value prop.",
  },
  {
    product: "Zapiano",
    domain: "zapiano.com (original LP)",
    group: "Zapiano",
    badge: "Before",
    scores: ["missing", "missing", "missing", "partial", "missing", "partial", "missing"],
    takeaway:
      "- High upfront cost\n- Competing membership tiers\n- No audience segmentation before users understood the value",
  },
  {
    product: "Zapiano",
    domain: "zapiano.com (redesign)",
    group: "Zapiano",
    badge: "After",
    scores: ["strong", "strong", "strong", "strong", "strong", "strong", "strong"],
    takeaway: "€9 intro course as paid entry. Beginner / returner path. Sven leads hero. Community block in fold.",
  },
];

const CONFIDENTIAL_FUNNEL_ARCHITECTURE = {
  title: "Funnel architecture | Before vs After",
  subtitle:
    "The strategic reframe: from a 3-tier upfront decision to a stepped, low-friction entry that mirrors daily practice",
  before: {
    badge: "Before",
    title: "Club tier as paid entry",
    subtitle:
      "Cold paid traffic asked to choose a 1-year, 2-year, or 5-year commitment within seconds of landing.",
    stages: [
      {
        label: "Top of funnel",
        name: "Meta Ad",
        detail: "~1.77M reach | 5.84M impressions across the test period",
      },
      {
        label: "Landing page",
        name: "Zapiano Club LP",
        detail: "All 3 tiers presented side-by-side. Dense feature blocks. Three competing CTAs.",
        tone: "problem" as const,
        tags: ["EUR365 / EUR1044 / EUR5220 above the fold", "No segmentation", "No clear next step"],
      },
      {
        label: "Purchase decision",
        name: "3-tier choice",
        detail: "Bronze (EUR365) | Silver (multi-year savings) | Gold (5-year commitment)",
        tags: ["High cognitive load", "High stakes"],
      },
      {
        label: "Outcome",
        name: "Subscription (or bounce)",
        detail: "Most cold visitors bounced before this point.",
      },
    ],
    conversion: "6.00% conversion to purchase",
    takeawayTitle: "Core problem",
    takeaway:
      'Users could not process the tier comparison on cold traffic. The page asked "how much will this cost over years?" instead of "is this for me, and how do I start?"',
  },
  after: {
    badge: "After",
    title: "Stepped entry, then upsell",
    subtitle:
      "A EUR9 first action lowers the cost of saying yes. The big decision moves to a warmer point in the funnel.",
    stages: [
      {
        label: "Top of funnel",
        name: "Meta Ad",
        detail: "Same campaigns, same spend, same audiences",
      },
      {
        label: "Landing page",
        name: "EUR9 Intro Course LP",
        detail: "Sven leads hero. Beginner / returner segmentation. Single CTA. Community proof in fold.",
        tone: "win" as const,
        tags: ["Founder credibility", "Segmented copy", "Sticky CTA"],
      },
      {
        label: "First purchase",
        name: "EUR9 Intro Course",
        detail: "One-time, transactional, low-friction. A clear first step that maps to daily practice.",
        tags: ["Low cognitive load", "Habit-forming"],
      },
      {
        label: "Warm upsell",
        name: "PianoStarter EUR29/month",
        detail: "Recurring subscription offered after the user has experienced the product. Decision happens warm, not cold.",
      },
    ],
    conversion: "25.00% conversion to purchase",
    takeawayTitle: "Core unlock",
    takeaway:
      "The biggest conversion lift came from changing what we asked visitors to decide, not from changing how we styled the buttons. The problem looked like UI. It was actually an offer problem.",
  },
  footer:
    "Impact: 1.04M reach | 2.85M impressions | 14,885 purchases | $26,568.50 total spend | $1.79 blended cost per result",
};

const CONFIDENTIAL_AB_TEST_ROWS: ConfidentialAbTestRow[] = [
  {
    metric: "Social proof treatment",
    variantA: "Physical community proof",
    variantB: "Digital community proof",
    takeaway: "The test isolated proof format, not the offer.",
  },
  {
    metric: "Creative used",
    variantA: "Annual Zapiano member meetup photos in Switzerland and Germany",
    variantB: "Mobile app screenshots, member feed views, and in-product social proof",
    takeaway: "Variant B made the product itself visible much earlier.",
  },
  {
    metric: "Audience signal",
    variantA: "Warm, authentic, but implied in-person participation",
    variantB: "Immediate, tangible preview for cold, mobile-first visitors",
    takeaway: "Cold paid traffic responded better to product tangibility than community warmth.",
  },
  {
    metric: "Conversion outcome",
    variantA: "Lower-performing variant",
    variantB: "Winning variant",
    takeaway: "Variant B won decisively and became the rollout direction.",
  },
];

const CONFIDENTIAL_CONSERVATIVE_SCENARIO_ROWS = [
  {
    budget: "$5,500",
    reach: "~216K",
    purchases: "~3,073",
    revenue: "~€27.7K",
  },
  {
    budget: "$6,000",
    reach: "~236K",
    purchases: "~3,352",
    revenue: "~€30.2K",
  },
] as const;

const REVERSE_TECH_COMPETITOR_DIMENSIONS_EN = [
  {
    dimension: "Funnel model",
    reverseHealth: "Age first, 1 min quiz to personalized plan",
    muscleBooster: "Quiz to personalized plan based on your age",
    floHealth: "Quiz onboarding to freemium app",
    betterMe: "Age first, 1 min quiz to personalized plan",
  },
  {
    dimension: "Monetization",
    reverseHealth: "Hard paywall + scarcity timers, subscription",
    muscleBooster: "Hard paywall + scarcity timers, 7-day trial then subscription, auto-renewal",
    floHealth: "Freemium (free core, Premium upsell)",
    betterMe: "7-day trial then subscription, auto-renewal + scarcity timers",
  },
  {
    dimension: "Free option",
    reverseHealth: "No",
    muscleBooster: "No",
    floHealth: "Yes",
    betterMe: "No",
  },
  {
    dimension: "Target audience",
    reverseHealth: "Women, 40 to 60+, midlife",
    muscleBooster: "Broad, male-skewing",
    floHealth: "Women, broad age, cycle and life-stage",
    betterMe: "Women-skewing, broad age incl. midlife",
  },
  {
    dimension: "Positioning",
    reverseHealth: "Fitness for women's unique needs, calisthenics",
    muscleBooster: "Muscle building, aesthetics",
    floHealth: "Women's health, privacy-forward, life-stage personalization",
    betterMe: "Inclusive wellness, women-focused",
  },
  {
    dimension: "Key funnel mechanic",
    reverseHealth: "Age gate + women-specific framing + personalized plan preview",
    muscleBooster: "Age- and goal-based personalization into a personalized workout plan",
    floHealth: "Age-group onboarding + privacy-first reassurance + personalized plan CTA",
    betterMe: "Age gate + wellness profile + expected-result graph + social-proof loader",
  },
] as const;

const REVERSE_TECH_COMPETITOR_DIMENSIONS_ES = [
  {
    dimension: "Modelo de embudo",
    reverseHealth: "Edad primero, quiz de 1 min a plan personalizado",
    muscleBooster: "Quiz a plan personalizado según tu edad",
    floHealth: "Onboarding con quiz a app freemium",
    betterMe: "Edad primero, quiz de 1 min a plan personalizado",
  },
  {
    dimension: "Monetización",
    reverseHealth: "Paywall estricto + temporizadores de escasez, suscripción",
    muscleBooster: "Paywall estricto + temporizadores de escasez, prueba de 7 días y luego suscripción, renovación automática",
    floHealth: "Freemium (núcleo gratis, upsell a Premium)",
    betterMe: "Prueba de 7 días y luego suscripción, renovación automática + temporizadores de escasez",
  },
  {
    dimension: "Opción gratuita",
    reverseHealth: "No",
    muscleBooster: "No",
    floHealth: "Sí",
    betterMe: "No",
  },
  {
    dimension: "Público objetivo",
    reverseHealth: "Mujeres, 40 a 60+, edad madura",
    muscleBooster: "Amplio, con sesgo masculino",
    floHealth: "Mujeres, edad amplia, ciclo y etapa de vida",
    betterMe: "Con sesgo femenino, edad amplia incl. edad madura",
  },
  {
    dimension: "Posicionamiento",
    reverseHealth: "Fitness para las necesidades particulares de la mujer, calistenia",
    muscleBooster: "Desarrollo muscular, estética",
    floHealth: "Salud de la mujer, orientado a la privacidad, personalización por etapa de vida",
    betterMe: "Bienestar inclusivo, enfocado en la mujer",
  },
  {
    dimension: "Mecánica clave del embudo",
    reverseHealth: "Filtro de edad + enfoque específico para mujeres + vista previa de plan personalizado",
    muscleBooster: "Personalización por edad y objetivo en un plan de entrenamiento personalizado",
    floHealth: "Onboarding por grupo de edad + refuerzo de privacidad + CTA de plan personalizado",
    betterMe: "Filtro de edad + perfil de bienestar + gráfico de resultado esperado + loader de prueba social",
  },
] as const;

function getReverseTechCompetitorDimensions(language: Language) {
  return language === "es" ? REVERSE_TECH_COMPETITOR_DIMENSIONS_ES : REVERSE_TECH_COMPETITOR_DIMENSIONS_EN;
}

const REVERSE_TECH_MUSCLE_BOOSTER_URL = "https://plan.muscle-booster.io/onboarding";
const REVERSE_TECH_REVERSE_HEALTH_URL = "https://tour.reverse.health/rhwc-calisthenics-2602a";
const REVERSE_TECH_FLO_HEALTH_URL = "https://quiz.flo.health/es-ES";
const REVERSE_TECH_BETTER_ME_URL = "https://betterme-wallpilates.com/";

const REVERSE_TECH_PATTERN_ROWS_EN = [
  {
    label: "Pattern 1 to test",
    tag: "Worth testing",
    title: "Informational interstitial screen",
    screenshotTitle: "Better Me",
    source: "Muscle Booster (Better Me runs a version of this too)",
    screenshot: "the \"you'll reach your goal by [date]\" projection screen with the progress curve, shown right before the paywall",
    imageSrc: "/images/projects/Reversetech/info-intertitial-screen.png",
    metric: "questionnaire completion rate and email capture rate before the paywall",
    hypothesis:
      "If we add an informational interstitial tied to the user's quiz answers before the paywall, questionnaire completion and email capture should increase. The screen would make the experience feel more personalized, build trust, and show users that their answers are leading to something useful, making them more comfortable sharing their email before reaching the paywall.",
  },
  {
    label: "Pattern 2 to test",
    tag: "Worth testing",
    title: "Low-friction progress stepper",
    screenshotTitle: "Flo Health",
    source: "Flo Health",
    screenshot: "Flo's free personalized insight screen, or its privacy and data-reassurance screen during onboarding",
    imageSrc: "/images/projects/Reversetech/flo-health.png",
    metric: "quiz completion rate and step-through rate",
    hypothesis:
      "If we add a low-friction progress stepper throughout the questionnaire, quiz completion and step-through rate should increase. The pattern makes the flow feel shorter, more manageable, and easier to finish quickly, which reduces perceived effort and helps users stay engaged until they reach the next value moment.",
    note:
      "The goal of this pattern is not to add persuasion directly. It is to reduce friction by making progress visible and by reinforcing that the questionnaire is fast to complete.",
  },
  {
    label: "Pattern to avoid",
    tag: "Avoid",
    title: "Short 7-day trial with scarcity-led conversion pressure",
    screenshotTitle: "Muscle Booster",
    source: "Muscle Booster / Better Me",
    screenshot: "short-trial paywall with urgency and auto-renewal framing",
    imageSrc: "/images/projects/Reversetech/muscle-booster.png",
    metric: "Day 7 retention, renewal rate, and conversion quality",
    hypothesis:
      "A short 7-day trial plus scarcity timers can lift top-line trial starts, but it often lowers conversion quality. It pushes the monetization moment too early, before the user has built enough habit, trust, or commitment to the product. That can hurt retention, weaken renewals, and reduce downstream LTV even if the initial conversion looks stronger.",
    note:
      "Recent subscription-app research suggests the same pattern: shorter trials can speed up decisions, but may increase early churn and weaken retention if users have not experienced enough value yet.",
  },
] as const;

const REVERSE_TECH_PATTERN_ROWS_ES = [
  {
    label: "Patrón 1 a testear",
    tag: "Vale la pena testear",
    title: "Pantalla intersticial informativa",
    screenshotTitle: "Better Me",
    source: "Muscle Booster (Better Me también tiene una versión de esto)",
    screenshot: "la pantalla de proyección \"alcanzarás tu objetivo el [fecha]\" con la curva de progreso, mostrada justo antes del paywall",
    imageSrc: "/images/projects/Reversetech/info-intertitial-screen.png",
    metric: "tasa de finalización del cuestionario y tasa de captura de email antes del paywall",
    hypothesis:
      "Si añadimos un intersticial informativo vinculado a las respuestas del quiz del usuario antes del paywall, la finalización del cuestionario y la captura de email deberían aumentar. La pantalla haría que la experiencia se sintiera más personalizada, generaría confianza, y mostraría a los usuarios que sus respuestas están llevando a algo útil, haciéndolos sentir más cómodos compartiendo su email antes de llegar al paywall.",
  },
  {
    label: "Patrón 2 a testear",
    tag: "Vale la pena testear",
    title: "Indicador de progreso de baja fricción",
    screenshotTitle: "Flo Health",
    source: "Flo Health",
    screenshot: "la pantalla gratuita de insight personalizado de Flo, o su pantalla de privacidad y reafirmación de datos durante el onboarding",
    imageSrc: "/images/projects/Reversetech/flo-health.png",
    metric: "tasa de finalización del quiz y tasa de avance por pasos",
    hypothesis:
      "Si añadimos un indicador de progreso de baja fricción a lo largo del cuestionario, la finalización del quiz y la tasa de avance por pasos deberían aumentar. El patrón hace que el flujo se sienta más corto, más manejable y más fácil de terminar rápido, lo que reduce el esfuerzo percibido y ayuda a los usuarios a mantenerse comprometidos hasta llegar al siguiente momento de valor.",
    note:
      "El objetivo de este patrón no es añadir persuasión directamente. Es reducir la fricción haciendo visible el progreso y reforzando que el cuestionario es rápido de completar.",
  },
  {
    label: "Patrón a evitar",
    tag: "Evitar",
    title: "Prueba corta de 7 días con presión de conversión por escasez",
    screenshotTitle: "Muscle Booster",
    source: "Muscle Booster / Better Me",
    screenshot: "paywall de prueba corta con urgencia y enfoque de renovación automática",
    imageSrc: "/images/projects/Reversetech/muscle-booster.png",
    metric: "retención en el día 7, tasa de renovación y calidad de conversión",
    hypothesis:
      "Una prueba corta de 7 días junto con temporizadores de escasez puede aumentar el número total de pruebas iniciadas, pero a menudo reduce la calidad de la conversión. Adelanta el momento de monetización demasiado pronto, antes de que el usuario haya generado suficiente hábito, confianza o compromiso con el producto. Eso puede perjudicar la retención, debilitar las renovaciones y reducir el LTV posterior, incluso si la conversión inicial parece más fuerte.",
    note:
      "Investigación reciente sobre apps de suscripción sugiere el mismo patrón: las pruebas más cortas pueden acelerar las decisiones, pero pueden aumentar el abandono temprano y debilitar la retención si los usuarios aún no han experimentado suficiente valor.",
  },
] as const;

function getReverseTechPatternRows(language: Language) {
  return language === "es" ? REVERSE_TECH_PATTERN_ROWS_ES : REVERSE_TECH_PATTERN_ROWS_EN;
}

const REVERSE_TECH_EXTRA_SOURCES_EN = [
  {
    title: "Reverse Health Calisthenics Funnel",
    url: REVERSE_TECH_REVERSE_HEALTH_URL,
    description: "Live Reverse Health calisthenics onboarding funnel used as the baseline reference for Task 3.",
  },
  {
    title: "Muscle Booster Onboarding",
    url: REVERSE_TECH_MUSCLE_BOOSTER_URL,
    description: "Live Muscle Booster onboarding flow referenced for the interstitial-screen pattern and quiz-to-plan structure.",
  },
  {
    title: "Flo Health Quiz",
    url: REVERSE_TECH_FLO_HEALTH_URL,
    description: "Live Flo onboarding experience referenced for privacy reassurance and value-first signals before monetization.",
  },
  {
    title: "Better Me Wall Pilates",
    url: REVERSE_TECH_BETTER_ME_URL,
    description: "Live Better Me wall pilates funnel referenced for the age gate, wellness-profile steps, and onboarding comparison.",
  },
  {
    title: "The role of privacy assurance mechanisms in building trust",
    url: "https://researchdiscovery.drexel.edu/esploro/outputs/journalArticle/The-role-of-privacy-assurance-mechanisms/991014877963104721",
    description: "Research cited to support the idea that privacy and assurance cues can increase trust and willingness to disclose personal information online.",
  },
  {
    title: "Consumer Willingness to Share Personal Digital Information for Health-Related Uses",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8787615/",
    description: "Health-data sharing study referenced to support the role of trust and context in willingness to share personal information.",
  },
  {
    title: "What Information Do Shoppers Share? The Effect of Personnel-, Retailer-, and Country-Trust on Willingness to Share Information",
    url: "https://www.sciencedirect.com/science/article/pii/S0022435920300440",
    description: "Trust-and-disclosure research referenced to support why reassurance can affect users' readiness to share information in a funnel.",
  },
] as const;

const REVERSE_TECH_EXTRA_SOURCES_ES = [
  {
    title: "Reverse Health Calisthenics Funnel",
    url: REVERSE_TECH_REVERSE_HEALTH_URL,
    description: "Embudo de onboarding en vivo de calistenia de Reverse Health, usado como referencia base para la Tarea 3.",
  },
  {
    title: "Muscle Booster Onboarding",
    url: REVERSE_TECH_MUSCLE_BOOSTER_URL,
    description: "Flujo de onboarding en vivo de Muscle Booster, referenciado para el patrón de pantalla intersticial y la estructura quiz-a-plan.",
  },
  {
    title: "Flo Health Quiz",
    url: REVERSE_TECH_FLO_HEALTH_URL,
    description: "Experiencia de onboarding en vivo de Flo, referenciada para la reafirmación de privacidad y señales de valor previas a la monetización.",
  },
  {
    title: "Better Me Wall Pilates",
    url: REVERSE_TECH_BETTER_ME_URL,
    description: "Embudo en vivo de wall pilates de Better Me, referenciado para el filtro de edad, los pasos de perfil de bienestar y la comparación de onboarding.",
  },
  {
    title: "The role of privacy assurance mechanisms in building trust",
    url: "https://researchdiscovery.drexel.edu/esploro/outputs/journalArticle/The-role-of-privacy-assurance-mechanisms/991014877963104721",
    description: "Investigación citada para respaldar la idea de que las señales de privacidad y garantía pueden aumentar la confianza y la disposición a compartir información personal online.",
  },
  {
    title: "Consumer Willingness to Share Personal Digital Information for Health-Related Uses",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8787615/",
    description: "Estudio sobre compartir datos de salud, referenciado para respaldar el papel de la confianza y el contexto en la disposición a compartir información personal.",
  },
  {
    title: "What Information Do Shoppers Share? The Effect of Personnel-, Retailer-, and Country-Trust on Willingness to Share Information",
    url: "https://www.sciencedirect.com/science/article/pii/S0022435920300440",
    description: "Investigación sobre confianza y divulgación, referenciada para respaldar por qué la reafirmación puede afectar la disposición de los usuarios a compartir información en un embudo.",
  },
] as const;

function getReverseTechExtraSources(language: Language) {
  return language === "es" ? REVERSE_TECH_EXTRA_SOURCES_ES : REVERSE_TECH_EXTRA_SOURCES_EN;
}

type NayyaProcessAlternative = {
  title: string;
  selected: boolean;
  body: string;
  imageSrc: string;
};

const NAYYA_PROCESS_ALTERNATIVES: Record<Language, NayyaProcessAlternative[]> = {
  en: [
    {
      title: "Embedded *Nayya* section",
      selected: false,
      body:
        "Add the Nayya form as its own step inside the enrollment process, keeping the assistance directly in the core flow.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-embedded-section.jpg",
    },
    {
      title: "Benefit-list *entry* point",
      selected: false,
      body:
        "Place a button in the benefits list so users could choose to use Nayya while reviewing available coverage options.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-benefit-list-entry.jpg",
    },
    {
      title: "Guided *decision* modal",
      selected: true,
      body:
        "Show a modal after users entered their family information, when guidance felt timely connected to choosing better benefits.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-guided-decision-modal.jpg",
    },
  ],
  es: [
    {
      title: "Sección *Nayya* integrada",
      selected: false,
      body:
        "Añadir el formulario de Nayya como un paso propio dentro del proceso de inscripción, manteniendo la asistencia directamente en el flujo principal.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-embedded-section.jpg",
    },
    {
      title: "Punto de *entrada* en la lista de beneficios",
      selected: false,
      body:
        "Colocar un botón en la lista de beneficios para que los usuarios pudieran elegir usar Nayya mientras revisaban las opciones de cobertura disponibles.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-benefit-list-entry.jpg",
    },
    {
      title: "Modal de *decisión* guiada",
      selected: true,
      body:
        "Mostrar un modal después de que los usuarios ingresaran la información de su familia, cuando la guía llegaba en el momento oportuno de elegir mejores beneficios.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-guided-decision-modal.jpg",
    },
  ],
  de: [
    {
      title: "Eingebettete *Nayya*-Sektion",
      selected: false,
      body:
        "Das Nayya-Formular als eigenen Schritt in den Einschreibeprozess einbauen, damit die Hilfe direkt im Hauptfluss bleibt.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-embedded-section.jpg",
    },
    {
      title: "*Einstiegspunkt* in der Leistungsliste",
      selected: false,
      body:
        "Einen Button in die Leistungsliste einfügen, damit Nutzer Nayya nutzen können, während sie die verfügbaren Leistungen prüfen.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-benefit-list-entry.jpg",
    },
    {
      title: "Modal für *geführte Entscheidungen*",
      selected: true,
      body:
        "Ein Modal anzeigen, nachdem Nutzer ihre Familien daten eingegeben haben, wenn die Unterstützung genau dann greift, wenn es um die bessere Leistungswahl geht.",
      imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-guided-decision-modal.jpg",
    },
  ],
};

type NayyaProcessTradeoff = {
  strength: string;
  tradeoff: string;
};

const NAYYA_PROCESS_TRADEOFFS: Record<Language, NayyaProcessTradeoff[]> = {
  en: [
    {
      strength: "Most seamless and visible inside enrollment.",
      tradeoff: "Required too much product and engineering work for the project scope.",
    },
    {
      strength: "Lower implementation effort and easy to place in the existing UI.",
      tradeoff: "Relied on users noticing and seeking help, which was not their primary goal in that moment.",
    },
    {
      strength: "Introduced help at a high-intent moment after family details were entered.",
      tradeoff: "Less deeply integrated than a full embedded section, but clearer and more feasible.",
    },
  ],
  es: [
    {
      strength: "La más fluida y visible dentro de la inscripción.",
      tradeoff: "Requería demasiado trabajo de producto e ingeniería para el alcance del proyecto.",
    },
    {
      strength: "Menor esfuerzo de implementación y fácil de ubicar en la interfaz existente.",
      tradeoff: "Dependía de que los usuarios notaran y buscaran ayuda, que no era su objetivo principal en ese momento.",
    },
    {
      strength: "Ofrecía ayuda en un momento de alta intención después de ingresar los datos familiares.",
      tradeoff: "Menos integrada que una sección completa, pero más clara y factible.",
    },
  ],
  de: [
    {
      strength: "Am nahtlossten und sichtbarsten innerhalb der Einschreibung.",
      tradeoff: "Erforderte zu viel Produkt- und Engineering-Arbeit im Rahmen des Projekts.",
    },
    {
      strength: "Geringerer Implementierungsaufwand und leicht in der bestehenden UI platzierbar.",
      tradeoff: "Setzte voraus, dass Nutzer Hilfe suchen und bemerken, was in diesem Moment nicht ihr Hauptziel war.",
    },
    {
      strength: "Hilfe genau dann, wenn hohe Kaufabsicht nach der Eingabe der Familien daten besteht.",
      tradeoff: "Weniger tief integriert als ein vollständig eingebetteter Abschnitt, dafür klarer und umsetzbarer.",
    },
  ],
};

const NAYYA_DESIGN_STRATEGY: Record<Language, string[]> = {
  en: [
    "I started by reviewing the available data, gathering the right inputs, and aligning with the team on constraints and goals before moving into design.",
    "From there, I explored several integration approaches and evaluated each one based on timing in the user journey, technical feasibility, and how clearly it communicated the value of the experience.",
    "Once a direction was selected, I designed the handoff to feel intentional and trustworthy, using clear messaging and visual cues to help users understand the transition and stay confident as they chose their benefits.",
  ],
  es: [
    "Comenzué revisando los datos disponibles, reuniendo los insumos adecuados y alineándome con el equipo sobre restricciones y objetivos antes de pasar al diseño.",
    "A partir de ahí, exploré varios enfoques de integración y evalué cada uno según su momento en el recorrido del usuario, la viabilidad técnica y qué tan clara comunicaba el valor de la experiencia.",
    "Una vez seleccionada una dirección, diseñé la transición para que se sintiera intencional y confiable, usando mensajes claros y señales visuales que ayudaran a los usuarios a entender el cambio y mantener la confianza al elegir sus beneficios.",
  ],
  de: [
    "Ich habe mit der Auswertung der verfügbaren Daten begonnen, die richtigen Inputs gesammelt und mich mit dem Team über Einschränkungen und Ziele abgestimmt, bevor ich mit dem Design begann.",
    "Anschließend habe ich mehrere Integrationsansätze erkundet und jeden nach seinem Timing im Nutzerpfad, der technischen Machbarkeit und der Klarheit des Werts der Erfahrung bewertet.",
    "Nach der Richtungswahl habe ich den Übergang bewusst und vertrauenswürdig gestaltet, mit klaren Botschaften und visuellen Signalen, die Nutzer beim Verständnis des Wechsels unterstützen und sicher bei der Leistungswahl halten.",
  ],
};

type NayyaTestingResult = {
  metric: string;
  label: string;
  finding: string;
  insight: string;
};

const NAYYA_TESTING_RESULTS: Record<Language, NayyaTestingResult[]> = {
  en: [
    {
      metric: "7",
      label: "Participants",
      finding: "Moderated usability testing on the integrated prototype",
      insight: "Representative sample for qualitative insight, with patterns that were consistent across participants",
    },
    {
      metric: "4/5",
      label: "Satisfaction score",
      finding: "Users rated their overall experience completing the flow",
      insight: "High comfort level with the process, and users felt supported through the benefit selection steps",
    },
    {
      metric: "100%",
      label: "Task completion",
      finding: "All participants successfully completed the end-to-end flow",
      insight: "Core interaction design supported task completion without critical failure points",
    },
    {
      metric: "High",
      label: "Data trust",
      finding: "Users felt comfortable sharing personal information within the Nayya form",
      insight: "Trust signals and context-setting reduced anxiety around data sharing",
    },
    {
      metric: "Low",
      label: "Form fatigue",
      finding: "Users perceived the form as shorter than expected",
      insight: "Perceived effort was lower than anticipated, reducing drop-off risk at form entry",
    },
    {
      metric: "Critical",
      label: "Transition clarity",
      finding: "Users did not know Nayya was part of the Flex process and were confused returning to their original point",
      insight: "The platform handoff lacked sufficient context, and users lost their place after completing Nayya",
    },
    {
      metric: "Modal",
      label: "Dismissal rate",
      finding: "Some users closed the modal automatically without reading it",
      insight: "Reflexive dismiss behavior suggests the modal pattern may need reconsideration or a stronger hook",
    },
    {
      metric: "Low",
      label: "Question relevance",
      finding: "A few users questioned why certain personal questions were being asked",
      insight: "Missing context around question purpose means users need clearer rationale to stay engaged",
    },
  ],
  es: [
    {
      metric: "7",
      label: "Participantes",
      finding: "Prueba de usabilidad moderada en el prototipo integrado",
      insight: "Muestra representativa para hallazgos cualitativos, con patrones consistentes entre participantes",
    },
    {
      metric: "4/5",
      label: "Satisfacción",
      finding: "Los usuarios valoraron su experiencia general al completar el flujo",
      insight: "Alto nivel de comodidad con el proceso; se sintieron acompañados durante los pasos de selección de beneficios",
    },
    {
      metric: "100%",
      label: "Finalización de tarea",
      finding: "Todos los participantes completaron con éxito el flujo de principio a fin",
      insight: "El diseño de interacción central permitió completar la tarea sin puntos de fallo críticos",
    },
    {
      metric: "Alto",
      label: "Confianza en los datos",
      finding: "Los usuarios se sintieron cómodos compartiendo información personal dentro del formulario de Nayya",
      insight: "Las señales de confianza y el contexto redujeron la ansiedad al compartir datos",
    },
    {
      metric: "Bajo",
      label: "Fatiga del formulario",
      finding: "Los usuarios percibieron el formulario como más corto de lo esperado",
      insight: "El esfuerzo percibido fue menor de lo anticipado, reduciendo el riesgo de abandono al inicio del formulario",
    },
    {
      metric: "Crítico",
      label: "Claridad de la transición",
      finding: "Los usuarios no sabían que Nayya formaba parte del proceso de Flex y se confundieron al volver a su punto original",
      insight: "La transición entre plataformas carecía de contexto suficiente y los usuarios perdieron su lugar tras completar Nayya",
    },
    {
      metric: "Modal",
      label: "Tasa de cierre",
      finding: "Algunos usuarios cerraron el modal automáticamente sin leerlo",
      insight: "El cierre reflejo sugiere que el patrón de modal podría necesitar reconsideración o un gancho más fuerte",
    },
    {
      metric: "Bajo",
      label: "Relevancia de las preguntas",
      finding: "Algunos usuarios cuestionaron por qué se les pedían ciertas preguntas personales",
      insight: "Falta contexto sobre el propósito de las preguntas; los usuarios necesitan una razón más clara para mantenerse involucrados",
    },
  ],
  de: [
    {
      metric: "7",
      label: "Teilnehmer",
      finding: "Moderierte Usability-Tests am integrierten Prototyp",
      insight: "Repräsentatives Sample für qualitative Erkenntnisse mit Mustern, die über alle Teilnehmer konsistent waren",
    },
    {
      metric: "4/5",
      label: "Zufriedenheitswert",
      finding: "Nutzer bewerteten ihre Gesamterfahrung beim Abschluss des Flusses",
      insight: "Hohe Zufriedenheit mit dem Ablauf; Nutzer fühlten sich bei den Leistungswahl-Schritten unterstützt",
    },
    {
      metric: "100%",
      label: "Aufgabenerfüllung",
      finding: "Alle Teilnehmer haben den Fluss von Anfang bis Ende erfolgreich abgeschlossen",
      insight: "Das zentrale Interaktionsdesign ermöglichte die Aufgabenerfüllung ohne kritische Fehlerpunkte",
    },
    {
      metric: "Hoch",
      label: "Vertrauen in Daten",
      finding: "Nutzer fühlten sich beim Teilen persönlicher Informationen im Nayya-Formular wohl",
      insight: "Vertrauenssignale und Kontext setzten die Angst vor dem Datenteilen herunter",
    },
    {
      metric: "Niedrig",
      label: "Formularmüdigkeit",
      finding: "Nutzer empfanden das Formular als kürzer als erwartet",
      insight: "Der wahrgenommene Aufwand war geringer als erwartet und senkte das Abbruchrisiko beim Formularstart",
    },
    {
      metric: "Kritisch",
      label: "Klarheit des Übergangs",
      finding: "Nutzer wussten nicht, dass Nayya Teil des Flex-Prozesses war und waren verwirrt, als sie an ihren Ausgangspunkt zurückkehrten",
      insight: "Der Plattform-Übergang lieferte zu wenig Kontext; Nutzer verloren nach Nayya ihren Platz",
    },
    {
      metric: "Modal",
      label: "Schließrate",
      finding: "Einige Nutzer schlossen das Modal automatisch, ohne es zu lesen",
      insight: "Reflexartiges Schließen deutet darauf hin, dass das Modal-Muster überdacht werden sollte oder ein stärkerer Anreiz nötig ist",
    },
    {
      metric: "Niedrig",
      label: "Relevanz der Fragen",
      finding: "Einige Nutzer hinterfragten, warum bestimmte persönliche Fragen gestellt werden",
      insight: "Fehlender Kontext zum Zweck der Fragen bedeutet, dass Nutzer eine klarere Begründung brauchen, um engagiert zu bleiben",
    },
  ],
};

const I9_TESTING_RESULTS = [
  {
    metric: "High",
    label: "Drop-off rate",
    finding: "Hotjar analysis of existing onboarding flow recordings revealed users dropped off due to heavy content and unclear guidance.",
    insight: "Friction was happening before the handoff even occurred, pointing to structural issues in the existing flow.",
  },
  {
    metric: "26",
    label: "Testing rounds",
    finding: "Maze and moderated usability testing validated task ownership, redirect clarity, and status visibility.",
    insight: "The biggest clarity gap was at the HIREtech handoff, users hesitated without stronger ownership cues and redirect context.",
  },
  {
    metric: "2,548",
    label: "positive survey responses post release",
    finding: "A post-release survey validated the integrated direction was working.",
    insight: "Surfaced specific areas needing refinement after launch.",
  },
  {
    metric: "7/7",
    label: "Settings navigation",
    finding: "Pushed back on product's decision to place I-9 settings in the hiring dashboard, ran a usability test where 7 out of 7 users navigated to Settings naturally.",
    insight: "Used that data to realign the team and correct the navigation placement.",
  },
];

const NAYYA_REFLECTIONS: Record<Language, CaseStudyReflection[]> = {
  en: [
    {
      title: "Designing under constraints.",
      body: "Designing under technical constraints does not mean compromising the experience. It means finding the most effective path within the boundaries you are given.",
    },
    {
      title: "Test early, fix early.",
      body: "User testing, even at a small scale, surfaces the decisions that matter most before they become expensive to fix.",
    },
    {
      title: "Trust is a design problem.",
      body: "When users cross platform boundaries, clarity and context are what keep them moving forward.",
    },
    {
      title: "Constraints force focus.",
      body: "The inability to embed Nayya natively pushed the team to invest in transition design, an area that is often overlooked when seamless integration feels like the obvious solution.",
    },
  ],
  es: [
    {
      title: "Diseñar con restricciones.",
      body: "Diseñar bajo restricciones técnicas no significa comprometer la experiencia. Significa encontrar el camino más efectivo dentro de los límites que te dan.",
    },
    {
      title: "Prueba pronto, corrige pronto.",
      body: "La prueba con usuarios, incluso a pequeña escala, saca a la luz las decisiones más importantes antes de que sean caras de corregir.",
    },
    {
      title: "La confianza es un problema de diseño.",
      body: "Cuando los usuarios cruzan límites entre plataformas, la claridad y el contexto son lo que les permite seguir adelante.",
    },
    {
      title: "Las restricciones obligan a enfocarse.",
      body: "La imposibilidad de incrustar Nayya de forma nativa llevó al equipo a invertir en diseño de transición, un área que suele pasarse por alto cuando la integración perfecta parece la solución obvia.",
    },
  ],
  de: [
    {
      title: "Gestalten unter Einschränkungen.",
      body: "Unter technischen Einschränkungen zu gestalten heißt nicht, die Erfahrung zu opfern. Es heißt, den effektivsten Weg innerhalb der gegebenen Grenzen zu finden.",
    },
    {
      title: "Früh testen, früh verbessern.",
      body: "Nutzertests, auch im kleinen Maßstab, zeigen die wichtigsten Entscheidungen, bevor sie teuer werden.",
    },
    {
      title: "Vertrauen ist ein Designproblem.",
      body: "Wenn Nutzer Plattformgrenzen überschreiten, sorgen Klarheit und Kontext dafür, dass sie weitermachen.",
    },
    {
      title: "Einschränkungen erzwingen Fokus.",
      body: "Die Unmöglichkeit, Nayya nativ einzubetten, brachte das Team dazu, in Übergangsdesign zu investieren – ein Bereich, der oft übersehen wird, wenn nahtlose Integration wie die offensichtliche Lösung wirkt.",
    },
  ],
};

const NAYYA_PHONE_IMAGE = "/images/projects/nayya-ai-benefits/banners/nayya-design-process.png";
const NAYYA_IMPACT_FIGMA_EMBED =
  "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FYK1xcLLDokH5gNYAeDmNiP%2FNayya%3Fnode-id%3D20753-8774%26m%3Ddev%26t%3DOkK79FuO2xBLEwc6-1";
const REVERSE_TECH_FLOW_EMBED =
  "https://embed.figma.com/design/82wWga1ObOtJEZ9LyNaQTo/Reverse-Tech---Flow?node-id=0-1&embed-host=share";
const METHODOLOGY_COLORS = ["#87d4ac", "#f5e692", "#d9b8ff", "#68c7c1", "#d1f090", "#f7b6c8", "#a9c6ff"];

const PROTECTA_WORKFLOW_SUMMARIES: Record<"en" | "es", string[]> = {
  en: [
    "Capture audience needs, objections, and the service model.",
    "Explore tone, hierarchy, and copy, then refine the strongest direction.",
    "Build the Figma component library and carry it into production code.",
    "Document coded states, check accessibility, and prepare launch.",
  ],
  es: [
    "Capturar necesidades, objeciones y el modelo de servicio.",
    "Explorar tono, jerarquía y texto, y refinar la dirección más sólida.",
    "Construir la biblioteca de componentes de Figma y llevarla al código de producción.",
    "Documentar los estados en código, comprobar accesibilidad y preparar el lanzamiento.",
  ],
};

const PROTECTA_WORKFLOW_TOOLS = [
  ["Client call", "Questionnaire", "NotebookLM"],
  ["Claude Design", "Claude"],
  ["Figma AI", "Codex", "Claude Code"],
  ["Storybook", "VoiceOver", "Vercel"],
];

const PROTECTA_BRAND_CONTENT_COPY: Record<"en" | "es", { title: string; titleAccent: string; body: string }> = {
  en: {
    title: "Brand +",
    titleAccent: "Content",
    body: "Connected the visual direction and content system from the start, using Claude Design and Claude to explore tone, hierarchy, and copy. I refined the strongest direction into a premium, advisor-led brand system, then wrote and adapted the messaging so the English and Spanish experiences each felt native rather than translated.",
  },
  es: {
    title: "Marca +",
    titleAccent: "Contenido",
    body: "Conecté la dirección visual y el sistema de contenido desde el inicio, usando Claude Design y Claude para explorar tono, jerarquía y texto. Refiné la dirección más sólida hasta convertirla en un sistema de marca premium y centrado en la asesoría, y luego escribí y adapté los mensajes para que las experiencias en inglés y español se sintieran nativas y no traducidas.",
  },
};

const PROTECTA_WEBSITE_OUTCOME: Record<Language, string> = {
  en: "The initial bilingual website went live in five days, giving Protecta a consistent brand, clear service information, and a direct path to its advisors. Reusable components and English–Spanish content structure supported the pages released afterward.",
  es: "La primera versión del sitio web bilingüe se publicó en cinco días y dio a Protecta una marca coherente, información clara sobre sus servicios y una vía directa de contacto con sus asesores. Los componentes reutilizables y la estructura de contenido en inglés y español facilitaron las páginas publicadas después.",
  de: "Die erste Version der zweisprachigen Website ging innerhalb von fünf Tagen live und gab Protecta eine konsistente Marke, klare Informationen zum Angebot und einen direkten Kontaktweg zu den Beratern. Wiederverwendbare Komponenten und die englisch-spanische Inhaltsstruktur unterstützten die später veröffentlichten Seiten.",
};

const PROTECTA_WHATSAPP_RATIONALE: Record<Language, string> = {
  en: "WhatsApp was the primary contact option because clients already used it and advisors managed conversations there. A contact form remained available as an alternative.",
  es: "WhatsApp fue la vía principal de contacto porque los clientes ya lo usaban y los asesores gestionaban allí sus conversaciones. El formulario de contacto siguió disponible como alternativa.",
  de: "WhatsApp war der wichtigste Kontaktweg, weil Kunden den Dienst bereits nutzten und die Berater ihre Gespräche dort führten. Ein Kontaktformular blieb als Alternative verfügbar.",
};

const PROTECTA_RECORDED_RESULTS: Record<Language, { metrics: Array<{ value: string; label: string; rate?: string }>; note: string }> = {
  en: {
    metrics: [
      { value: "1,000", label: "Website visits" },
      { value: "120", label: "WhatsApp inquiries", rate: "12% same-period contact ratio" },
      { value: "40", label: "Qualified leads", rate: "33% of inquiries" },
      { value: "10", label: "Consultations booked", rate: "25% of qualified leads" },
      { value: "3", label: "New customers", rate: "30% of consultations · 2.5% of inquiries" },
    ],
    note: "Recorded in the same 28-day period. The 12% contact ratio and downstream percentages are calculations from the reported counts, not website-attributed conversion rates.",
  },
  es: {
    metrics: [
      { value: "1.000", label: "Visitas al sitio web" },
      { value: "120", label: "Consultas por WhatsApp", rate: "12 % de contacto en el mismo periodo" },
      { value: "40", label: "Leads cualificados", rate: "33 % de las consultas" },
      { value: "10", label: "Consultas agendadas", rate: "25 % de los leads cualificados" },
      { value: "3", label: "Nuevos clientes", rate: "30 % de las consultas agendadas · 2,5 % de las consultas" },
    ],
    note: "Datos del mismo periodo de 28 días. El 12 % de contacto y los porcentajes posteriores son cálculos a partir de los resultados registrados; no son tasas de conversión atribuibles al sitio web.",
  },
  de: {
    metrics: [
      { value: "1.000", label: "Website-Besuche" },
      { value: "120", label: "WhatsApp-Anfragen", rate: "12 % Kontaktquote im selben Zeitraum" },
      { value: "40", label: "Qualifizierte Leads", rate: "33 % der Anfragen" },
      { value: "10", label: "Gebuchte Beratungstermine", rate: "25 % der qualifizierten Leads" },
      { value: "3", label: "Neue Kunden", rate: "30 % der Beratungen · 2,5 % der Anfragen" },
    ],
    note: "Werte aus demselben 28-Tage-Zeitraum. Die 12-%-Kontaktquote und die nachgelagerten Prozentsätze sind Berechnungen aus den erfassten Werten, keine der Website zugeordneten Konversionsraten.",
  },
};

const PROTECTA_VALIDATE_COPY: Record<Language, { eyebrow: string; summary: string; outcomes: Array<{ title: string; body: string }>; next: string }> = {
  en: {
    eyebrow: "28-day post-launch record",
    summary: "The first release created a live, bilingual route from information to advisor contact. In 28 days, the recorded flow moved from 1,000 website visits to 120 WhatsApp inquiries, 40 qualified leads, 10 booked consultations, and 3 new customers.",
    outcomes: [
      { title: "Demand captured", body: "The recorded volume works out to roughly 30 WhatsApp inquiries and 10 qualified leads per week. The contact path turned website attention into a repeatable advisor workload instead of an unstructured inquiry channel." },
      { title: "Sales progression", body: "One in three inquiries became qualified, one in four qualified leads booked, and three of 10 consultations closed. That makes the clearest confirmed outcome three new customers and a 2.5% inquiry-to-customer progression." },
      { title: "Planning scenario", body: "At the same observed pace, the flow would produce about 39 new customers in a 364-day year. This is a linear operating scenario, not a forecast: policy value, retention, acquisition source, and seasonality were not recorded." },
    ],
    next: "Add page, language, and campaign tags to every WhatsApp CTA, then carry the source into the CRM. That will show which content creates qualified demand and allow customer value to be reported without guessing. With only 10 consultations, one additional customer changes the close rate by 10 percentage points, so the next 2–3 reporting cycles should confirm the trend before major investment.",
  },
  es: {
    eyebrow: "Registro de los primeros 28 días",
    summary: "La primera versión creó una vía bilingüe y activa entre la información y el contacto con los asesores. En 28 días, el flujo registrado pasó de 1.000 visitas al sitio a 120 consultas por WhatsApp, 40 leads cualificados, 10 consultas agendadas y 3 nuevos clientes.",
    outcomes: [
      { title: "Demanda capturada", body: "El volumen registrado equivale a unas 30 consultas por WhatsApp y 10 leads cualificados por semana. La vía de contacto transformó la atención al sitio en una carga de trabajo repetible para los asesores, no en un canal de consultas sin estructura." },
      { title: "Progresión comercial", body: "Una de cada tres consultas se cualificó, uno de cada cuatro leads cualificados agendó una cita y tres de 10 consultas cerraron. El resultado confirmado más claro son 3 nuevos clientes y una progresión de 2,5 % desde consulta hasta cliente." },
      { title: "Escenario de planificación", body: "Si se mantuviera el ritmo observado, el flujo produciría aproximadamente 39 nuevos clientes en un año de 364 días. Es un escenario operativo lineal, no una previsión: no se registraron valor de póliza, retención, origen de adquisición ni estacionalidad." },
    ],
    next: "Añadir etiquetas de página, idioma y campaña a cada CTA de WhatsApp y conservar el origen en el CRM. Así será posible saber qué contenido genera demanda cualificada y reportar valor por cliente sin adivinar. Con solo 10 consultas, un cliente adicional cambia la tasa de cierre 10 puntos porcentuales; los próximos 2–3 ciclos deben confirmar la tendencia antes de una inversión importante.",
  },
  de: {
    eyebrow: "Erfassung der ersten 28 Tage",
    summary: "Die erste Version schuf einen zweisprachigen, aktiven Weg von Informationen zum Kontakt mit Beratern. In 28 Tagen führte der erfasste Ablauf von 1.000 Website-Besuchen zu 120 WhatsApp-Anfragen, 40 qualifizierten Leads, 10 gebuchten Beratungen und 3 neuen Kunden.",
    outcomes: [
      { title: "Erfasste Nachfrage", body: "Das erfasste Volumen entspricht etwa 30 WhatsApp-Anfragen und 10 qualifizierten Leads pro Woche. Der Kontaktweg machte Website-Aufmerksamkeit zu einer wiederholbaren Arbeitslast für die Berater." },
      { title: "Vertriebsfortschritt", body: "Jede dritte Anfrage wurde qualifiziert, jeder vierte qualifizierte Lead buchte einen Termin und drei von 10 Beratungen wurden abgeschlossen. Das klarste bestätigte Ergebnis sind drei neue Kunden und eine Entwicklung von 2,5 % von Anfrage zu Kunde." },
      { title: "Planungsszenario", body: "Bei unverändertem Tempo würde der Ablauf in einem Jahr mit 364 Tagen etwa 39 neue Kunden liefern. Das ist ein lineares Betriebsszenario, keine Prognose: Policenwert, Bindung, Akquisitionsquelle und Saisonabhängigkeit wurden nicht erfasst." },
    ],
    next: "Jede WhatsApp-CTA nach Seite, Sprache und Kampagne taggen und die Quelle im CRM weiterführen. So wird sichtbar, welche Inhalte qualifizierte Nachfrage schaffen, und Kundenwert kann ohne Schätzung ausgewertet werden. Bei nur 10 Beratungen verändert ein zusätzlicher Kunde die Abschlussrate um 10 Prozentpunkte; die nächsten 2–3 Zyklen sollten den Trend vor einer größeren Investition bestätigen.",
  },
};

const PROTECTA_DECISION_MODEL: Record<"en" | "es", { title: string; body: string }> = {
  en: {
    title: "Human-led decision model",
    body: "AI expanded the option set; I set the criteria. At every stage, I evaluated outputs against source research, bilingual user needs, brand trust, business goals, feasibility, and accessibility, then selected the direction and made the final call.",
  },
  es: {
    title: "Modelo de decisión guiado por una persona",
    body: "La IA amplió el conjunto de opciones; yo definí los criterios. En cada etapa evalué los resultados frente a la investigación fuente, las necesidades bilingües, la confianza de marca, los objetivos de negocio, la viabilidad y la accesibilidad; después seleccioné la dirección y tomé la decisión final.",
  },
};

const PROTECTA_BRAND_COPY: Record<"en" | "es", { eyebrow: string; title: string; body: string; rationale: string; type: string; palette: string }> = {
  en: {
    eyebrow: "Design Proposal",
    title: "A brand built for *clarity and care*",
    body: "The brand guide translated Protecta's advisor-led promise into a premium, emotionally warm system. Claude Design accelerated visual exploration; research into family trust, bilingual expectations, and the advisor model shaped the final direction, hierarchy, and usability decisions.",
    rationale: "Warm, credible, and human - not generic insurtech.",
    type: "Typography",
    palette: "Color palette",
  },
  es: {
    eyebrow: "Propuesta de diseño",
    title: "Una marca creada para la claridad y el cuidado",
    body: "La guía de marca tradujo la propuesta de asesoría de Protecta en un sistema premium y emocionalmente cálido. Claude Design aceleró la exploración visual; la investigación sobre la confianza de las familias, las expectativas bilingües y el modelo de asesoría definió la dirección final, la jerarquía y las decisiones de usabilidad.",
    rationale: "Cálida, creíble y humana; no una insurtech genérica.",
    type: "Tipografía",
    palette: "Paleta de color",
  },
};

const PROTECTA_COMPONENT_COPY: Record<"en" | "es", { title: string; body: string; labels: string[]; libraryTitle: string; libraryGroups: Array<{ title: string; items: string }> }> = {
  en: {
    title: "Design + Build",
    body: "I built the design-system components in Figma with Figma AI, then implemented their coded counterparts with AI-assisted development. Storybook documents the implementation states, keeping bilingual reuse, accessibility review, and future iteration visible in one place.",
    labels: ["Primary CTA", "Coverage card", "Language switch", "Advisor contact"],
    libraryTitle: "Component library coverage",
    libraryGroups: [
      { title: "Foundations", items: "Color · Type · Spacing" },
      { title: "Navigation", items: "Header · Language switch · Mobile menu" },
      { title: "Conversion", items: "CTA buttons · Coverage cards · Advisor contact" },
      { title: "Quality", items: "Focus states · Mobile behavior · EN/ES copy" },
    ],
  },
  es: {
    title: "Diseño + Construcción",
    body: "Construí los componentes del sistema de diseño en Figma con Figma AI y después implementé sus equivalentes en código con desarrollo asistido por IA. Storybook documenta los estados de implementación para mantener visible en un solo lugar la reutilización bilingüe, la revisión de accesibilidad y la iteración futura.",
    labels: ["CTA principal", "Tarjeta de cobertura", "Selector de idioma", "Contacto con asesor"],
    libraryTitle: "Cobertura de la biblioteca de componentes",
    libraryGroups: [
      { title: "Fundamentos", items: "Color · Tipografía · Espaciado" },
      { title: "Navegación", items: "Encabezado · Selector de idioma · Menú móvil" },
      { title: "Conversión", items: "Botones CTA · Tarjetas de cobertura · Contacto con asesor" },
      { title: "Calidad", items: "Estados de foco · Comportamiento móvil · Textos EN/ES" },
    ],
  },
};

const PROTECTA_HANDOFF_COPY: Record<"en" | "es", { stages: Array<{ title: string; body: string }> }> = {
  en: {
    stages: [
      { title: "Explore the visual direction", body: "A fast first screen to compare tone, hierarchy, and brand character, not the final UI." },
      { title: "Turn the direction into a system", body: "I built the components, variants, and bilingual states that the pages would reuse." },
      { title: "Implement and verify", body: "The coded counterpart is reviewed in Storybook for behavior, responsive states, and accessibility." },
    ],
  },
  es: {
    stages: [
      { title: "Explorar la dirección visual", body: "Una primera pantalla rápida para comparar tono, jerarquía y carácter de marca; no la UI final." },
      { title: "Convertir la dirección en sistema", body: "Construí los componentes, variantes y estados bilingües que reutilizarían las páginas." },
      { title: "Implementar y verificar", body: "El equivalente en código se revisa en Storybook para validar comportamiento, estados responsive y accesibilidad." },
    ],
  },
};

const PROTECTA_LAUNCH_STACK: Record<"en" | "es", { eyebrow: string; title: string; items: Array<{ tool: string; role: string }> }> = {
  en: {
    eyebrow: "Launch stack",
    title: "Tools with defined roles",
    items: [
      { tool: "NotebookLM", role: "Research synthesis" },
      { tool: "Claude Design", role: "First visual direction" },
      { tool: "ChatGPT", role: "Working definitions + copy" },
      { tool: "Codex", role: "Implementation support" },
      { tool: "GitHub", role: "Version control" },
      { tool: "Vercel", role: "Live deployment" },
      { tool: "Storybook", role: "Component documentation + QA" },
    ],
  },
  es: {
    eyebrow: "Stack de lanzamiento",
    title: "Herramientas con roles definidos",
    items: [
      { tool: "NotebookLM", role: "Síntesis de investigación" },
      { tool: "Claude Design", role: "Primera dirección visual" },
      { tool: "ChatGPT", role: "Definiciones de trabajo y copy" },
      { tool: "Codex", role: "Soporte de implementación" },
      { tool: "GitHub", role: "Control de versiones" },
      { tool: "Vercel", role: "Despliegue en vivo" },
      { tool: "Storybook", role: "Documentación de componentes y QA" },
    ],
  },
};

const PROTECTA_STORYBOOK_URL = "https://protecta.today/storybook?path=/docs/components-accordion--docs";

const PROTECTA_STORYBOOK_ICONS: Record<string, typeof ChevronDown> = {
  "components-accordion": ChevronDown,
  "components-button": MousePointerClick,
  "components-card": CreditCard,
  "layout-header": PanelTop,
  "components-contactinfocard": Contact,
  "components-alert": TriangleAlert,
  "components-badge": Tag,
  "components-input": TextCursorInput,
  "components-pill": Pill,
  "components-pricingcard": BadgeDollarSign,
  "layouts-formlayout": LayoutTemplate,
};

const PROTECTA_STORYBOOK: Record<"en" | "es", { eyebrow: string; title: string; body: string; link: string; components: Array<{ title: string; url: string }> }> = {
  en: {
    eyebrow: "Live component documentation",
    title: "Protecta Storybook: built in code, documented to scale",
    body: "I built the design-system components in Figma with Figma AI, then implemented their coded counterparts with AI-assisted development. Storybook documents the implementation states for consistency, accessibility review, and future iteration.",
    link: "Open Protecta Storybook ↗",
    components: [
      { title: "Accordion", url: "https://protecta.today/storybook?path=/docs/components-accordion--docs" },
      { title: "Button", url: "https://protecta.today/storybook?path=/docs/components-button--docs" },
      { title: "Card", url: "https://protecta.today/storybook?path=/docs/components-card--docs" },
      { title: "Header", url: "https://protecta.today/storybook?path=/docs/layout-header--docs" },
      { title: "Contact info card", url: "https://protecta.today/storybook?path=/docs/components-contactinfocard--docs" },
      { title: "Alert", url: "https://protecta.today/storybook?path=/docs/components-alert--docs" },
      { title: "Badge", url: "https://protecta.today/storybook?path=/docs/components-badge--docs" },
      { title: "Input", url: "https://protecta.today/storybook?path=/docs/components-input--docs" },
      { title: "Pill", url: "https://protecta.today/storybook?path=/docs/components-pill--docs" },
      { title: "Pricing card", url: "https://protecta.today/storybook?path=/docs/components-pricingcard--docs" },
      { title: "Form layout", url: "https://protecta.today/storybook?path=/docs/layouts-formlayout--docs" },
    ],
  },
  es: {
    eyebrow: "Documentación de componentes en vivo",
    title: "Storybook de Protecta: componentes de Figma, implementados en código",
    body: "Construí los componentes del sistema de diseño en Figma con Figma AI y después implementé sus equivalentes en código con desarrollo asistido por IA. Storybook documenta los estados de implementación para mantener consistencia, revisar accesibilidad e iterar en el futuro.",
    link: "Abrir Storybook de Protecta ↗",
    components: [
      { title: "Acordeón", url: "https://protecta.today/storybook?path=/docs/components-accordion--docs" },
      { title: "Botón", url: "https://protecta.today/storybook?path=/docs/components-button--docs" },
      { title: "Tarjeta", url: "https://protecta.today/storybook?path=/docs/components-card--docs" },
      { title: "Header", url: "https://protecta.today/storybook?path=/docs/layout-header--docs" },
      { title: "Tarjeta de contacto", url: "https://protecta.today/storybook?path=/docs/components-contactinfocard--docs" },
      { title: "Alerta", url: "https://protecta.today/storybook?path=/docs/components-alert--docs" },
      { title: "Badge", url: "https://protecta.today/storybook?path=/docs/components-badge--docs" },
      { title: "Input", url: "https://protecta.today/storybook?path=/docs/components-input--docs" },
      { title: "Pill", url: "https://protecta.today/storybook?path=/docs/components-pill--docs" },
      { title: "Tarjeta de precios", url: "https://protecta.today/storybook?path=/docs/components-pricingcard--docs" },
      { title: "Layout de formulario", url: "https://protecta.today/storybook?path=/docs/layouts-formlayout--docs" },
    ],
  },
};

const FLOCK_AUDIT_LABELS = [
  { color: "#50A8FF", label: "Navigation", note: "Top-level hierarchy and route clarity." },
  { color: "#AD86FF", label: "Typography", note: "Heading scale, weight, and readability drift." },
  { color: "#F091FF", label: "Spacing", note: "Inconsistent padding, gutters, and density." },
  { color: "#FFB865", label: "States", note: "Hover, selected, and status patterns varied too much." },
  { color: "#9CD99F", label: "Tables", note: "Headers, rows, and controls lacked a shared pattern." },
  { color: "#D9A49C", label: "Dialogs", note: "Modal structure and actions were not standardized." },
];
const FLOCK_CHECKLIST_SECTIONS = [
  {
    title: "Color & Typography",
    intro: "The audit found low-contrast surfaces, weak hierarchy, and inconsistent heading treatment across pages.",
    checklist: [
      "Contrast: All text, UI elements, and graphics meet minimum contrast ratios and remain readable in all states.",
      "Color Usage: Color is not the only way to convey information; additional cues (icons, labels, states) are used.",
      "Focus & States: Interactive elements have clear, visible focus states that are distinct from hover and other states.",
    ],
  },
  {
    title: "Layout & Navigation",
    intro: "Navigation patterns and page structure drifted between modules, making the product feel less predictable.",
    checklist: [
      "Reading Order: Content follows a clear, logical order, ensuring proper reading and navigation for all users, including screen readers.",
      "Tables: Data tables are simplified, avoid complex structures, and include clear captions.",
      "Navigation Consistency: Navigation is consistent across pages, making it easier to learn and use.",
      "Navigation States: All navigation elements include clear states (default, hover, active, focus, and selected) to indicate interaction and location.",
    ],
  },
  {
    title: "Links & Buttons",
    intro: "Interactive controls used mixed visual rules, so priority and affordance were not always obvious.",
    checklist: [
      "Links vs Buttons: Links are used for navigation (URL change or focus shift); buttons are used for actions.",
      "Link & Button Text: Labels are clear, descriptive, and concise. Avoid vague text and indicate external links when needed.",
      "Contrast: Links and buttons meet contrast requirements, including text, background, and borders, and are clearly distinguishable as interactive elements.",
      "Target Size: Clickable elements meet minimum size requirements (24×24 CSS px) where applicable.",
    ],
  },
  {
    title: "Forms & Controls",
    intro: "Form fields, inline feedback, and changeable content lacked enough structure to support accessibility and QA.",
    checklist: [
      "Forms & Controls: Inputs, labels, and controls are clear, visible, and placed close together. All states (active, focus, hover) are defined.",
      "Error & Status Messages: Users receive clear feedback for actions, errors, and system states. Messages are placed correctly and provide enough guidance to fix issues.",
      "Dynamic Content: Interactive content (audio, video, UI elements) is accessible via keyboard and meets contrast and state requirements.",
      "Motion & Animation: Animations follow accessibility guidelines, avoid unnecessary motion, and include options to reduce or stop movement.",
    ],
  },
];
const FLOCK_CHECKLIST_USAGE = [
  {
    step: "1. Baseline audit",
    body: "I reconstructed a representative legacy dashboard and tagged recurring issues instead of reviewing isolated screens in a vacuum.",
  },
  {
    step: "2. Pattern grouping",
    body: "Findings were grouped into checklist categories so accessibility issues could be connected to reusable system decisions.",
  },
  {
    step: "3. Component translation",
    body: "Each issue was then translated into a before/after component example the team could review, implement, and QA consistently.",
  },
];
const FLOCK_RESULTS_COMPARISON = [
  {
    before: "Compliance issues across existing pages.",
    after: "Approved accessibility standards (Level A, Level AA) and a clearer standardization path.",
  },
  {
    before: "Fragmented and duplicated patterns.",
    after: "Unified shared library direction.",
  },
  {
    before: "Weak handoff and limited reusable components.",
    after: "Documented information to create alignment and clearer implementation support.",
  },
];
const FLOCK_SOLUTION = [
  {
    title: "Consistency",
    body: "Reusable components (buttons, headers, fonts, etc.) ensure a uniform design across the project, making it easier for developers to match the final product to the design.",
  },
  {
    title: "Faster Updates",
    body: "When a component is updated, all instances automatically adjust, keeping designers and developers aligned without manual revisions.",
  },
  {
    title: "Design Systems",
    body: "Components are part of a design system, providing clear guidelines for both teams and reducing errors in implementation.",
  },
  {
    title: "Auto Layout & Constraints",
    body: "Designers can use auto layout to create responsive components, which developers can easily translate into code for different screen sizes.",
  },
];

function FlockAuditSnapshot() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#d7e8f7] bg-white shadow-[0_24px_64px_rgba(17,131,208,0.10)]">
      <div className="border-b border-[#e3eef8] bg-[#f7fbff] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8e6f4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8e6f4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8e6f4]" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_320px]">
        <div className="overflow-x-auto bg-[#fbfdff] p-4 md:p-6">
          <div className="min-w-[820px] rounded-[22px] border border-[#dceaf7] bg-white p-4 shadow-[0_18px_48px_rgba(14,41,81,0.08)]">
            <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-4">
              <aside className="rounded-[18px] border border-[#e4eef7] bg-[#f7fbff] p-4">
                <div className="mb-4 h-9 rounded-[10px] border-[5px]" style={{ borderColor: "#50A8FF" }} />
                <div className="space-y-3">
                  {["Workspace", "Queues", "Policies", "Users", "Reports", "Settings"].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-[10px] px-3 py-2 text-[13px] font-medium ${
                        index === 2 ? "border-[5px]" : "border border-transparent"
                      }`}
                      style={index === 2 ? { borderColor: "#AD86FF", color: "#0e2951" } : { color: "#5c7792" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[12px] border-[5px] px-3 py-4" style={{ borderColor: "#D9A49C" }}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0e2951]">Action panel</p>
                  <div className="mt-3 flex gap-2">
                    <div className="h-8 flex-1 rounded-[10px] bg-[#eef5fb]" />
                    <div className="h-8 w-12 rounded-[10px] bg-[#eef5fb]" />
                  </div>
                </div>
              </aside>

              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#e4eef7] bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex rounded-full border-[5px] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ borderColor: "#9CD99F", color: "#0e2951" }}>
                        Audit baseline
                      </div>
                      <h3 className="mt-4 max-w-[360px] border-[5px] px-3 py-2 text-[24px] font-semibold leading-tight text-[#0e2951]" style={{ borderColor: "#AD86FF" }}>
                        Access patterns and interface rules had drifted over time
                      </h3>
                      <div className="mt-4 grid max-w-[420px] gap-3 sm:grid-cols-2">
                        <div className="rounded-[14px] border-[5px] p-3" style={{ borderColor: "#F091FF" }}>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Density</p>
                          <p className="mt-2 text-[14px] leading-[1.5] text-[#0e2951]">Spacing changed from section to section without a shared rule.</p>
                        </div>
                        <div className="rounded-[14px] border-[5px] p-3" style={{ borderColor: "#FFB865" }}>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">States</p>
                          <p className="mt-2 text-[14px] leading-[1.5] text-[#0e2951]">Tags, pills, and selected rows used competing visual signals.</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-[210px] rounded-[16px] border border-[#e4eef7] bg-[#f8fbfe] p-4">
                      <div className="mb-3 border-[5px] p-3" style={{ borderColor: "#9CD99F" }}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Table header</p>
                        <div className="mt-3 space-y-2">
                          <div className="h-2 rounded-full bg-[#dceaf7]" />
                          <div className="h-2 w-4/5 rounded-full bg-[#dceaf7]" />
                        </div>
                      </div>
                      <div className="border-[5px] p-3" style={{ borderColor: "#50A8FF" }}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Sort / filter</p>
                        <div className="mt-3 flex gap-2">
                          <div className="h-8 flex-1 rounded-[10px] bg-white" />
                          <div className="h-8 w-10 rounded-[10px] bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#e4eef7] bg-white p-4">
                  <div className="grid grid-cols-[1.15fr_0.9fr_0.9fr_1fr_0.7fr] gap-3 border-b border-[#e8f0f7] px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">
                    <span className="border-[5px] px-2 py-1" style={{ borderColor: "#50A8FF" }}>Entity</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span className="border-[5px] px-2 py-1" style={{ borderColor: "#F091FF" }}>Permissions</span>
                    <span>Actions</span>
                  </div>
                  <div className="space-y-3 pt-3">
                    {[
                      ["Northwind Team", "Owner", "Active", "12 rules"],
                      ["Ops Group", "Editor", "Pending", "8 rules"],
                      ["Support Pod", "Viewer", "Active", "5 rules"],
                      ["Regional Admin", "Manager", "Inactive", "11 rules"],
                    ].map((row, index) => (
                      <div key={row[0]} className="grid grid-cols-[1.15fr_0.9fr_0.9fr_1fr_0.7fr] gap-3 rounded-[14px] border border-[#edf3f8] bg-[#fcfeff] px-3 py-3 text-[14px] text-[#0e2951]">
                        <div className={index === 1 ? "border-[5px] px-2 py-1" : ""} style={index === 1 ? { borderColor: "#AD86FF" } : undefined}>{row[0]}</div>
                        <div>{row[1]}</div>
                        <div className={index === 2 ? "border-[5px] px-2 py-1" : ""} style={index === 2 ? { borderColor: "#FFB865" } : undefined}>{row[2]}</div>
                        <div>{row[3]}</div>
                        <div className="flex justify-end">
                          <div className={index === 3 ? "border-[5px] px-3 py-1" : "px-3 py-1"} style={index === 3 ? { borderColor: "#D9A49C" } : undefined}>•••</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e3eef8] bg-[#f8fbfe] p-6 lg:border-l lg:border-t-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#0E6FB4]">Audit Key</p>
          <h3 className="mt-4 text-[24px] font-semibold leading-tight text-[#0e2951]">How the “before” was analyzed</h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#5c7792]">
            The original product surface was mapped as an audit artifact. I tagged recurring issues by pattern family so the team could see where accessibility, hierarchy, and system consistency were breaking down before proposing a shared solution.
          </p>
          <div className="mt-6 space-y-3">
            {FLOCK_AUDIT_LABELS.map((item) => (
              <div key={item.label} className="rounded-[16px] border border-[#dceaf7] bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 rounded-[5px]" style={{ backgroundColor: item.color }} />
                  <p className="text-[14px] font-semibold text-[#0e2951]">{item.label}</p>
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlockChecklistShowcase() {
  return (
    <div className="space-y-8">
      {FLOCK_CHECKLIST_SECTIONS.map((section) => (
        <div key={section.title} className="overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white py-0">
          <div className="p-0">
            <div className="border-b border-[#d7d2d3] bg-white px-6 py-5">
              <h3 className="text-[28px] font-semibold leading-tight text-[#141114]">{section.title}</h3>
              <p className="mt-3 max-w-[820px] text-[15px] leading-[1.7] text-[#5c5960]">{section.intro}</p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_320px]">
              <div className="border-b border-[#d7d2d3] p-6 lg:border-b-0 lg:border-r">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9b6b6b]">Before</p>
                <div className="mt-4 rounded-[20px] border border-[#EEEFEF] p-5">
                  {section.title === "Color & Typography" ? (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-[14px] font-medium uppercase tracking-[0.16em] text-[#7D7F80]">General</p>
                        <h4 className="text-[26px] font-medium leading-tight text-[#7D7F80]">settings</h4>
                      </div>
                      <p className="max-w-[420px] text-[14px] leading-[1.6] text-[#929395]">
                        Supporting text blended into the background and the heading scale did not create a reliable reading order.
                      </p>
                      <div className="grid max-w-[460px] gap-3 sm:grid-cols-2">
                        <div className="rounded-[14px] bg-white/70 p-4">
                          <p className="text-[12px] text-[#b4b4b4]">Status</p>
                          <p className="mt-2 inline-flex rounded-full bg-[#FE9C32] px-3 py-1 text-[14px] font-medium text-white">Review</p>
                        </div>
                        <div className="rounded-[14px] bg-white/70 p-4">
                          <p className="text-[12px] text-[#b4b4b4]">Owner</p>
                          <p className="mt-2 text-[14px] text-[#989898]">Operations</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-[14px] bg-[#1AB065] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(26,176,101,0.18)]"
                      >
                        Save changes
                      </button>
                    </div>
                  ) : null}

                  {section.title === "Layout & Navigation" ? (
                    <div className="space-y-4">
                      <div className="rounded-[12px] bg-[#FFF7AC] px-4 py-3 text-[13px] font-medium text-[#7D7F80]">
                        Go back to broker portal
                      </div>
                      <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                        <div className="rounded-[16px] bg-[#303845] p-4">
                          <div className="space-y-3 text-[13px] text-white">
                            <p>Home</p>
                            <p>Reports</p>
                            <p className="rounded-[10px] bg-white/12 px-2 py-1 text-white">Settings</p>
                            <p>Users</p>
                          </div>
                        </div>
                        <div className="rounded-[16px] bg-white/70 p-4">
                          <div className="rounded-[16px] border border-[#eadede] bg-[#fcfbfb] p-4">
                            <div className="min-h-[240px] rounded-[20px] border border-[#eadede] bg-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Links & Buttons" ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <button type="button" className="rounded-[14px] bg-[#1AB065] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(26,176,101,0.18)]">Save</button>
                        <button type="button" className="rounded-[14px] bg-[#0E6FB3] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(14,111,179,0.18)]">Cancel</button>
                        <a href="#0" className="self-center text-[14px] text-[#1249BF] no-underline">View details</a>
                      </div>
                      <div className="rounded-[14px] bg-white/70 p-4">
                        <p className="text-[14px] leading-[1.6] text-[#9a9a9a]">
                          Controls looked related, but visual priority and focus behavior were not clearly differentiated.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Forms & Controls" ? (
                    <div className="space-y-4">
                      <div className="rounded-[14px] bg-white/70 p-4">
                        <div className="h-11 rounded-[12px] border border-[#e7d7d7] bg-white" />
                        <p className="mt-2 text-[12px] text-[#b2a5a5]">No persistent label, helper text, or validation context.</p>
                        <p className="mt-2 text-[12px] text-[#C98F8F]">Error</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-[12px] bg-white/70 px-4 py-2 text-[13px] text-[#9f9f9f]">Filter</div>
                        <div className="rounded-[12px] bg-[#f2e7e7] px-4 py-2 text-[13px] text-[#9f9f9f]">Active only</div>
                      </div>
                      <div className="rounded-[14px] bg-white/70 p-4">
                        <p className="text-[14px] leading-[1.6] text-[#9a9a9a]">Inline updates and control state changes were easy to miss.</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="border-b border-[#d7d2d3] p-6 lg:border-b-0 lg:border-r">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#4d87ae]">After</p>
                <div className="mt-4 rounded-[20px] border border-[#d7e8f7] bg-[#f8fbfe] p-5">
                  {section.title === "Color & Typography" ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-end gap-4">
                        <button
                          type="button"
                          aria-label="Close"
                          className="inline-flex items-center justify-center text-[16px] font-medium leading-none text-[#5c7792]"
                        >
                          X
                        </button>
                      </div>
                      <h4 className="text-[28px] font-semibold leading-tight text-[#0e2951]">System settings</h4>
                      <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#5c7792]">
                        A stronger type scale, darker body copy, and clearer supporting labels created a more readable baseline for every screen.
                      </p>
                      <div className="grid max-w-[460px] gap-3 sm:grid-cols-2">
                        <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Status</p>
                          <p className="mt-2 inline-flex rounded-full bg-[#FFF1E2] px-3 py-1 text-[14px] font-medium text-[#A85A00]">Review</p>
                        </div>
                        <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Owner</p>
                          <p className="mt-2 text-[14px] font-medium text-[#0e2951]">Operations</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-[14px] bg-[#1183D0] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(17,131,208,0.18)]"
                      >
                        Save changes
                      </button>
                    </div>
                  ) : null}

                  {section.title === "Layout & Navigation" ? (
                    <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                      <div className="flex flex-col justify-between rounded-[16px] bg-[#303845] p-4">
                        <div className="space-y-3 text-[13px] font-medium text-white">
                          <p>Home</p>
                          <p>Reports</p>
                          <p className="block w-full rounded-[10px] bg-[rgba(17,131,208,0.26)] px-3 py-2 text-white shadow-[0_10px_24px_rgba(17,131,208,0.18)] ring-1 ring-[rgba(216,236,251,0.4)]">Settings</p>
                          <p>Users</p>
                        </div>
                        <button
                          type="button"
                          className="mt-6 inline-flex items-center gap-2 bg-transparent px-0 py-2 text-[13px] font-medium text-white"
                        >
                          <span aria-hidden="true">←</span>
                          Back to the portal
                        </button>
                      </div>
                      <div className="rounded-[16px] border border-[#d7e8f7] bg-white p-4">
                        <div className="rounded-[16px] border border-[#d7e8f7] bg-[#f8fbfe] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                          <div className="min-h-[240px] rounded-[20px] border border-[#d7e8f7] bg-white shadow-[0_8px_20px_rgba(17,131,208,0.08)]" />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Links & Buttons" ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <button type="button" className="rounded-[14px] bg-[#1183D0] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(17,131,208,0.18)]">Save changes</button>
                        <button type="button" className="rounded-[14px] border border-[#CFE5F8] bg-white px-4 py-2 text-[14px] font-semibold text-[#0E6FB4]">Cancel</button>
                        <a href="#0" className="self-center text-[14px] font-medium text-[#0e2951] underline underline-offset-4">View details</a>
                      </div>
                      <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                        <p className="text-[14px] leading-[1.6] text-[#5c7792]">
                          Action hierarchy, hover affordance, and focus visibility were standardized to make interactions easier to interpret and test.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Forms & Controls" ? (
                    <div className="space-y-4">
                      <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Name and last name</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="h-11 rounded-[12px] border border-[#d7e8f7] bg-[#F7FBFF]" />
                          <div className="h-11 rounded-[12px] border border-[#d7e8f7] bg-[#F7FBFF]" />
                        </div>
                        <p className="mt-2 text-[12px] text-[#5c7792]">Users can enter their first and last name in clearly separated fields.</p>
                      </div>
                      <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Email address</p>
                        <div className="h-11 rounded-[12px] border-2 border-[#1183D0] bg-[#F7FBFF]" />
                        <p className="mt-2 text-[12px] text-[#5c7792]">Used for account recovery and system alerts.</p>
                        <div
                          role="alert"
                          aria-live="polite"
                          className="mt-3 flex items-start gap-3 rounded-[12px] border border-[#F2C6A1] bg-[#FFF4EB] px-3 py-3 text-[12px] font-medium text-[#8A3F00]"
                        >
                          <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#A64B00]" />
                          <div className="space-y-1">
                            <p className="font-semibold leading-none text-[#7A3400]">Validation error</p>
                            <p className="leading-[1.5] text-[#8A3F00]">Enter a valid email address to continue.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-[12px] border border-[#d7e8f7] bg-white px-4 py-2 text-[13px] font-medium text-[#0e2951]">Filter</div>
                        <div className="rounded-[12px] bg-[#E0EEFB] px-4 py-2 text-[13px] font-medium text-[#0E6FB4]">Active only</div>
                      </div>
                      <div className="rounded-[14px] border border-[#9CD99F] bg-[#f3fbf4] p-4">
                        <p className="text-[14px] leading-[1.6] text-[#0e2951]">Changes saved. Filters and validation now use persistent status messaging.</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                <p className="text-[12px] font-semibold text-[#0E6FB4]">Requirements met</p>
                <div className="mt-4 space-y-3">
                  {section.checklist.map((item) => (
                    <div key={item} className="px-1 py-1">
                      <p
                        className="text-[14px] leading-[1.6] text-[#5c5960]"
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace("Contrast:", "<strong>Contrast:</strong>")
                            .replace("Color Usage:", "<strong>Color Usage:</strong>")
                            .replace("Focus & States:", "<strong>Focus & States:</strong>")
                            .replace("Reading Order:", "<strong>Reading Order:</strong>")
                            .replace("Tables:", "<strong>Tables:</strong>")
                            .replace("Navigation Consistency:", "<strong>Navigation Consistency:</strong>")
                            .replace("Navigation States:", "<strong>Navigation States:</strong>")
                            .replace("Links vs Buttons:", "<strong>Links vs Buttons:</strong>")
                            .replace("Link & Button Text:", "<strong>Link & Button Text:</strong>")
                            .replace("Target Size:", "<strong>Target Size:</strong>")
                            .replace("Forms & Controls:", "<strong>Forms & Controls:</strong>")
                            .replace("Error & Status Messages:", "<strong>Error & Status Messages:</strong>")
                            .replace("Dynamic Content:", "<strong>Dynamic Content:</strong>")
                            .replace("Motion & Animation:", "<strong>Motion & Animation:</strong>"),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FlockChecklistUsage() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {FLOCK_CHECKLIST_USAGE.map((item) => (
        <Card key={item.step} className="overflow-hidden border border-[#d7e8f7]">
          <CardContent className="p-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">{item.step}</p>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#5c7792]">{item.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getPayloadList(payload: Record<string, unknown> | null | undefined, key: string) {
  const value = payload?.[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function getPayloadRows(payload: Record<string, unknown> | null | undefined, key: string) {
  const value = payload?.[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is PayloadRow => {
    return Boolean(item && typeof item === "object" && ("metric" in item || "value" in item));
  });
}

function isContentBlock(block: CaseStudyContentBlock | undefined): block is CaseStudyContentBlock {
  return Boolean(block);
}

function hasLocalizedCaseStudyPayload(language: Language) {
  return language !== "en";
}

// Per-slug word counts so the italic accent lands on the same phrase in every
// locale instead of relying on the default English/other-language split.
const EDITORIAL_TITLE_ACCENT_WORDS: Record<string, Partial<Record<Language, number>>> = {
  "flock-accessibility-system": { en: 3, es: 4, de: 2 },
  "i9-everify-integration": { en: 1, es: 2, de: 1 },
};

function splitNayyaHeroTitle(title: string, language: Language, accentWordCount?: number) {
  if (title === "Brand & Bilingual Website") {
    return { lead: "Brand &", accent: "Bilingual Website" };
  }

  const words = title.trim().split(/\s+/);
  const accentWords = accentWordCount ?? (language === "en" ? 1 : 2);
  const splitIndex = Math.max(1, words.length - accentWords);

  return {
    lead: words.slice(0, splitIndex).join(" "),
    accent: words.slice(splitIndex).join(" "),
  };
}

function renderNayyaEditorialTitle(title: string) {
  const words = title.trim().split(/\s+/);
  const accent = words.pop();

  if (!accent || words.length === 0) return title;

  return (
    <>
      {words.join(" ")}{" "}
      <span className="font-playfair font-normal italic">{accent}</span>
    </>
  );
}

function renderMarkedTitle(title: string) {
  return title.split("*").map((part, index) =>
    index % 2 === 1 ? (
      <span key={`accent-${index}`} className="font-playfair font-normal italic">
        {part}
      </span>
    ) : (
      <Fragment key={`part-${index}`}>{part}</Fragment>
    )
  );
}

function LocalizedCaseStudyOverview({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  const translate = useTranslate();
  const { language } = useLanguage();
  const { caseStudies } = usePublicCaseStudies();

  const contentBlocks = (caseStudy.content_blocks ?? []).filter((block) => block.id !== "overview");
  const overviewBlock = caseStudy.content_blocks?.find((block) => block.id === "overview");
  const sourceEntries =
    caseStudy.content_blocks
      ?.find((block) => block.id === "sources")
      ?.payload?.sources;
  const sources = Array.isArray(sourceEntries)
    ? sourceEntries.filter(
        (source): source is Record<string, unknown> => Boolean(source) && typeof source === "object" && !Array.isArray(source),
      )
    : [];

  const accentWordCount = EDITORIAL_TITLE_ACCENT_WORDS[caseStudy.slug]?.[language];
  const editorialTitle = splitNayyaHeroTitle(caseStudy.title, language, accentWordCount);
  const accentIsBlock =
    caseStudy.slug === "flock-accessibility-system" || caseStudy.slug === "i9-everify-integration" || caseStudy.slug === "protecta";

  const otherProjects = caseStudies
    .filter(
      (project) =>
        project.slug !== caseStudy.slug &&
        project.status === "published" &&
        !isHiddenCaseStudySlug(project.slug),
    )
    .slice(0, 3)
    .map((project) => ({
      ...project,
      cardId: resolveHomeCardId(project.slug),
      previewImage: resolveHomeCardImage(project.slug, project.images.cover || project.images.hero || ""),
      background: RELATED_PROJECT_BACKGROUNDS[project.slug],
    }));

  const metaDetails = [
    [translate("caseStudy.year"), String(caseStudy.year ?? "")],
    [translate("caseStudy.role"), caseStudy.role ?? ""],
    [translate("caseStudy.client"), caseStudy.client_context ?? caseStudy.company ?? ""],
  ].filter(([, value]) => Boolean(value));

  return (
    <main data-case-study={caseStudy.slug} className="min-h-screen overflow-x-clip bg-white text-[#3c3e3f]">
      <SiteHeader active="Projects" behavior="reveal" />

      <section className="bg-[#faf8f7] px-6 pb-16 pt-10 md:px-10 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <nav className="flex flex-wrap items-center gap-3 text-sm text-[#5c5960]" aria-label={translate("caseStudy.projects")}>
            <Link href={withBasePath("/")} className="text-[#451044] transition-colors hover:text-[#0E6FB4]">{translate("caseStudy.home")}</Link>
            <span aria-hidden="true" className="text-[#aaa5aa]">›</span>
            <Link href={withBasePath("/projects")} className="transition-colors hover:text-[#0E6FB4]">{translate("caseStudy.projects")}</Link>
            <span aria-hidden="true" className="text-[#aaa5aa]">›</span>
            <span className="min-w-0 break-words font-semibold text-[#141114]">{caseStudy.title}</span>
          </nav>

          <div className="mt-12 max-w-full">
            <div className={`relative max-w-[1040px] py-6 text-left ${caseStudy.slug === "protecta" ? "lg:w-3/5" : ""}`}>
              <p className="mb-3 inline-flex rounded-full bg-[#f8df36] px-4 py-2 font-inter text-xs font-semibold text-[#141114]">
                {caseStudy.industry ?? translate("caseStudy.caseStudyLabel")}
              </p>
              <h1 className="mb-5 max-w-[1000px] font-inter text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#141114]">
                {editorialTitle.lead}{" "}
                {editorialTitle.accent ? (
                  <span className={`font-playfair font-normal italic tracking-[-0.045em] ${accentIsBlock ? "block" : ""}`}>
                    {editorialTitle.accent}
                  </span>
                ) : null}
              </h1>
              <p className="mt-7 max-w-full break-words text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.55] text-[#5c5960] lg:w-3/5">{caseStudy.tagline}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#5c5960]" aria-label="Project details">
                {[
                  String(caseStudy.year ?? ""),
                  caseStudy.role ?? "",
                  `${translate("caseStudy.client")}: ${caseStudy.client_context ?? caseStudy.company ?? ""}`,
                ]
                  .filter(Boolean)
                  .map((detail, index) => (
                    <span key={`${detail}-${index}`} className="inline-flex items-center gap-3">
                      {index > 0 ? <span aria-hidden="true">·</span> : null}
                      <span>{detail}</span>
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {caseStudy.slug !== "protecta" && (caseStudy.images.hero || caseStudy.images.cover) ? (
        <section className="mx-auto max-w-[1200px] px-6 pb-8 md:px-10 xl:px-20">
          <div className="relative mx-auto aspect-[2/1] w-full max-w-[1040px] overflow-hidden rounded-[32px] border-4 border-white/90 shadow-[0_20px_64px_rgba(14,41,81,0.12)]">
            <Image
              src={withBasePath(caseStudy.images.hero || caseStudy.images.cover)}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 1040px) 100vw, 1040px"
              className="object-cover"
            />
          </div>
        </section>
      ) : null}

      {metaDetails.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 xl:px-20">
          <div className="grid gap-10 md:grid-cols-3 md:gap-0">
            {metaDetails.map(([label, value], index) => (
              <div
                key={label}
                className={`flex flex-col md:px-10 ${index > 0 ? "md:border-l md:border-[#d7d2d3]" : "md:pl-0"} ${index === metaDetails.length - 1 ? "md:pr-0" : ""}`}
              >
                <div className="mb-5 h-[3px] w-full rounded-full bg-[#f8df36]" />
                <p className="font-inter text-[15px] font-semibold uppercase tracking-[0.16em] text-[#5c5960]">{label}</p>
                <p className="mt-3 font-inter text-[18px] leading-[1.45] text-[#141114]">{value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 xl:px-20">
        <div className="rounded-[24px] border-l-[3px] border-[#f8df36] bg-white px-6 py-7 shadow-[8px_10px_0_#c7e8f7] md:px-10 md:py-9">
          <p className="mb-6 font-inter text-[15px] font-semibold uppercase tracking-[0.16em] text-[#141114]">
            {translate("caseStudy.overview")}
          </p>
          {overviewBlock?.body ? (
            <p className="max-w-[860px] font-inter text-[18px] leading-[1.8] text-[#5c5960]">{overviewBlock.body}</p>
          ) : null}
          {(caseStudy.problem.admin_pain_points.length || caseStudy.problem.user_pain_points.length) ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[caseStudy.problem.admin_pain_points, caseStudy.problem.user_pain_points].map((items, index) => (
                <article key={index} className="rounded-[20px] border border-[#d7d2d3] bg-[#faf8f7] p-6">
                  <div className="mb-5 h-[3px] w-full rounded-full bg-[#f8df36]" />
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c5960]">{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {caseStudy.metrics.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 xl:px-20">
          <div className="grid gap-10 md:grid-cols-3 md:gap-0">
            {caseStudy.metrics.map((metric, index) => (
              <article
                key={`${metric.label}-${metric.value}`}
                className={`flex min-h-[190px] flex-col md:min-h-[300px] md:px-10 ${index > 0 ? "md:border-l md:border-[#d7d2d3]" : "md:pl-0"} ${index === caseStudy.metrics.length - 1 ? "md:pr-0" : ""}`}
              >
                <p className="font-inter text-[15px] font-semibold tracking-[0.04em] text-[#0E6FB4]">{metric.label}</p>
                {metric.context ? (
                  <p className="mt-6 max-w-[30ch] font-inter text-[18px] leading-[1.45] text-[#5c5960]">{metric.context}</p>
                ) : null}
                <div className="relative mt-8 mb-8 flex items-end justify-between gap-2 pt-5">
                  <p className="font-inter text-[clamp(2.1rem,3.3vw,4rem)] font-bold leading-[0.88] tracking-[-0.065em] text-[#090909]">
                    {metric.value}
                  </p>
                  <ArrowUp aria-hidden="true" className="mb-1 size-7 shrink-0 text-[#090909] sm:size-8" strokeWidth={2} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {contentBlocks.filter((block) => block.id !== "sources").map((block) => {
        const payload = block.payload ?? {};
        const items = ["items", "insights", "opportunities", "projected", "successMetrics"]
          .flatMap((key) => getPayloadList(payload, key));
        const rows = getPayloadRows(payload, "rows");

        return (
          <section key={block.id} className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 xl:px-20">
            <div className="mx-auto max-w-[900px]">
              <div className="mb-6 flex flex-col items-center gap-4 text-center">
                <div className="mb-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#f8df36]" />
                <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                  {block.title}
                </h2>
              </div>
              {block.body ? (
                <p className="whitespace-pre-line font-inter text-[17px] leading-[1.8] text-[#5c5960]">{block.body}</p>
              ) : null}
              {items.length ? (
                <ul className="mt-7 max-w-[860px] space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 font-inter text-[15px] leading-[1.7] text-[#5c5960]">
                      <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#0E6FB4]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {rows.length ? (
                <div className="mt-8 grid max-w-[860px] gap-4 sm:grid-cols-2">
                  {rows.map((row, index) => (
                    <article key={`${row.metric}-${index}`} className="rounded-[20px] border border-[#d7d2d3] bg-white p-6">
                      <div className="mb-5 h-[3px] w-full rounded-full bg-[#f8df36]" />
                      <p className="font-inter text-[18px] font-semibold leading-[1.35] text-[#141114]">{row.metric ?? row.label ?? ""}</p>
                      <p className="mt-3 font-inter text-[15px] leading-[1.65] text-[#5c5960]">{row.value ?? row.context ?? ""}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {caseStudy.methodology.steps.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 xl:px-20">
          <div className="max-w-[900px]">
            <div className="mb-8 flex flex-col items-center gap-4 text-center">
              <div className="mb-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#f8df36]" />
              <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {caseStudy.methodology.name}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {caseStudy.methodology.steps.map((step) => (
                <article key={step.step} className="rounded-[20px] border border-[#d7d2d3] bg-white p-6">
                  <p className="font-inter text-[11px] font-semibold tracking-[0.18em] text-[#0E6FB4]">{step.step}</p>
                  <h3 className="mt-3 font-inter text-[20px] font-semibold leading-[1.35] text-[#141114]">{step.label}</h3>
                  <p className="mt-3 font-inter text-[14px] leading-[1.65] text-[#5c5960]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.design_strategy.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[900px] rounded-[24px] border-l-[3px] border-[#f8df36] bg-white px-6 py-7 shadow-[8px_10px_0_#c7e8f7] md:px-10 md:py-9">
            <p className="mb-6 font-inter text-[15px] font-semibold uppercase tracking-[0.16em] text-[#141114]">
              {translate("caseStudy.designProposal")}
            </p>
            <div className="space-y-4 font-inter text-[17px] leading-[1.8] text-[#5c5960]">
              {caseStudy.design_strategy.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.reflections.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[900px] rounded-[24px] border-l-[3px] border-[#f8df36] bg-white px-6 py-7 shadow-[8px_10px_0_#c7e8f7] md:px-10 md:py-9">
            <p className="mb-6 font-inter text-[15px] font-semibold uppercase tracking-[0.16em] text-[#141114]">
              {translate("caseStudy.learnings")}
            </p>
            <div className="space-y-5 font-inter text-[17px] leading-[1.8] text-[#5c5960]">
              {caseStudy.reflections.map((reflection) => (
                <p key={reflection.title}>
                  <strong className="text-[#141114]">{reflection.title} </strong>
                  {reflection.body}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {sources.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-7 flex flex-col items-center gap-4 text-center">
              <div className="mb-4 h-[3px] w-full max-w-[120px] rounded-full bg-[#f8df36]" />
              <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {translate("caseStudy.sources")}
              </h2>
            </div>
            <div className="space-y-3">
              {sources.map((source, index) => {
                const title = typeof source.title === "string" ? source.title : "";
                const description = typeof source.description === "string" ? source.description : "";
                const url = typeof source.url === "string" ? source.url : "";
                return (
                  <article key={`${title}-${index}`} className="rounded-[20px] border border-[#d7d2d3] bg-white p-6">
                    <div className="mb-5 h-[3px] w-full rounded-full bg-[#f8df36]" />
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" className="font-inter text-[18px] font-semibold text-[#0E6FB4] underline underline-offset-4">
                        {title}
                      </a>
                    ) : (
                      <p className="font-inter text-[18px] font-semibold text-[#141114]">{title}</p>
                    )}
                    {description ? <p className="mt-3 font-inter text-[15px] leading-[1.65] text-[#5c5960]">{description}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {otherProjects.length ? (
        <section className="mx-auto max-w-[1200px] px-6 pb-10 pt-1 md:px-10 xl:px-20">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5c5960]">{translate("caseStudy.moreWork")}</p>
          <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {translate("caseStudy.otherProjects")}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectTeaserCard
                key={project.slug}
                id={project.cardId}
                href={resolveProjectHref(project)}
                dataCardId={project.cardId}
                title={project.title}
                description={project.tagline ?? ""}
                tags={project.tags}
                image={project.previewImage}
                imageAlt={`${project.title} case study preview for ${project.company}`}
                background={project.background}
                ctaLabel={project.external_link ? translate("home.viewProject") : translate("home.viewCaseStudy")}
              />
            ))}
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}

function stripLeadingBullet(value: string) {
  return value.replace(/^\s*[•·▪‣◦]\s*/, "");
}

function parseStandaloneMarkdownLink(value: string) {
  const match = value.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
  if (!match) {
    return null;
  }
  return { label: match[1], url: match[2] };
}

function isMarkdownLink(value: ReturnType<typeof parseStandaloneMarkdownLink>): value is NonNullable<ReturnType<typeof parseStandaloneMarkdownLink>> {
  return Boolean(value);
}

function normalizeInsightHeading(value: string) {
  return stripLeadingBullet(value).replace(/^2026\s+data$/i, "2026");
}

function shouldHideInsight(value: string) {
  const normalized = stripLeadingBullet(value).toLowerCase();

  return (
    normalized === "skip this survey" ||
    normalized === "get recommendation" ||
    normalized === "powered by nayya"
  );
}

function getReverseTechPerformanceLabel(step: unknown, language: Language) {
  if (typeof step !== "string") {
    return null;
  }

  const normalized = step.toLowerCase();
  if (normalized.includes("31. age")) {
    return { label: translate("caseStudy.performanceGood", language), className: "bg-[#dcfce7] text-[#15803d]" };
  }
  if (normalized.includes("4. main goal")) {
    return { label: translate("caseStudy.performanceModerate", language), className: "bg-[#fef3c7] text-[#b45309]" };
  }
  if (normalized.includes("34. enter email")) {
    return { label: translate("caseStudy.performancePoor", language), className: "bg-[#fee2e2] text-[#b91c1c]" };
  }

  return null;
}

function formatReverseTechStepTitle(step: unknown, language: Language) {
  if (typeof step !== "string") {
    return "";
  }

  const cleaned = step
    .replace(/^\d+\.\s*/, "")
    .replace(/\s*-\s*(good|moderate|poor|regular|bad)\s+performance$/i, "")
    .trim();
  const normalized = cleaned.toLowerCase();

  if (normalized === "age" || normalized.startsWith("age step")) {
    return translate("caseStudy.stepAge", language);
  }
  if (normalized === "main goal") {
    return translate("caseStudy.stepMainGoal", language);
  }
  if (normalized === "enter email") {
    return translate("caseStudy.stepEnterEmail", language);
  }

  return cleaned;
}

function getReverseTechStepTag(step: unknown, language: Language) {
  if (typeof step !== "string") {
    return null;
  }

  const normalized = step.toLowerCase();

  if (normalized.includes("good performance")) {
    return { label: translate("caseStudy.performanceGood", language), className: "bg-[#dcfce7] text-[#15803d]" };
  }
  if (normalized.includes("moderate performance")) {
    return { label: translate("caseStudy.performanceModerate", language), className: "bg-[#fef3c7] text-[#b45309]" };
  }
  if (normalized.includes("poor performance")) {
    return { label: translate("caseStudy.performancePoor", language), className: "bg-[#fee2e2] text-[#b91c1c]" };
  }
  if (normalized.includes("regular performance")) {
    return { label: translate("caseStudy.performanceModerate", language), className: "bg-[#fef3c7] text-[#b45309]" };
  }
  if (normalized.includes("bad performance")) {
    return { label: translate("caseStudy.performancePoor", language), className: "bg-[#fee2e2] text-[#b91c1c]" };
  }

  return getReverseTechPerformanceLabel(step, language);
}

const REVERSE_TECH_HYPOTHESIS_2_FLOW = [
  "/images/projects/Reversetech/flow/Wireframes - Age Select V1 1.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 1.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 2.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 4.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 6.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 7.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 8.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 9.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 10.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 11.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 13.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 14.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 15.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 16.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 18.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 19.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 20.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 23.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 25.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 26.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 28.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 29.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 30.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 31.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 32.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 33.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 34.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 35.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 36.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 37.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 38.svg",
  "/images/projects/Reversetech/flow/Wireframes - Social Proof V1 41.svg",
] as const;

function getReverseTechFlowLabel(src: string) {
  if (src.includes("Age Select")) {
    return "Age Select";
  }

  const match = src.match(/Social Proof V1 (\d+)/i);
  if (match) {
    return `Social Proof ${match[1]}`;
  }

  return "Prototype Screen";
}

export function ProjectCaseStudyPageClient({ slug }: { slug: string }) {
  const EXPERIMENT_MODAL_BASE_WIDTH = 320;
  const translate = useTranslate();
  const { language } = useLanguage();
  const localizedLanguage = language === "es" ? "es" : "en";
  const { caseStudy, loading } = usePublicCaseStudy(slug);
  const { caseStudies } = usePublicCaseStudies();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [isPaywallControlExpanded, setIsPaywallControlExpanded] = useState(false);
  const [activeExperimentModal, setActiveExperimentModal] = useState<"a" | "b" | null>(null);
  const [experimentModalZoom, setExperimentModalZoom] = useState(1);
  const [experimentModalBaseHeight, setExperimentModalBaseHeight] = useState(0);
  const [prototypeIndex, setPrototypeIndex] = useState(0);
  const [calendarKeeperPhase, setCalendarKeeperPhase] = useState<"empathize" | "define" | "ideate" | "prototype">("empathize");
  const [showStickyCalendarTabs, setShowStickyCalendarTabs] = useState(false);
  const [reversetechTaskTab, setReversetechTaskTab] = useState<"task1" | "task2" | "task3" | "task4" | "task5">("task1");
  const [reversetechComparisonTab, setReversetechComparisonTab] = useState<"before" | "after">("after");
  const [showStickyTaskTabs, setShowStickyTaskTabs] = useState(false);
  const [isReverseTechTaskMenuOpen, setIsReverseTechTaskMenuOpen] = useState(false);
  const [activeProtectaStorybookUrl, setActiveProtectaStorybookUrl] = useState(PROTECTA_STORYBOOK_URL);
  const [openHypothesisIds, setOpenHypothesisIds] = useState<
    Array<"content-variants" | "cta-variants" | "rt-hypothesis-2" | "rt-hypothesis-4">
  >(caseStudy?.slug === "reversetech" ? ["rt-hypothesis-2"] : []);
  const [expandedUserNeed, setExpandedUserNeed] = useState<string | null>(null);
  const [expandedHmwIndex, setExpandedHmwIndex] = useState<number | null>(0);
  const reversetechTaskTabsRef = useRef<HTMLElement | null>(null);
  const calendarKeeperTabsRef = useRef<HTMLDivElement | null>(null);
  const experimentModalMockupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setEnteredPassword("");
    setPasswordError(null);
    setIsUnlocked(false);
    setReversetechTaskTab("task1");
    setShowStickyTaskTabs(false);
    setOpenHypothesisIds([]);
    setIsPaywallControlExpanded(false);
    setActiveExperimentModal(null);
    setExperimentModalZoom(1);
    setIsReverseTechTaskMenuOpen(false);
    setCalendarKeeperPhase("empathize");
    setShowStickyCalendarTabs(false);
  }, [caseStudy?.slug]);

  const handleCalendarKeeperPhaseChange = (phase: "empathize" | "define" | "ideate" | "prototype") => {
    setCalendarKeeperPhase(phase);
    window.setTimeout(() => {
      document.getElementById(`calendar-${phase}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const calendarKeeperPhases = ["empathize", "define", "ideate", "prototype"] as const;

  const toggleHypothesis = (hypothesisId: "content-variants" | "cta-variants" | "rt-hypothesis-2" | "rt-hypothesis-4") => {
    setOpenHypothesisIds((current) =>
      current.includes(hypothesisId)
        ? current.filter((id) => id !== hypothesisId)
        : [...current, hypothesisId]
    );
  };

  const handleReverseTechTaskTabChange = (taskTab: "task1" | "task2" | "task3" | "task4" | "task5") => {
    setReversetechTaskTab(taskTab);
    setIsReverseTechTaskMenuOpen(false);

    const targetByTask: Record<"task1" | "task2" | "task3" | "task4" | "task5", string> = {
      task1: "rt-funnel-diagnosis",
      task2: "rt-paywall-experiment-design",
      task3: "rt-task-3",
      task4: "rt-impact-metrics",
      task5: "rt-ai-implementation",
    };

    window.setTimeout(() => {
      const targetElement = document.getElementById(targetByTask[taskTab]);

      if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY - REVERSETECH_STICKY_HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      const tabsElement = reversetechTaskTabsRef.current;
      if (tabsElement) {
        const top = tabsElement.getBoundingClientRect().top + window.scrollY - REVERSETECH_STICKY_HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  const reverseTechTaskTabs = [
    { id: "task1" as const, label: translate("caseStudy.task1") },
    { id: "task2" as const, label: translate("caseStudy.task2") },
    { id: "task3" as const, label: translate("caseStudy.task3") },
    { id: "task4" as const, label: translate("caseStudy.task4") },
    { id: "task5" as const, label: translate("caseStudy.task5Short") },
  ];

  const activeReverseTechTaskLabel =
    reverseTechTaskTabs.find((item) => item.id === reversetechTaskTab)?.label ?? translate("caseStudy.tasks");

  const openExperimentModal = (modal: "a" | "b") => {
    setActiveExperimentModal(modal);
    setExperimentModalZoom(1);
  };

  const closeExperimentModal = () => {
    setActiveExperimentModal(null);
    setExperimentModalZoom(1);
  };

  const reverseTechExperimentAMockup = (
    <>
      <div className="mx-auto mb-[10px] h-[8px] w-[80px] rounded-full bg-[#1c1a17]" />
      <div className={`${kalam.className} flex min-h-[580px] flex-col gap-[7px] rounded-[18px] p-[10px]`}>
        <div className="px-3 py-3 text-center">
          <p className="text-[20px] font-bold leading-tight text-[#1c1a17]">Get health benefits with a bigger discount!</p>
        </div>
        <div className="rounded-[10px] border border-[#1c1a17] bg-[#DCEAEF] p-[7px]">
          <div className="grid grid-cols-2 gap-[6px]">
            {[["Now", "30% body fat"], ["Your goal", "14% body fat"]].map(([label, cap]) => (
              <div key={label}>
                <div className="flex min-h-[82px] items-center justify-center rounded-[8px] border border-[#1c1a17] bg-[repeating-linear-gradient(45deg,transparent_0_5px,#1c1a1712_5px_6px),#fffdf6] p-[4px] text-center text-[9px] uppercase tracking-wide text-[#4a443a]">
                  {label}
                </div>
                <p className="mt-1 text-center text-[9px] text-[#1c1a17]">{cap}</p>
                <p className="text-center text-[8px] text-[#4a443a]">Muscle strength {label === "Now" ? "regular" : "high"}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-[8px] border border-dashed border-[#1c1a17] bg-white/60 px-2 py-[4px] text-[9px] leading-[1.25] text-[#1c1a17]">
            Personalized plan preview based on your current body composition and target.
          </div>
        </div>
        <p className="mt-3 text-center text-[14px] font-semibold text-[#1c1a17]">Your Calisthenics plan is ready!</p>
        <div className="mt-3">
          <div className="grid grid-cols-[1fr_84px] items-center gap-2 rounded-[10px] border border-[#2a5cb8] bg-[#cfe4ff] px-3 py-[7px] text-left">
            <div>
              <p className="text-[8px] uppercase tracking-wide text-[#2a5cb8]">New promo code applied!</p>
              <p className="mt-1 text-[11px] font-bold text-[#1c1a17]">ANN-PLAN26</p>
            </div>
            <div className="rounded-[8px] border border-[#1c1a17] bg-white px-2 py-[6px] text-center">
              <p className="text-[8px] font-bold uppercase tracking-wide text-[#2a5cb8]">78% OFF</p>
              <p className="mt-1 text-[10px] font-bold text-[#1c1a17]">09:53 min.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-[6px]">
          <div className="relative grid grid-cols-[14px_1fr_auto] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] bg-white px-2 py-[8px] opacity-75">
            <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#1c1a17] px-[5px] py-[1px] text-[7px] text-white">FEEL BETTER IN A WEEK</span>
            <div className="h-[12px] w-[12px] rounded-full border border-[#1c1a17]" />
            <div>
              <p className="text-[11px] font-bold text-[#1c1a17]">WEEK PLAN</p>
              <div className="text-[9px] text-[#4a443a]">
                <span className="mr-1 line-through opacity-60">$19.99</span>
                <span className="font-bold text-[#1c1a17]">$4.40</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-[#4a443a] line-through opacity-60">$2.86</p>
              <p className="text-[13px] font-bold text-[#1c1a17]">$0.63</p>
              <p className="text-[8px] text-[#4a443a]">per day</p>
            </div>
          </div>
          <div className="relative grid grid-cols-[14px_1fr_auto] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] bg-white px-2 py-[8px] opacity-75">
            <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#1c1a17] px-[5px] py-[1px] text-[7px] text-white">GET VISIBLE RESULTS</span>
            <div className="h-[12px] w-[12px] rounded-full border border-[#1c1a17]" />
            <div>
              <p className="text-[11px] font-bold text-[#1c1a17]">MONTHLY PLAN</p>
              <div className="text-[9px] text-[#4a443a]">
                <span className="mr-1 line-through opacity-60">$39.99</span>
                <span className="font-bold text-[#1c1a17]">$8.80</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.43</p>
              <p className="text-[13px] font-bold text-[#1c1a17]">$0.31</p>
              <p className="text-[8px] text-[#4a443a]">per day</p>
            </div>
          </div>
          <div className="relative grid grid-cols-[14px_1fr_auto] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] bg-white px-2 py-[9px] opacity-75">
            <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#1c1a17] px-[5px] py-[1px] text-[7px] text-white">GET MORE HEALTH BENEFITS</span>
            <div className="h-[12px] w-[12px] rounded-full bg-[#6b7280] shadow-[inset_0_0_0_2px_white]" />
            <div>
              <p className="text-[11px] font-bold text-[#1c1a17]">12-WEEK PROGRAM</p>
              <div className="text-[9px] text-[#4a443a]">
                <span className="mr-1 line-through opacity-60">$89.99</span>
                <span className="font-bold text-[#1c1a17]">$19.80</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.07</p>
              <p className="text-[13px] font-bold text-[#1c1a17]">$0.24</p>
              <p className="text-[8px] text-[#4a443a]">per day</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-full bg-[#1c1a17] px-[12px] py-[8px]">
          <span className="text-[11px] font-bold text-white">Get my plan</span>
          <span className="text-[10px] text-white">→</span>
        </div>
        <p className="mb-2 text-[8px] leading-[1.4] text-[#4a443a]">$19.80 today, then $89.99/12 wks. Cancel anytime.</p>
        <div className="px-2 py-[6px] text-center">
          <p className="text-[9px] leading-[1.4] text-[#1c1a17]">Visa · Mastercard · Amex · PayPal · Apple Pay</p>
        </div>
        <div className="px-2 py-[6px]">
          <p className="text-center text-[8px] uppercase tracking-wide text-[#4a443a]">What&apos;s included in your plan</p>
          <div className="mt-2 flex gap-2 overflow-hidden">
            {[
              ["Plan", "personalized training"],
              ["Coach", "1:1 coach consultation"],
              ["Tracking", "Progress and habit tracking"],
            ].map(([label], index) => (
              <div key={label} className={`min-w-[92px] rounded-[8px] border border-[#1c1a17] px-2 py-[6px] ${index === 0 ? "bg-[#DCEAEF]" : "opacity-70"}`}>
                <p className="text-[7px] uppercase tracking-wide text-[#4a443a]">{label}</p>
                <div className="mt-1 flex min-h-[44px] items-center justify-center rounded-[6px] border border-[#1c1a17]/30 text-[8px] uppercase tracking-wide text-[#4a443a]">
                  app image
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-1">
            <span className="h-1.5 w-4 rounded-full bg-[#1c1a17]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#1c1a17]/35" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#1c1a17]/35" />
          </div>
          <div className="mt-3 space-y-1.5">
            {[
              "Personalized training plan printable guide",
              "10-20 min workouts to get fit",
              "Progress and habit tracking",
              "Visible change phases from now to your goal",
              "Meal guidance built around your goal",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[8px] leading-[1.35] text-[#1c1a17]">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#1c1a17] text-[7px]">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px] text-center">
            <p className="text-[8px] uppercase tracking-wide text-[#4a443a]">Featured in</p>
            <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[8px] uppercase tracking-wide text-[#1c1a17] opacity-80">
              {["Mirror", "Sky Sports", "The Guardian", "University of Oregon"].map((logo) => (
                <span key={logo} className="text-center">
                  {logo}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px] text-center">
            <p className="text-[8px] uppercase tracking-wide text-[#4a443a]">Progress in the app</p>
            <div className="mt-2 flex min-h-[72px] items-center justify-center rounded-[6px] bg-[repeating-linear-gradient(45deg,transparent_0_5px,#1c1a1712_5px_6px),#fffdf6] text-[8px] uppercase tracking-wide text-[#4a443a]">
              app progress image
            </div>
          </div>
        </div>
        <div className="px-2 py-[6px]">
          <div className="rounded-[8px] border border-[#1c1a17]/20 px-2 py-[10px] text-center">
            <p className="text-[9px] uppercase tracking-wide text-[#4a443a]">Video testimonial</p>
            <div className="mt-2 flex min-h-[72px] items-center justify-center rounded-[6px] border border-[#1c1a17]/30 bg-[repeating-linear-gradient(45deg,transparent_0_5px,#1c1a1712_5px_6px),#fffdf6] text-[9px] uppercase tracking-wide text-[#4a443a]">
              ▶ before / after story
            </div>
            <p className="mt-2 text-[8px] leading-[1.4] text-[#4a443a]">
              Results vary by individual. These images are illustrative and not a guarantee of specific outcomes. Consult a healthcare provider before beginning any weight loss program.
            </p>
          </div>
        </div>
        <div className="px-2 py-[6px]">
          <div className="rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px]">
            <p className="text-center text-[8px] uppercase tracking-wide text-[#4a443a]">Choose your plan</p>
            <div className="mt-2 space-y-1.5">
              <div className="relative grid grid-cols-[14px_1fr_auto] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] bg-white px-2 py-[8px] opacity-75">
                <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#1c1a17] px-[5px] py-[1px] text-[7px] text-white">FEEL BETTER IN A WEEK</span>
                <div className="h-[12px] w-[12px] rounded-full border border-[#1c1a17]" />
                <div>
                  <p className="text-[11px] font-bold text-[#1c1a17]">WEEK PLAN</p>
                  <div className="text-[9px] text-[#4a443a]">
                    <span className="mr-1 line-through opacity-60">$19.99</span>
                    <span className="font-bold text-[#1c1a17]">$4.40</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#4a443a] line-through opacity-60">$2.86</p>
                  <p className="text-[13px] font-bold text-[#1c1a17]">$0.63</p>
                  <p className="text-[8px] text-[#4a443a]">per day</p>
                </div>
              </div>
              <div className="relative grid grid-cols-[14px_1fr_auto] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] bg-white px-2 py-[8px] opacity-75">
                <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#1c1a17] px-[5px] py-[1px] text-[7px] text-white">GET VISIBLE RESULTS</span>
                <div className="h-[12px] w-[12px] rounded-full border border-[#1c1a17]" />
                <div>
                  <p className="text-[11px] font-bold text-[#1c1a17]">MONTHLY PLAN</p>
                  <div className="text-[9px] text-[#4a443a]">
                    <span className="mr-1 line-through opacity-60">$39.99</span>
                    <span className="font-bold text-[#1c1a17]">$8.80</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.43</p>
                  <p className="text-[13px] font-bold text-[#1c1a17]">$0.31</p>
                  <p className="text-[8px] text-[#4a443a]">per day</p>
                </div>
              </div>
              <div className="relative grid grid-cols-[14px_1fr_auto] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] bg-white px-2 py-[9px] opacity-75">
                <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#1c1a17] px-[5px] py-[1px] text-[7px] text-white">GET MORE HEALTH BENEFITS</span>
                <div className="h-[12px] w-[12px] rounded-full bg-[#6b7280] shadow-[inset_0_0_0_2px_white]" />
                <div>
                  <p className="text-[12px] font-bold text-[#1c1a17]">12-WEEK PROGRAM</p>
                  <div className="text-[9px] text-[#4a443a]">
                    <span className="mr-1 line-through opacity-60">$89.99</span>
                    <span className="font-bold text-[#1c1a17]">$19.80</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.07</p>
                  <p className="text-[13px] font-bold text-[#1c1a17]">$0.24</p>
                  <p className="text-[8px] text-[#4a443a]">per day</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-full bg-[#1c1a17] px-[12px] py-[8px]">
              <span className="text-[11px] font-bold text-white">Get my plan</span>
              <span className="text-[10px] text-white">→</span>
            </div>
          </div>
          <div className="mt-2 rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px] text-center">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#1c1a17]">30 days</p>
            <p className="mt-1 text-[8px] leading-[1.35] text-[#4a443a]">Try the plan risk-free and request a refund within 30 days if it is not the right fit.</p>
          </div>
          <div className="mt-2 text-center text-[8px] leading-[1.4] text-[#4a443a]">
            <p>All of our payments are processed through Reverse Group Inc.</p>
            <p className="mt-2">1603 Capital Avenue</p>
            <p>Suite 413-D179</p>
            <p>Cheyenne, Wyoming 82001</p>
            <p>United States</p>
          </div>
          <div className="mt-2 flex justify-center gap-2">
            <button type="button" className="rounded-full border border-[#1c1a17]/20 px-3 py-[5px] text-[8px] uppercase tracking-wide text-[#4a443a]">
              Privacy
            </button>
            <button type="button" className="rounded-full border border-[#1c1a17]/20 px-3 py-[5px] text-[8px] uppercase tracking-wide text-[#4a443a]">
              Terms
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const reverseTechExperimentBMockup = (
    <>
      <div className="mx-auto mb-[10px] h-[8px] w-[80px] rounded-full bg-[#1c1a17]" />
      <div className={`${kalam.className} flex min-h-[580px] flex-col gap-[7px] rounded-[18px] p-[10px]`}>
        <div className="flex items-center justify-between rounded-[10px] border border-[#1c1a17] bg-white px-2 py-1 text-[10px] text-[#1c1a17]">
          <span className="font-semibold uppercase tracking-[0.16em]">Reverse Health</span>
          <span className="rounded-full bg-[#1c1a17] px-[10px] py-[4px] text-[10px] uppercase text-white">See my personalized plan</span>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="text-[20px] font-bold leading-tight text-[#1c1a17]">Get a full transformation in 12-weeks</p>
        </div>
        <div className="grid grid-cols-2 gap-[6px]">
          {[["Now", "30% body fat"], ["Your goal", "14% body fat"]].map(([label, cap]) => (
            <div key={label}>
              <div className="flex min-h-[90px] items-center justify-center rounded-[8px] border border-[#1c1a17] bg-[repeating-linear-gradient(45deg,transparent_0_5px,#1c1a1712_5px_6px),#fffdf6] p-[4px] text-center text-[9px] uppercase tracking-wide text-[#4a443a]">
                {label}
              </div>
              <p className="mt-1 text-center text-[9px] text-[#1c1a17]">{cap}</p>
              <p className="text-center text-[8px] text-[#4a443a]">Muscle strength {label === "Now" ? "regular" : "high"}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[16px] font-semibold text-[#1c1a17]">Pick how far you want to go</p>
        <div className="grid grid-cols-[1fr_68px] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] px-2 py-[7px] opacity-70">
          <div>
            <p className="text-[11px] font-bold text-[#1c1a17]">1-week · Kick-start - 78% off</p>
            <p className="text-[9px] text-[#4a443a]">
              <span className="mr-1 line-through opacity-60">$19.99</span>
              <span className="font-bold text-[#1c1a17]">$4.40</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-[#4a443a] line-through opacity-60">$2.86</p>
            <p className="text-[13px] font-bold text-[#1c1a17]">$0.63</p>
            <p className="text-[8px] text-[#4a443a]">per day</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_68px] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] px-2 py-[7px] opacity-70">
          <div>
            <p className="text-[11px] font-bold text-[#1c1a17]">4-week · Build habit - 78% off</p>
            <p className="text-[9px] text-[#4a443a]">
              <span className="mr-1">1 mo -</span>
              <span className="mr-1 line-through opacity-60">$39.99</span>
              <span className="font-bold text-[#1c1a17]">$8.80</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.43</p>
            <p className="text-[13px] font-bold text-[#1c1a17]">$0.31</p>
            <p className="text-[8px] text-[#4a443a]">per day</p>
          </div>
        </div>
        <div className="relative rounded-[10px] border-2 border-[#2a5cb8] bg-[#DCEAEF] px-2 py-[9px]">
          <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#2a5cb8] px-[5px] py-[1px] text-[7px] text-white">REACHES YOUR GOAL</span>
          <div className="grid grid-cols-[1fr_68px] items-center gap-[8px]">
            <div>
              <p className="text-[12px] font-bold text-[#1c1a17]">12-week · Full transformation - 78% off</p>
              <p className="text-[9px] text-[#4a443a]">
                <span className="mr-1">3 mo -</span>
                <span className="mr-1 line-through opacity-60">$89.99</span>
                <span className="font-bold text-[#1c1a17]">$19.80</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.07</p>
              <p className="text-[13px] font-bold text-[#1c1a17]">$0.24</p>
              <p className="text-[8px] text-[#4a443a]">per day</p>
            </div>
          </div>
          <div className="mt-2 rounded-[8px] border border-dashed border-[#1c1a17] bg-white/60 px-2 py-[5px] text-[10px] leading-[1.3] text-[#1c1a17]">
            🎁 1:1 coach consultation, included with 12-wk only
          </div>
        </div>
        <div className="flex items-center justify-between rounded-full bg-[#1c1a17] px-[12px] py-[8px]">
          <span className="text-[10px] uppercase text-white">12-WK - 78% off</span>
          <span className="text-[11px] font-bold uppercase text-white">See my personalized plan</span>
        </div>
        <div className="mt-2 rounded-[8px] border border-[#1c1a17]/30 px-2 py-[6px]">
          <p className="text-[8px] leading-[1.4] text-[#4a443a]">
            Without cancellation, before the selected plan ends, I accept that Reverse Health will automatically charge $89.99 every 12 weeks until I cancel. Taxes calculated at checkout. Cancel online via My Account.
          </p>
        </div>
        <div className="px-2 py-[6px] text-center">
          <p className="text-[9px] leading-[1.4] text-[#1c1a17]">Visa · Mastercard · Amex · PayPal · Apple Pay</p>
        </div>
        <div className="px-2 py-[6px]">
          <p className="text-center text-[8px] uppercase tracking-wide text-[#4a443a]">What&apos;s included in your plan</p>
          <div className="mt-2 flex gap-2 overflow-hidden">
            {[
              ["Plan", "personalized training"],
              ["Coach", "1:1 coach consultation"],
              ["Tracking", "Progress and habit tracking"],
            ].map(([label], index) => (
              <div key={label} className={`min-w-[92px] rounded-[8px] border border-[#1c1a17] px-2 py-[6px] ${index === 0 ? "bg-[#DCEAEF]" : "opacity-70"}`}>
                <p className="text-[7px] uppercase tracking-wide text-[#4a443a]">{label}</p>
                <div className="mt-1 flex min-h-[44px] items-center justify-center rounded-[6px] border border-[#1c1a17]/30 text-[8px] uppercase tracking-wide text-[#4a443a]">
                  app image
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-1">
            <span className="h-1.5 w-4 rounded-full bg-[#1c1a17]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#1c1a17]/35" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#1c1a17]/35" />
          </div>
          <div className="mt-3 space-y-1.5">
            {[
              "Personalized training plan printable guide",
              "10-20 min workouts to get fit",
              "Progress and habit tracking",
              "Visible change phases from now to your goal",
              "Meal guidance built around your goal",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[8px] leading-[1.35] text-[#1c1a17]">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#1c1a17] text-[7px]">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 py-[6px]">
          <div className="rounded-[8px] border border-[#1c1a17]/20 px-2 py-[10px] text-center">
            <p className="text-[9px] uppercase tracking-wide text-[#4a443a]">Testimonial</p>
            <div className="mt-2 flex min-h-[72px] items-center justify-center rounded-[6px] border border-[#1c1a17]/30 text-[9px] uppercase tracking-wide text-[#4a443a]">image</div>
          </div>
          <p className="mt-2 text-[8px] leading-[1.4] text-[#4a443a]">
            Results vary by individual. These images are illustrative and not a guarantee of specific outcomes. Consult a healthcare provider before beginning any weight loss program.
          </p>
        </div>
        <div className="px-2 py-[6px]">
          <p className="text-center text-[8px] uppercase tracking-wide text-[#4a443a]">Featured in</p>
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[8px] uppercase tracking-wide text-[#1c1a17] opacity-80">
            {["Mirror", "Sky Sports", "The Guardian", "University of Oregon"].map((logo) => (
              <span key={logo} className="text-center">
                {logo}
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-[8px] border border-[#1c1a17]/20 px-2 py-[6px] text-center">
              <p className="text-[11px] font-bold text-[#1c1a17]">4.8</p>
              <p className="text-[8px] text-[#4a443a]">rating</p>
            </div>
            <div className="rounded-[8px] border border-[#1c1a17]/20 px-2 py-[6px] text-center">
              <p className="text-[11px] font-bold text-[#1c1a17]">900K+</p>
              <p className="text-[8px] text-[#4a443a]">downloads</p>
            </div>
          </div>
          <p className="mt-2 text-center text-[8px] text-[#4a443a]">120K+ reviews across app stores</p>
          <div className="mt-2 rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px] text-center">
            <p className="text-[10px] tracking-[0.12em] text-[#1c1a17]">★★★★★</p>
            <p className="mt-3 text-[8px] leading-[1.4] text-[#1c1a17]">“The plan finally made the next step feel clear and worth it.”</p>
          </div>
        </div>
        <div className="px-2 py-[6px]">
          <div className="rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px]">
            <p className="text-center text-[8px] uppercase tracking-wide text-[#4a443a]">Choose your plan</p>
            <div className="mt-2 space-y-1.5">
              <div className="grid grid-cols-[1fr_68px] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] px-2 py-[7px] opacity-70">
                <div>
                  <p className="text-[11px] font-bold text-[#1c1a17]">1-week · Kick-start - 78% off</p>
                  <p className="text-[9px] text-[#4a443a]">
                    <span className="mr-1 line-through opacity-60">$19.99</span>
                    <span className="font-bold text-[#1c1a17]">$4.40</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#4a443a] line-through opacity-60">$2.86</p>
                  <p className="text-[13px] font-bold text-[#1c1a17]">$0.63</p>
                  <p className="text-[8px] text-[#4a443a]">per day</p>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_68px] items-center gap-[8px] rounded-[10px] border border-[#1c1a17] px-2 py-[7px] opacity-70">
                <div>
                  <p className="text-[11px] font-bold text-[#1c1a17]">4-week · Build habit - 78% off</p>
                  <p className="text-[9px] text-[#4a443a]">
                    <span className="mr-1">1 mo -</span>
                    <span className="mr-1 line-through opacity-60">$39.99</span>
                    <span className="font-bold text-[#1c1a17]">$8.80</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.43</p>
                  <p className="text-[13px] font-bold text-[#1c1a17]">$0.31</p>
                  <p className="text-[8px] text-[#4a443a]">per day</p>
                </div>
              </div>
              <div className="relative rounded-[10px] border-2 border-[#2a5cb8] bg-[#DCEAEF] px-2 py-[9px]">
                <span className="absolute -top-[8px] left-[8px] rounded-[4px] bg-[#2a5cb8] px-[5px] py-[1px] text-[7px] text-white">REACHES YOUR GOAL</span>
                <div className="grid grid-cols-[1fr_68px] items-center gap-[8px]">
                  <div>
                    <p className="text-[12px] font-bold text-[#1c1a17]">12-week · Full transformation - 78% off</p>
                    <p className="text-[9px] text-[#4a443a]">
                      <span className="mr-1">3 mo -</span>
                      <span className="mr-1 line-through opacity-60">$89.99</span>
                      <span className="font-bold text-[#1c1a17]">$19.80</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-[#4a443a] line-through opacity-60">$1.07</p>
                    <p className="text-[13px] font-bold text-[#1c1a17]">$0.24</p>
                    <p className="text-[8px] text-[#4a443a]">per day</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-full bg-[#1c1a17] px-[12px] py-[8px]">
              <span className="text-[10px] uppercase text-white">12-WK - 78% off</span>
              <span className="text-[11px] font-bold uppercase text-white">See my personalized plan</span>
            </div>
          </div>
          <div className="mt-2 rounded-[8px] border border-[#1c1a17]/20 px-2 py-[8px] text-center">
            <p className="text-[9px] font-semibold text-[#1c1a17]">30 days</p>
            <p className="mt-2 text-[8px] leading-[1.4] text-[#1c1a17]">Get 100% of your money back if you don&apos;t see visible results after following our program!</p>
            <p className="mt-3 text-[8px] underline text-[#4a443a]">Money-back policy</p>
          </div>
          <div className="mt-2 text-center text-[8px] leading-[1.4] text-[#4a443a]">
            <p>All of our payments are processed through Reverse Group Inc.</p>
            <p className="mt-2">1603 Capital Avenue</p>
            <p>Suite 413-D179</p>
            <p>Cheyenne, Wyoming 82001</p>
            <p>United States</p>
          </div>
          <div className="mt-2 flex justify-center gap-2">
            <button type="button" className="rounded-full border border-[#1c1a17]/20 px-3 py-[5px] text-[8px] uppercase tracking-wide text-[#4a443a]">
              Privacy
            </button>
            <button type="button" className="rounded-full border border-[#1c1a17]/20 px-3 py-[5px] text-[8px] uppercase tracking-wide text-[#4a443a]">
              Terms
            </button>
          </div>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    if (!lightboxImage && !activeExperimentModal) {
      document.body.style.overflow = "";
      setLightboxZoom(1);
      return;
    }

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeExperimentModal) {
        closeExperimentModal();
      }

      if (event.key === "Escape" && lightboxImage) {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeExperimentModal, lightboxImage]);

  useEffect(() => {
    if (!activeExperimentModal) {
      setExperimentModalBaseHeight(0);
      return;
    }

    const mockupElement = experimentModalMockupRef.current;
    if (!mockupElement) {
      return;
    }

    const updateDimensions = () => {
      setExperimentModalBaseHeight(mockupElement.offsetHeight);
    };

    updateDimensions();

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(updateDimensions)
      : null;

    resizeObserver?.observe(mockupElement);
    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [activeExperimentModal]);

  useEffect(() => {
    if (caseStudy?.slug !== "calendar-keeper") {
      setShowStickyCalendarTabs(false);
      return;
    }

    const updateStickyCalendarTabs = () => {
      const tabsElement = calendarKeeperTabsRef.current;
      setShowStickyCalendarTabs(Boolean(tabsElement && tabsElement.getBoundingClientRect().top <= REVERSETECH_STICKY_HEADER_OFFSET));
    };

    updateStickyCalendarTabs();
    window.addEventListener("scroll", updateStickyCalendarTabs, { passive: true });
    window.addEventListener("resize", updateStickyCalendarTabs);
    return () => {
      window.removeEventListener("scroll", updateStickyCalendarTabs);
      window.removeEventListener("resize", updateStickyCalendarTabs);
    };
  }, [caseStudy?.slug]);

  useEffect(() => {
    if (caseStudy?.slug !== "reversetech") {
      setShowStickyTaskTabs(false);
      return;
    }

    const updateStickyTaskTabs = () => {
      const tabsElement = reversetechTaskTabsRef.current;
      if (!tabsElement) {
        setShowStickyTaskTabs(false);
        return;
      }

      setShowStickyTaskTabs(
        tabsElement.getBoundingClientRect().top <= REVERSETECH_STICKY_HEADER_OFFSET
      );
    };

    updateStickyTaskTabs();
    window.addEventListener("scroll", updateStickyTaskTabs, { passive: true });
    window.addEventListener("resize", updateStickyTaskTabs);

    return () => {
      window.removeEventListener("scroll", updateStickyTaskTabs);
      window.removeEventListener("resize", updateStickyTaskTabs);
    };
  }, [caseStudy?.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" behavior="reveal" />
        <section className="mx-auto max-w-[1200px] px-6 py-20 text-sm text-[#5c7792]">{translate("caseStudy.loading")}</section>
      </main>
    );
  }

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!caseStudy?.password) {
      return;
    }

    if (enteredPassword.trim() === caseStudy.password) {
      setIsUnlocked(true);
      setPasswordError(null);
      return;
    }

    setPasswordError(translate("caseStudy.incorrectPassword"));
  }

  if (!caseStudy || caseStudy.status !== "published") {
    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" behavior="reveal" />
        <section className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-center justify-center px-6 py-20 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#0E6FB4]">
            Case Study Unavailable
          </p>
          <h1 className="mt-6 font-inter text-[44px] leading-[1.05] text-[#0e2951]">
            This case study is no longer published
          </h1>
          <a
            href={withBasePath("/projects")}
            className="mt-8 inline-flex rounded-[24px] bg-[#1183D0] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e75b8]"
          >
            {translate("caseStudy.backToProjects")}
          </a>
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (caseStudy.password && !isUnlocked) {
    const heroImage = resolveProjectHeroImage(caseStudy.slug, caseStudy.images.hero);

    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" behavior="reveal" />
        <section
          className="relative overflow-hidden pt-8 pb-20"
          style={{ background: HOME_BANNER_GRADIENT }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: HOME_BANNER_GRADIENT_OVERLAY }}
          />
          <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 xl:px-20">
            <div className="mb-6 flex items-center gap-3 text-sm">
              <a href={withBasePath("/")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">{translate("caseStudy.home")}</a>
              <span className="text-[#b8cce0]">›</span>
              <a href={withBasePath("/projects")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">{translate("caseStudy.projects")}</a>
              <span className="text-[#b8cce0]">›</span>
              <span className="font-semibold text-[#0e2951]">{caseStudy.title}</span>
            </div>

            <div className="relative rounded-[0]">
              <div className="relative mx-auto max-w-[640px] px-6 py-12 text-center md:px-10">
                <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#0E6FB4]">
                  {translate("caseStudy.passwordProtected")}
                </p>
                <h1 className="mt-6 font-inter text-[40px] leading-[1.08] text-[#0e2951]">
                  {caseStudy.title}
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.75] text-[#5c7792]">
                  {caseStudy.tagline}
                </p>
                <p className="mx-auto mt-4 max-w-[540px] text-sm leading-[1.7] text-[#5c7792]">
                  {translate("caseStudy.lockedPlaceholderNotice")}
                </p>

                <form onSubmit={handlePasswordSubmit} className="mx-auto mt-10 max-w-[420px] text-left">
                  <label htmlFor="project-password" className="mb-3 block text-sm font-semibold text-[#0e2951]">
                    {translate("caseStudy.enterPassword")}
                  </label>
                  <Input
                    id="project-password"
                    type="password"
                    value={enteredPassword}
                    onChange={(event) => {
                      setEnteredPassword(event.target.value);
                      if (passwordError) {
                        setPasswordError(null);
                      }
                    }}
                    placeholder={translate("caseStudy.enterPassword")}
                    autoComplete="current-password"
                  />
                  {passwordError ? (
                    <p className="mt-3 text-sm text-[#d60060]">{passwordError}</p>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button type="submit" size="sm">
                      {translate("caseStudy.unlockCaseStudy")}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={withBasePath("/projects")}>{translate("caseStudy.backToProjects")}</Link>
                    </Button>
                  </div>
	                </form>
              </div>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  // The detailed English art-direction contains many project-specific interface
  // mockups. Spanish and German use this shared composition so every visible
  // narrative comes from the required localized case-study payload.
  const caseStudyLanguage: Language = language;
  if (hasLocalizedCaseStudyPayload(caseStudyLanguage)) {
    return <LocalizedCaseStudyOverview caseStudy={caseStudy} />;
  }

  const otherProjects = caseStudies
    .filter(
      (project) =>
        project.slug !== caseStudy.slug &&
        project.status === "published" &&
        !isHiddenCaseStudySlug(project.slug),
    )
    .slice(0, 3)
    .map((project) => ({
      ...project,
      cardId: resolveHomeCardId(project.slug),
      previewImage: resolveHomeCardImage(project.slug, project.images.cover || project.images.hero || ""),
      background: RELATED_PROJECT_BACKGROUNDS[project.slug],
    }));
  const findBlock = (id: string) => caseStudy.content_blocks?.find((block) => block.id === id);
  const overviewBlock = findBlock("overview");
  const taskDetailBlock = findBlock("task-1");
  const storyBlocks = ["situation", "task", "actions", "research"]
    .map((id) => findBlock(id))
    .filter(isContentBlock);
  const visibleStoryBlocks =
    caseStudy.slug === "flock-accessibility-system"
      ? storyBlocks.filter((block) => block.id !== "research" && block.id !== "actions")
      : caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG
      ? storyBlocks.filter((block) => block.id !== "research")
      : caseStudy.slug === "i9-everify-integration"
      ? storyBlocks.filter((block) => block.id !== "research")
      : caseStudy.slug === "protecta"
      ? storyBlocks.filter((block) => block.id !== "research" && block.id !== "task" && block.id !== "actions")
      : storyBlocks;
  const researchBlock = findBlock("research");
  const resultBlock = findBlock("impact");
  const sourcesBlock = findBlock("sources");
  const ctaVariantsBlock = findBlock("cta-variants");
  const contentVariantsBlock = findBlock("content-variants");
  const resultRows = getPayloadRows(resultBlock?.payload, "rows");
  const resultInsights = getPayloadList(resultBlock?.payload, "insights");
  const primaryResultInsights = resultInsights;
  const visiblePrimaryResultInsights = primaryResultInsights.filter((item) => !shouldHideInsight(item));
  const resultOpportunities = getPayloadList(resultBlock?.payload, "opportunities");
  const projectedImprovements = getPayloadList(resultBlock?.payload, "projected");
  const successMetrics = getPayloadList(resultBlock?.payload, "successMetrics");
  const sourceItems = getPayloadList(sourcesBlock?.payload, "items");
  const sourceEntries =
    sourcesBlock?.payload &&
    typeof sourcesBlock.payload === "object" &&
    Array.isArray(sourcesBlock.payload.sources)
      ? (sourcesBlock.payload.sources as Array<Record<string, unknown>>)
      : [];
  const sourceEntriesWithOverrides: Array<Record<string, unknown>> =
    caseStudy.slug === "reversetech"
      ? [...sourceEntries, ...getReverseTechExtraSources(language).map((item) => ({ ...item }))]
      : sourceEntries;
  const sourceList = (
    <>
      {sourceEntriesWithOverrides.length
        ? sourceEntriesWithOverrides.map((item, index) => (
          <div key={`${item.title}-${index}`} className="space-y-1">
            <p className="font-inter text-[14px] leading-[1.6] text-[#0e2951]">
              <span className="font-semibold text-[#0E6FB4]">{index + 1}.</span>{" "}
              <a
                href={typeof item.url === "string" ? item.url : "#"}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-[#1183D0]/40 underline-offset-3 transition-colors hover:text-[#0E6FB4]"
              >
                {typeof item.title === "string" ? item.title : ""}
              </a>
            </p>
            <p className="font-inter text-[13px] leading-[1.6] text-[#5c7792]">
              {typeof item.description === "string" ? item.description : ""}
            </p>
            {typeof item.secondaryUrl === "string" && typeof item.secondaryTitle === "string" ? (
              <p className="font-inter text-[12px] leading-[1.5] text-[#5c7792]">
                <a
                  href={item.secondaryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline decoration-[#1183D0]/40 underline-offset-2 transition-colors hover:text-[#0E6FB4]"
                >
                  {item.secondaryTitle}
                </a>
              </p>
            ) : null}
          </div>
        ))
        : sourceItems.map((item, index) => (
          <p key={item} className="font-inter text-[13px] leading-[1.6] text-[#5c7792]">
            <span className="font-semibold text-[#0E6FB4]">{index + 1}.</span> {item}
          </p>
        ))}
    </>
  );
  const ctaVariants =
    ctaVariantsBlock?.payload &&
    typeof ctaVariantsBlock.payload === "object" &&
    Array.isArray(ctaVariantsBlock.payload.variants)
      ? (ctaVariantsBlock.payload.variants as Array<Record<string, unknown>>)
      : [];
  const contentVariants =
    contentVariantsBlock?.payload &&
    typeof contentVariantsBlock.payload === "object" &&
    Array.isArray(contentVariantsBlock.payload.variants)
      ? (contentVariantsBlock.payload.variants as Array<Record<string, unknown>>)
      : [];
  const highlightMetrics =
    caseStudy.slug === "nayya-ai-benefits"
      ? NAYYA_HIGHLIGHT_METRICS[language]
      : caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG
      ? caseStudy.metrics.slice(0, 3)
      : caseStudy.metrics.slice(0, 3);
  const problemMetrics =
    caseStudy.slug === "nayya-ai-benefits"
      ? NAYYA_PROBLEM_METRICS[language]
      : caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG
      ? CONFIDENTIAL_PROBLEM_METRICS
      : caseStudy.metrics.slice(0, 3);
  const designStrategy = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_DESIGN_STRATEGY[language] : caseStudy.design_strategy;
  const methodologyName = caseStudy.methodology.name;
  const reflections = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_REFLECTIONS[language] : caseStudy.reflections;
  const projectYear = caseStudy.year;
  const isNayyaCaseStudy = caseStudy.slug === "nayya-ai-benefits";
  // The editorial case-study layout is the single design language for every
  // locale, so Spanish and German get the same page as English.
  const usesNayyaVisualStyle = true;
  // Flock, ReverseTech and Calendar Keeper build their own metric and structure
  // sections from bespoke content blocks, so the shared ones are skipped for them.
  const showsSharedMetricsSection =
    caseStudy.slug !== "flock-accessibility-system" &&
    caseStudy.slug !== "reversetech" &&
  caseStudy.slug !== "calendar-keeper" &&
  caseStudy.slug !== "protecta";
  const showsSharedStructureSection = caseStudy.slug !== "calendar-keeper";
  const editorialTitle = splitNayyaHeroTitle(
    caseStudy.title,
    language,
    EDITORIAL_TITLE_ACCENT_WORDS[caseStudy.slug]?.[language],
  );
  const heroImage = resolveProjectHeroImage(caseStudy.slug, caseStudy.images.hero);
  const homeCoverImage = resolveHomeCardImage(caseStudy.slug, caseStudy.images.cover || caseStudy.images.hero);
  const designProposalTitle = translate("caseStudy.designProposal");
  const activeProtectaStorybookComponent =
    PROTECTA_STORYBOOK[localizedLanguage].components.find((component) => component.url === activeProtectaStorybookUrl) ??
    PROTECTA_STORYBOOK[localizedLanguage].components[0];
  const hypothesisIndex = caseStudy.slug === "reversetech" ? designStrategy.indexOf(translate("caseStudy.hypothesis3Marker")) : -1;
  const designNotesIndex = caseStudy.slug === "reversetech" ? designStrategy.indexOf(translate("caseStudy.aFewNotes")) : -1;
  const designProposalLinks =
    caseStudy.slug === "reversetech"
      ? designStrategy.map((item) => parseStandaloneMarkdownLink(item)).filter(isMarkdownLink)
      : [];
  const designProposalIntro =
    caseStudy.slug === "reversetech" && hypothesisIndex >= 0
      ? designStrategy.slice(0, hypothesisIndex).filter((item) => !parseStandaloneMarkdownLink(item))
      : designStrategy.filter((item) => !parseStandaloneMarkdownLink(item));
  const hypothesisItems =
    caseStudy.slug === "reversetech" && hypothesisIndex >= 0
      ? designStrategy
          .slice(hypothesisIndex + 1, designNotesIndex >= 0 ? designNotesIndex : undefined)
          .filter((item) => !parseStandaloneMarkdownLink(item))
      : [];
  const designProposalNotes =
    caseStudy.slug === "reversetech" && designNotesIndex >= 0
      ? designStrategy.slice(designNotesIndex + 1)
      : [];
  const taskDetailHeading =
    taskDetailBlock?.payload &&
    typeof taskDetailBlock.payload === "object" &&
    typeof taskDetailBlock.payload.heading === "string"
      ? taskDetailBlock.payload.heading
      : null;
  const reverseTechTaskDetailHeading =
    caseStudy.slug === "reversetech" && taskDetailHeading === translate("caseStudy.funnelDiagnosisFull")
      ? translate("caseStudy.funnelDiagnosisShort")
      : taskDetailHeading;
  const taskDetailTable =
    taskDetailBlock?.payload &&
    typeof taskDetailBlock.payload === "object" &&
    Array.isArray(taskDetailBlock.payload.table)
      ? (taskDetailBlock.payload.table as Array<Record<string, unknown>>)
      : [];
  const taskDetailAnalyses =
    taskDetailBlock?.payload &&
    typeof taskDetailBlock.payload === "object" &&
    Array.isArray(taskDetailBlock.payload.analyses)
      ? (taskDetailBlock.payload.analyses as Array<Record<string, unknown>>)
      : [];
  const reverseTechHypothesis3Accordion = (
    <ContentPanel>
      <button
        type="button"
        onClick={() => toggleHypothesis("rt-hypothesis-2")}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div>
          <p className="mb-2 font-inter text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">
            {translate("caseStudy.personalizedFlowVariant")}
          </p>
          <h3 className="font-inter text-[22px] font-semibold leading-[1.3] text-[#0e2951]">
            {translate("caseStudy.patternApplication")}
          </h3>
        </div>
        {openHypothesisIds.includes("rt-hypothesis-2") ? <Minus className="h-5 w-5 text-[#0E6FB4]" /> : <Plus className="h-5 w-5 text-[#0E6FB4]" />}
      </button>
      {openHypothesisIds.includes("rt-hypothesis-2") ? (
        <div className="border-t border-[#d7e8f7] px-6 pb-6 pt-6">
            <div className="space-y-8 text-left">
              <div className="space-y-4">
                {caseStudy.slug === "reversetech" ? (
                  <>
                    <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                      {translate("caseStudy.figmaFlowIntro")}
                    </p>
                    <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                      {translate("caseStudy.figmaFlowIntro2")}
                    </p>
                  </>
                ) : (
                  hypothesisItems.map((item) => (
                    <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                      {item}
                    </p>
                  ))
                )}
              </div>
            <div className="space-y-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">
                {translate("caseStudy.prototypePortion")}
              </p>
              <p className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                {translate("caseStudy.browseMobileFlow")}
              </p>
            </div>
            <ContentPanel className="shadow-[0_24px_64px_rgba(17,131,208,0.10)]">
              <iframe
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                title="Reverse Tech Flow from Figma"
                src={REVERSE_TECH_FLOW_EMBED}
                width="800"
                height="450"
                className="w-full"
                allowFullScreen
              />
            </ContentPanel>
          </div>
        </div>
      ) : null}
    </ContentPanel>
  );

  const reverseTechToolsSection = (
    <div className="grid gap-4 px-0 py-6 md:grid-cols-2">
        {[
          {
            label: translate("caseStudy.toolsDataAnalysis"),
            tool: "Notebook LM, Claude, and ChatGPT",
            logos: [
              { label: "Claude", src: "/images/tools/anthropic.svg" },
              { label: "ChatGPT", src: "/images/tools/openai.svg" },
              { label: "Notebook LM" },
            ],
            use: translate("caseStudy.toolsDataAnalysisUse"),
            optimize: translate("caseStudy.toolsDataAnalysisOptimize"),
            imageSrc: "/images/projects/Reversetech/notebook-lm.png",
          },
          {
            label: translate("caseStudy.toolsIdeation"),
            tool: "Paper, Open Design, Claude Design, and Figma",
            logos: [
              { label: "Claude Design", src: "/images/tools/anthropic.svg" },
              { label: "Figma", src: "/images/tools/figma.svg" },
              { label: "Open Design" },
              { label: "Paper" },
            ],
            use: translate("caseStudy.toolsIdeationUse"),
            optimize: translate("caseStudy.toolsIdeationOptimize"),
            imageSrc: "/images/projects/Reversetech/claude-design.png",
          },
          {
            label: translate("caseStudy.toolsWriting"),
            tool: "ChatGPT + grammarly + manual editing",
            logos: [{ label: "ChatGPT", src: "/images/tools/openai.svg" }, { label: "Grammarly" }],
            use: translate("caseStudy.toolsWritingUse"),
            optimize: translate("caseStudy.toolsWritingOptimize"),
            imageSrc: "/images/projects/Reversetech/claude-code.png",
          },
          {
            label: translate("caseStudy.toolsPolishDelivery"),
            tool: "Figma, GitHub, and Codex",
            logos: [
              { label: "Figma", src: "/images/tools/figma.svg" },
              { label: "GitHub Copilot", src: "/images/tools/githubcopilot.svg" },
              { label: "Codex" },
            ],
            use: translate("caseStudy.toolsPolishDeliveryUse"),
            imageSrc: "/images/projects/Reversetech/figma-screen.png",
          },
        ].map((item, index) => (
          <div
            key={item.label}
            className="rounded-[20px] border border-[#d7e8f7] bg-white p-5 shadow-[0_14px_34px_rgba(14,41,81,0.06)]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0E6FB4]">
              {item.label}
            </p>
            <p className="mt-3 font-inter text-[16px] font-semibold text-[#0e2951]">
              {item.tool}
            </p>
            <p className="mt-3 font-inter text-[14px] leading-[1.7] text-[#5c7792]">
              {item.use}
            </p>
            <p className="mt-3 font-inter text-[14px] leading-[1.7] text-[#5c7792]">
              {item.optimize}
            </p>
            {"imageSrc" in item && item.imageSrc ? (
              <button
                type="button"
                onClick={() =>
                  setLightboxImage({
                    src: withBasePath(item.imageSrc),
                    alt: `${item.tool} preview`,
                  })
                }
                className="mt-5 block w-full overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-[#f8fbff] text-left transition-transform hover:scale-[1.01]"
              >
                <img
                  src={withBasePath(item.imageSrc)}
                  alt={`${item.tool} preview`}
                  className="h-auto w-full object-contain"
                />
              </button>
            ) : null}
            {"logos" in item && item.logos ? (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {item.logos.map((logo) => (
                  <span
                    key={logo.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d7e8f7] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-semibold text-[#0e2951]"
                  >
                    {"src" in logo && logo.src ? (
                      <img
                        src={withBasePath(logo.src)}
                        alt={logo.label}
                        className="h-4 w-4 object-contain"
                      />
                    ) : (
                      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e0f2fe] px-1 text-[9px] font-bold text-[#0369a1]">
                        {logo.label.slice(0, 1)}
                      </span>
                    )}
                    <span>{logo.label}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );

  return (
    <main data-case-study={caseStudy.slug} className={`bg-white text-[#3c3e3f] ${usesNayyaVisualStyle ? "overflow-x-clip" : "overflow-x-hidden"}`}>
      <SiteHeader active="Projects" behavior="reveal" />

      <div
        className="relative overflow-hidden"
        style={{ background: usesNayyaVisualStyle ? "#faf8f7" : HOME_BANNER_GRADIENT }}
      >
        {!usesNayyaVisualStyle ? (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: HOME_BANNER_GRADIENT_OVERLAY }}
          />
        ) : null}
        <div className={`relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-6 pt-6 text-sm md:px-10 xl:px-20 ${usesNayyaVisualStyle ? "text-[#5c5960]" : ""}`}>
          <a href={withBasePath("/")} className={usesNayyaVisualStyle ? "text-[#451044] transition-colors hover:text-[#0E6FB4]" : "text-[#5c7792] transition-colors hover:text-[#0e2951]"}>{translate("caseStudy.home")}</a>
          <span className={usesNayyaVisualStyle ? "text-[#aaa5aa]" : "text-[#b8cce0]"}>›</span>
          <a href={withBasePath("/projects")} className={usesNayyaVisualStyle ? "transition-colors hover:text-[#0E6FB4]" : "text-[#5c7792] transition-colors hover:text-[#0e2951]"}>{translate("caseStudy.projects")}</a>
          <span className={usesNayyaVisualStyle ? "text-[#aaa5aa]" : "text-[#b8cce0]"}>›</span>
          <span className={`min-w-0 break-words font-semibold ${usesNayyaVisualStyle ? "text-[#141114]" : "text-[#0e2951]"}`}>{caseStudy.title}</span>
        </div>

        <section className={`relative mx-auto max-w-[1200px] px-6 pb-0 md:px-10 xl:px-20 ${usesNayyaVisualStyle ? "pt-12" : "pt-16"}`}>
          <div className={`mx-auto pb-4 ${usesNayyaVisualStyle ? "max-w-full" : "max-w-[1040px] rounded-[0] px-3"}`}>
            <div className={`mb-6 ${usesNayyaVisualStyle ? "text-left" : "text-center"}`}>
              <div className={`relative py-6 ${usesNayyaVisualStyle ? "max-w-[1040px]" : "mx-auto max-w-[760px] px-5 sm:px-8"}`}>
                <p className={`mb-3 font-inter ${usesNayyaVisualStyle ? "inline-flex rounded-full bg-[#f8df36] px-4 py-2 text-xs font-semibold text-[#141114]" : "text-[13px] uppercase tracking-[3px] text-[#5c7792]"}`}>
                  {caseStudy.industry ?? translate("caseStudy.caseStudyLabel")}
                </p>
                <h1 className={`mb-5 font-inter font-bold leading-[0.98] ${usesNayyaVisualStyle ? "max-w-[1000px] text-[clamp(2.5rem,5.5vw,4.5rem)] tracking-[-0.055em] text-[#141114]" : "text-[36px] leading-[1.15] text-[#0e2951] md:text-[44px]"}`}>
                  {usesNayyaVisualStyle ? (
                    caseStudy.slug === "reversetech" && language === "en" ? (
                      <>
                        Health Funnel
                        <span className="block font-playfair font-normal italic tracking-[-0.045em]">Optimization</span>
                      </>
                    ) : caseStudy.slug === "flock-accessibility-system" || caseStudy.slug === "i9-everify-integration" || caseStudy.slug === "protecta" ? (
                      <>
                        {editorialTitle.lead}{" "}
                        <span className="block font-playfair font-normal italic tracking-[-0.045em]">
                          {editorialTitle.accent}
                        </span>
                      </>
                    ) : (
                    <>
                      {editorialTitle.lead}{" "}
                      {editorialTitle.accent ? (
                        <span className="font-playfair font-normal italic tracking-[-0.045em]">
                          {editorialTitle.accent}
                        </span>
                      ) : null}
                    </>
                    )
                  ) : caseStudy.title}
                </h1>
                <p className={`break-words leading-[1.55] ${usesNayyaVisualStyle ? "mt-7 max-w-full text-[clamp(1rem,1.5vw,1.25rem)] text-[#5c5960] lg:w-3/5" : "text-[16px] text-[#5c7792]"}`}>{caseStudy.tagline}</p>
                {usesNayyaVisualStyle ? (
                  <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#5c5960]" aria-label="Project details">
                    {[
                      String(projectYear ?? ""),
                      caseStudy.role ?? "",
                      `${translate("caseStudy.client")}: ${caseStudy.client_context ?? caseStudy.company ?? ""}`,
                    ]
                      .filter(Boolean)
                      .map((detail, index) => (
                        <span key={`${detail}-${index}`} className="inline-flex items-center gap-3">
                          {index > 0 ? <span aria-hidden="true">·</span> : null}
                          <span>{detail}</span>
                        </span>
                      ))}
                  </p>
                ) : null}
              </div>
            </div>

            {!usesNayyaVisualStyle ? (
              <div className="relative mt-10 flex flex-col items-center gap-8 pt-8 text-center">
                <div className="grid w-full max-w-[760px] justify-items-center gap-8 md:grid-cols-3 md:items-center">
                  <div className="text-center">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">{translate("caseStudy.year")}</p>
                    <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{projectYear ?? ""}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">{translate("caseStudy.role")}</p>
                    <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{caseStudy.role ?? ""}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">{translate("caseStudy.client")}</p>
                    <p className="mt-1 text-[14px] font-medium text-[#0e2951]">
                      {caseStudy.slug === "reversetech" ? "Reverse Tech" : caseStudy.client_context ?? caseStudy.company}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      {showsSharedMetricsSection ? (
        <section className={`mx-auto max-w-[1200px] px-6 md:px-10 xl:px-20 ${usesNayyaVisualStyle ? "bg-white" : ""} ${caseStudy.slug === "i9-everify-integration" ? "py-8" : "py-16"}`}>
          <div className={`mx-auto ${usesNayyaVisualStyle ? "max-w-full" : "max-w-[1040px]"}`}>
            <div className={`grid gap-12 ${usesNayyaVisualStyle ? "md:grid-cols-3 md:gap-0" : "text-center md:grid-cols-3"}`}>
              {highlightMetrics.map((metric, index) => (
                usesNayyaVisualStyle ? (
                  caseStudy.slug === "i9-everify-integration" ? (
                  <article
                    key={`${metric.label}-${metric.value}`}
                    className={`flex min-h-[150px] flex-col md:min-h-[220px] md:px-10 ${index > 0 ? "md:border-l md:border-[#d7d2d3]" : "md:pl-0"} ${index === highlightMetrics.length - 1 ? "md:pr-0" : ""}`}
                  >
                    <p className="text-[15px] font-semibold tracking-[0.04em] text-[#0E6FB4]">{metric.context ?? metric.value}</p>
                    <p className="mt-4 max-w-[30ch] text-[18px] leading-[1.45] text-[#5c5960]">{metric.label}</p>
                    <div className="mt-6 flex items-end justify-between gap-2">
                      <p className="text-[clamp(2.1rem,3.3vw,4rem)] font-bold leading-[0.88] tracking-[-0.065em] text-[#090909]">
                        {metric.value}
                      </p>
                      <ArrowUp aria-hidden="true" className="mb-1 size-7 shrink-0 text-[#090909] sm:size-8" strokeWidth={2} />
                    </div>
                  </article>
                  ) : (
                  <article
                    key={`${metric.label}-${metric.value}`}
                    className={`flex min-h-[190px] flex-col md:min-h-[300px] md:px-10 ${index > 0 ? "md:border-l md:border-[#d7d2d3]" : "md:pl-0"} ${index === highlightMetrics.length - 1 ? "md:pr-0" : ""}`}
                  >
                    <p className="text-[15px] font-semibold tracking-[0.04em] text-[#0E6FB4]">{metric.label}</p>
                    {metric.context ? (
                      <p className="mt-6 max-w-[30ch] text-[18px] leading-[1.45] text-[#5c5960]">
                        {metric.context}
                      </p>
                    ) : null}
                    <div className="relative mt-auto mb-8 flex items-end justify-between gap-2 pt-5">
                      <p className="text-[clamp(2.1rem,3.3vw,4rem)] font-bold leading-[0.88] tracking-[-0.065em] text-[#090909]">
                        {metric.value}
                      </p>
                      <ArrowUp aria-hidden="true" className="mb-1 size-7 shrink-0 text-[#090909] sm:size-8" strokeWidth={2} />
                    </div>
                  </article>
                  )
                ) : (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className={`relative px-4 md:px-8 ${index < 2 ? "after:absolute after:right-0 after:top-1/2 after:h-24 after:w-px after:-translate-y-1/2 after:bg-[#d7e8f7] after:content-['']" : ""}`}
                  >
                    <p className="text-[46px] font-bold leading-none text-[#0E6FB4]">{metric.value}</p>
                    <p className="mt-5 text-[16px] leading-[1.625em] text-[#5c7792]">{metric.label}</p>
                    {metric.context ? <p className="mt-3 text-[14px] leading-[1.6] text-[#5c7792]">{metric.context}</p> : null}
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showsSharedStructureSection ? (
      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        <div className={usesNayyaVisualStyle ? "rounded-[24px] border-l-[3px] border-[#f8df36] bg-white px-6 py-7 shadow-[8px_10px_0_#c7e8f7] md:px-10 md:py-9" : ""}>
        {usesNayyaVisualStyle ? (
          <p className="mb-6 font-inter text-[15px] font-semibold uppercase tracking-[0.16em] text-[#141114]">
            {translate("caseStudy.structure")}
          </p>
        ) : (
          <SectionHeading eyebrow={translate("caseStudy.overview")} title={translate("caseStudy.structure")} centered className="mb-6" />
        )}
        {overviewBlock?.body ? (
          <p className={`mt-8 max-w-[860px] font-inter text-[18px] leading-[1.8] ${usesNayyaVisualStyle ? "text-left text-[#5c5960]" : "mx-auto text-center text-[#5c7792]"}`}>
            {overviewBlock.body}
          </p>
        ) : null}
        {isNayyaCaseStudy || caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG || caseStudy.slug === "i9-everify-integration" || caseStudy.slug === "flock-accessibility-system" || caseStudy.slug === "protecta" || caseStudy.slug === "reversetech" ? (
          <>
            <p className="mt-6 font-inter text-[17px] leading-[1.7] text-[#3c3e3f]">
              {caseStudy.slug === "protecta"
                ? "My role was Design Engineer, owning the brand system, bilingual UX/UI, content structure, implementation, accessibility QA, and launch; the client advisors provided domain expertise and final approvals."
                : caseStudy.slug === "i9-everify-integration"
                ? "My role was UX Strategy, Integration UX, User Research, Product Thinking, across a 6 months timeline."
                : `My role was ${caseStudy.my_role.join(", ")}, across a ${caseStudy.duration} timeline.`}
            </p>
            <div className="mt-8">
              <p className="mb-4 font-inter text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5c5960]">
                {translate("caseStudy.toolsUsed")}
              </p>
              <ul className="flex flex-wrap gap-3">
                {caseStudy.tools.filter((item) => !(caseStudy.slug === "protecta" && (item === "Claude" || item === "Vercel"))).map((item) => {
                  const icon = resolveToolIconOptional(item);
                  return (
                    <li
                      key={item}
                      className="inline-flex items-center gap-3 rounded-xl border border-[#d7d2d3] bg-white px-3 py-2 font-inter text-[14px] text-[#3c3e3f]"
                    >
                      {icon ? (
                        <Image
                          src={icon}
                          alt=""
                          aria-hidden="true"
                          width={24}
                          height={24}
                          className="size-6 object-contain"
                        />
                      ) : null}
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
          <div className={`pb-8 md:border-r md:pb-0 md:pr-8 ${usesNayyaVisualStyle ? "border-[#d7d2d3]" : "border-[#4d87ae]/20"}`}>
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] font-medium text-[#3c3e3f]">{translate("caseStudy.myRole")}</p>
            <div className={`mb-5 h-[3px] w-full rounded-full ${usesNayyaVisualStyle ? "bg-[#f8df36]" : "bg-[#1183D0]"}`} />
            <ul className="space-y-1">
              {caseStudy.my_role.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] font-medium text-[#3c3e3f]">{item}</li>
              ))}
            </ul>
          </div>
          <div className={`py-8 md:border-r md:px-8 md:py-0 ${usesNayyaVisualStyle ? "border-[#d7d2d3]" : "border-[#4d87ae]/20"}`}>
            <p className={`mb-4 font-inter text-[15px] uppercase tracking-[1.5px] ${usesNayyaVisualStyle ? "text-[#3c3e3f]" : "text-[#5c7792]"}`}>{translate("caseStudy.toolsUsed")}</p>
            <div className={`mb-5 h-[3px] w-full rounded-full ${usesNayyaVisualStyle ? "bg-[#f8df36]" : "bg-[#4d87ae]/20"}`} />
            <ul className="space-y-1">
              {(caseStudy.slug === "reversetech"
                ? [
                    "Figma",
                    "Codex",
                    "Claude Design",
                    "Claude Code",
                    "Open Design",
                    "Notebook LM",
                    "ChatGPT",
                    "GitHub",
                    "Copilot",
                    "Grammarly",
                  ]
                : caseStudy.tools
              ).map((item) => {
                const icon = resolveToolIconOptional(item);
                return (
                <li key={item} className="flex items-center gap-3 font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">
                  {icon ? (
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
                      <Image
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        width={24}
                        height={24}
                        className="max-h-6 w-auto max-w-6 object-contain"
                      />
                    </span>
                  ) : null}
                  <span>{item}</span>
                </li>
                );
              })}
            </ul>
          </div>
          <div className="pt-8 md:pl-8 md:pt-0">
            <p className={`mb-4 font-inter text-[15px] uppercase tracking-[1.5px] ${usesNayyaVisualStyle ? "text-[#3c3e3f]" : "text-[#5c7792]"}`}>{translate("caseStudy.timeline")}</p>
            <div className={`mb-5 h-[3px] w-full rounded-full ${usesNayyaVisualStyle ? "bg-[#f8df36]" : "bg-[#4d87ae]/20"}`} />
            <p className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">
              {caseStudy.slug === "reversetech" ? translate("caseStudy.reversetechDuration") : caseStudy.duration}
            </p>
          </div>
        </div>
          )}
        </div>
      </section>
      ) : null}

      {caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG ? (
        <section className="mx-auto max-w-[1200px] bg-[#faf8f7] px-6 py-10 md:px-10 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <div className="mb-10">
                <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">The <span className="font-playfair font-normal italic">problem</span></h2>
              </div>
              <div className="space-y-6 font-inter text-[16px] leading-[1.7] text-[#5c5960]">
                <p>Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.</p>
                <p>The existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left.</p>
                <div className="pt-2">
                  <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">Context</p>
                  <p>Lift paid landing conversion and reduce CAC while working within two real constraints.</p>
                  <p className="mt-4">The site runs on Kajabi, so any redesign had to be modular and assemblable from existing content blocks. No custom engineering per variant.</p>
                  <p className="mt-4">The page had to serve two distinct user types Marketing identified in the ad funnel: complete beginners and adults returning to piano after years away. Same product, different motivations, same landing page.</p>
                  <p className="mt-4">The goal Marketing handed me was simple: more conversions, lower cost per acquisition, same ad spend.</p>
                </div>
                <div className="pt-2">
                  <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">Success Metrics</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Increase paid landing conversion without increasing ad spend.</li>
                    <li>Reduce CAC enough to make scale more efficient.</li>
                    <li>Create a modular Kajabi page structure Marketing can keep testing post-launch.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {problemMetrics.map((metric, index) => (
                <Card key={`zapiano-problem-${metric.label}-${metric.value}`} className="relative min-h-[190px] overflow-hidden rounded-[20px] border-0 bg-white shadow-[0_14px_30px_rgba(29,22,36,0.10)]">
                  <span aria-hidden="true" className={`absolute right-0 top-0 size-[74px] rounded-bl-full ${["bg-[#f8df36]", "bg-[#c7e8f7]", "bg-[#f3b4ed]"][index % 3]}`} />
                  <CardContent className="px-7 py-7">
                    <p className="relative text-[30px] font-bold leading-none text-[#141114]">{metric.value}</p>
                    <p className="relative mt-4 text-[16px] leading-[1.625em] text-[#5c5960]">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "protecta" && false ? (
        <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 xl:px-20">
          <div className="overflow-hidden rounded-[32px] border border-[#d7e5de] bg-[#f8f8f4] px-6 py-10 md:px-12 md:py-14">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#63826c]">{PROTECTA_BRAND_COPY[localizedLanguage].eyebrow}</p>
              <p className="mx-auto mt-4 max-w-[700px] font-inter text-[16px] leading-[1.7] text-[#526863]">{PROTECTA_BRAND_COPY[localizedLanguage].body}</p>
            </div>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="overflow-hidden rounded-[24px] bg-[#154f4d] shadow-[0_18px_48px_rgba(21,79,77,0.18)]">
                <img
                  src={withBasePath("/images/projects/protecta/protecta-logo.svg")}
                  alt="Protecta logo"
                  className="h-auto w-full"
                />
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#63826c]">{PROTECTA_BRAND_COPY[localizedLanguage].type}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-[#d7e5de] bg-white p-5">
                      <p className="font-inter text-[28px] text-[#154f4d]">Inter</p>
                      <p className="mt-2 font-inter text-[12px] text-[#69807a]">Editorial warmth for key moments</p>
                    </div>
                    <div className="rounded-[18px] border border-[#d7e5de] bg-white p-5">
                      <p className="font-inter text-[27px] font-semibold text-[#154f4d]">Inter</p>
                      <p className="mt-2 font-inter text-[12px] text-[#69807a]">Clear, accessible interface text</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#63826c]">{PROTECTA_BRAND_COPY[localizedLanguage].palette}</p>
                  <div className="mt-4 grid grid-cols-4 overflow-hidden rounded-[18px]">
                    {[
                      ["#154F4D", "Deep green"],
                      ["#CFE3AD", "Soft lime"],
                      ["#DDE3C7", "Sage"],
                      ["#FDFCFE", "Warm white"],
                    ].map(([color, name]) => (
                      <div key={color} className="min-h-[108px] p-3" style={{ backgroundColor: color }}>
                        <p className={`text-[11px] font-semibold ${color === "#154F4D" ? "text-white" : "text-[#154f4d]"}`}>{name}</p>
                        <p className={`mt-1 text-[10px] ${color === "#154F4D" ? "text-white/80" : "text-[#154f4d]/70"}`}>{color}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "protecta" && false ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[860px] text-center">
            <h2 className="font-inter text-[36px] leading-tight text-[#154f4d] md:text-[46px]">{PROTECTA_COMPONENT_COPY[localizedLanguage].title}</h2>
            <p className="mt-5 font-inter text-[16px] leading-[1.7] text-[#526863]">{PROTECTA_COMPONENT_COPY[localizedLanguage].body}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="overflow-hidden rounded-[20px] border border-[#d7e5de] bg-white shadow-[0_12px_30px_rgba(21,79,77,0.07)]">
              <div className="min-h-[168px] bg-[#f5f7ef] p-5">
                <div className="flex justify-between text-[11px] font-semibold text-[#47675f]"><span>Protecta</span><span>EN · ES</span></div>
                <p className="mt-6 font-inter text-[22px] leading-[1.05] text-[#154f4d]">Coverage that shows up for you.</p>
                <button type="button" className="mt-5 rounded-full bg-[#d96c4b] px-4 py-2 text-[11px] font-semibold text-white">Get free quote</button>
              </div>
              <p className="border-t border-[#d7e5de] px-4 py-3 text-center font-inter text-[12px] font-semibold text-[#154f4d]">{PROTECTA_COMPONENT_COPY[localizedLanguage].labels[0]}</p>
            </article>
            <article className="overflow-hidden rounded-[20px] border border-[#d7e5de] bg-white shadow-[0_12px_30px_rgba(21,79,77,0.07)]">
              <div className="min-h-[168px] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dceac8] text-[20px] text-[#154f4d]">♡</div>
                <p className="mt-5 font-inter text-[15px] font-semibold text-[#154f4d]">Health</p>
                <p className="mt-1 font-inter text-[11px] leading-[1.5] text-[#63826c]">Guidance for the coverage that fits your family.</p>
              </div>
              <p className="border-t border-[#d7e5de] px-4 py-3 text-center font-inter text-[12px] font-semibold text-[#154f4d]">{PROTECTA_COMPONENT_COPY[localizedLanguage].labels[1]}</p>
            </article>
            <article className="overflow-hidden rounded-[20px] border border-[#d7e5de] bg-white shadow-[0_12px_30px_rgba(21,79,77,0.07)]">
              <div className="min-h-[168px] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#63826c]">Language</p>
                <div className="mt-6 inline-flex rounded-full bg-[#edf2e8] p-1 font-inter text-[12px]">
                  <span className="rounded-full bg-[#154f4d] px-4 py-2 font-semibold text-white">English</span>
                  <span className="px-4 py-2 text-[#47675f]">Español</span>
                </div>
                <p className="mt-5 font-inter text-[11px] leading-[1.5] text-[#63826c]">Parallel language paths, not literal translation.</p>
              </div>
              <p className="border-t border-[#d7e5de] px-4 py-3 text-center font-inter text-[12px] font-semibold text-[#154f4d]">{PROTECTA_COMPONENT_COPY[localizedLanguage].labels[2]}</p>
            </article>
            <article className="overflow-hidden rounded-[20px] border border-[#d7e5de] bg-white shadow-[0_12px_30px_rgba(21,79,77,0.07)]">
              <div className="min-h-[168px] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#154f4d] text-[13px] font-bold text-[#dceac8]">PA</div>
                  <div><p className="font-inter text-[13px] font-semibold text-[#154f4d]">Your Protecta advisor</p><p className="font-inter text-[10px] text-[#63826c]">Here when you need us</p></div>
                </div>
                <button type="button" className="mt-7 w-full rounded-full border border-[#80a76d] px-3 py-2 text-[11px] font-semibold text-[#154f4d]">Message on WhatsApp</button>
              </div>
              <p className="border-t border-[#d7e5de] px-4 py-3 text-center font-inter text-[12px] font-semibold text-[#154f4d]">{PROTECTA_COMPONENT_COPY[localizedLanguage].labels[3]}</p>
            </article>
          </div>
          <div className="mt-8 rounded-[22px] border border-[#d7e5de] bg-[#f5f7ef] p-6 md:p-8">
            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#63826c]">{PROTECTA_COMPONENT_COPY[localizedLanguage].libraryTitle}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROTECTA_COMPONENT_COPY[localizedLanguage].libraryGroups.map((group) => (
                <div key={group.title} className="rounded-[16px] border border-[#d7e5de] bg-white px-4 py-4">
                  <p className="font-inter text-[13px] font-semibold text-[#154f4d]">{group.title}</p>
                  <p className="mt-2 font-inter text-[11px] leading-[1.5] text-[#63826c]">{group.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "calendar-keeper" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[860px] space-y-6 text-left">
            <h2 className="max-w-[720px] font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle("The problem")}
            </h2>
            <p className="text-[17px] leading-[1.7] text-[#5c5960]">For this case, I was tasked to design a new appointment scheduling system for clinics and medical practices in France and Germany. My role was to understand the market, identify the biggest opportunities and pain points, and define an initial product direction that could compete with existing solutions.</p>
            <p className="text-[17px] leading-[1.7] text-[#5c5960]">I started by researching users, competitors, and regulatory constraints to uncover the most critical problems. From there, I translated those insights into product opportunities and designed an experience that made scheduling more efficient, reliable, and intuitive for healthcare staff and patients.</p>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "calendar-keeper" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[1080px] rounded-[24px] border-l-[3px] border-[#f8df36] bg-white px-6 py-9 shadow-[8px_10px_0_#c7e8f7] md:px-10 md:py-11">
            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0E6FB4]">AI-assisted design workflow</p>
            <h2 className="mx-auto mt-3 max-w-[720px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle("From evidence to a testable direction")}
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] text-center text-[17px] leading-[1.7] text-[#5c5960]">AI helped compress the research and exploration cycle. I remained accountable for framing the problem, judging the trade-offs, defining the product strategy, and deciding what the prototype needed to prove.</p>
            <div className="mt-9 grid gap-4 md:grid-cols-4">
              {[
                { step: "01", title: "Research signals", body: "Gathered market, user, regulatory, and competitive evidence." },
                { step: "02", title: "AI-supported synthesis", body: "Clustered signals, expanded hypotheses, and surfaced edge cases." },
                { step: "03", title: "Human-led decisions", body: "Prioritized the resource-aware core and safe degraded-mode strategy." },
                { step: "04", title: "Prototype to validate", body: "Translated decisions into a scheduling service and console to test." },
              ].map((stage) => (
                <article key={stage.step} className="relative rounded-[18px] border border-[#d7d2d3] bg-[#faf8f7] p-5">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0E6FB4]">STEP {stage.step}</p>
                  <h3 className="mt-3 font-inter text-[18px] font-semibold leading-[1.25] text-[#141114]">{stage.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-[#5c5960]">{stage.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "calendar-keeper" && showStickyCalendarTabs ? (
        <div className="fixed inset-x-0 top-[88px] z-40 border-b border-[#d7d2d3] bg-white/95 backdrop-blur lg:top-0">
          <div className="mx-auto flex max-w-[900px] flex-wrap items-end justify-center px-6 md:px-10">
            {calendarKeeperPhases.map((phase) => (
              <button key={`sticky-${phase}`} type="button" onClick={() => handleCalendarKeeperPhaseChange(phase)} className={`relative px-3 py-3 text-center transition-colors sm:px-4 ${calendarKeeperPhase === phase ? "text-[#0E6FB4]" : "text-[#5c5960] hover:text-[#0E6FB4]"}`}>
                <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.16em]">{phase}</span>
                {calendarKeeperPhase === phase ? <span className="absolute inset-x-0 bottom-0 h-1 bg-[#0E6FB4]" /> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {caseStudy.slug !== "flock-accessibility-system" && caseStudy.slug !== "reversetech" && caseStudy.slug !== "protecta" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          {isNayyaCaseStudy ? (
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="max-w-[480px] font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                  Research that <span className="font-playfair font-normal italic">shaped a feasible</span>, trusted experience.
                </h2>
                <p className="mt-6 max-w-[520px] font-inter text-[18px] leading-[1.65] text-[#5c5960]">
                  I moved from understanding the benefits journey and technical constraints to aligning with the team, validating the handoff, and measuring its impact through enrollment behavior.
                </p>
              </div>
              <div className="border-t border-[#d7d2d3]">
                {caseStudy.methodology.steps.map((step, index) => (
                  <article key={step.step} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-[#d7d2d3] py-6 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-4">
                    <span className="font-inter text-[15px] font-semibold text-[#0E6FB4]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-inter text-[20px] font-semibold leading-[1.35] text-[#141114]">{step.label}</h3>
                      <p className="mt-2 font-inter text-[16px] leading-[1.65] text-[#5c5960]">{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
          <>
          {caseStudy.slug === "i9-everify-integration" || caseStudy.slug === "calendar-keeper" ? (
            <h2 className={`text-center font-inter font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114] ${caseStudy.slug === "calendar-keeper" ? "mb-8 text-[clamp(1.5rem,2.2vw,2rem)]" : "mb-12 text-[clamp(1.75rem,2.6vw,2.5rem)]"}`}>
              {methodologyName}{" "}
              <span className="block font-playfair font-normal italic">Methodology</span>
            </h2>
          ) : (
          <SectionHeading
            eyebrow="Methodology"
            title={methodologyName}
            centered={[CONFIDENTIAL_PLACEHOLDER_SLUG, "protecta"].includes(caseStudy.slug)}
            className="mb-12"
          />
          )}
          {caseStudy.slug === "protecta" ? (
            <>
              <div className="mx-auto mb-10 max-w-[820px] text-center">
                <p className="mt-4 font-inter text-[16px] leading-[1.7] text-[#5c7792]">{PROTECTA_DECISION_MODEL[localizedLanguage].body}</p>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="relative mx-auto min-w-[840px] px-3">
                <div className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-[#8badc7]" aria-hidden="true" />
                <div className="absolute right-[12.5%] top-4 h-[calc(50%_+_2px)] w-px bg-[#8badc7]" aria-hidden="true" />
                <div className="grid grid-cols-4 gap-x-4 gap-y-10">
                {caseStudy.methodology.steps.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative flex flex-col items-center ${
                      index === 4
                        ? "col-start-1 row-start-2"
                        : index === 5
                          ? "col-start-2 row-start-2"
                          : index === 6
                            ? "col-start-3 row-start-2"
                            : ""
                    }`}
                  >
                    {index === 4 || index === 5 ? (
                      <span className="absolute left-1/2 top-4 z-0 h-px w-[calc(100%+1rem)] bg-[#8badc7]" aria-hidden="true" />
                    ) : null}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[12px] font-bold text-[#0e2951] shadow-[0_3px_8px_rgba(14,41,81,0.12)]" style={{ backgroundColor: METHODOLOGY_COLORS[index] ?? "#87d4ac" }}>
                        {step.step}
                      </div>
                      <span className="h-6 w-px bg-[#8badc7]" aria-hidden="true" />
                    </div>
                    <article className="flex min-h-[190px] w-full flex-col rounded-[20px] border border-[#d7e8f7] bg-white p-4 shadow-[0_12px_30px_rgba(14,41,81,0.07)]">
                      <p className="font-inter text-[14px] font-semibold text-[#0e2951]">{step.label}</p>
                      <p className="mt-2 font-inter text-[12px] leading-[1.5] text-[#5c7792]">
                        {PROTECTA_WORKFLOW_SUMMARIES[localizedLanguage][index] ?? step.description}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {(PROTECTA_WORKFLOW_TOOLS[index] ?? []).map((tool) => (
                          <span key={tool} className="rounded-full bg-[#E0EEFB] px-2 py-1 font-inter text-[10px] font-semibold text-[#0E6FB4]">{tool}</span>
                        ))}
                      </div>
                    </article>
                  </div>
                ))}
                </div>
              </div>
              </div>
            </>
          ) : (
          <div ref={caseStudy.slug === "calendar-keeper" ? calendarKeeperTabsRef : undefined} className={caseStudy.slug === "calendar-keeper" ? "mx-auto flex max-w-[900px] flex-wrap items-end justify-center border-b border-[#d7d2d3]" : "grid gap-4 md:grid-cols-5"}>
            {caseStudy.methodology.steps.map((step, index) => (
              ["nayya-ai-benefits", "i9-everify-integration", CONFIDENTIAL_PLACEHOLDER_SLUG].includes(caseStudy.slug) ? (
                <div key={step.step} className="flex flex-col gap-4">
                  <div
                    className="flex flex-1 flex-col gap-2 rounded-2xl p-5"
                    style={{
                      backgroundColor: isNayyaCaseStudy
                        ? index % 2 === 0 ? "#1183D020" : "#f8df3633"
                        : `${METHODOLOGY_COLORS[index] ?? "#87d4ac"}33`,
                    }}
                  >
                    <div
                      className="w-full rounded-xl"
                      style={{
                        height: 10,
                        backgroundColor: isNayyaCaseStudy
                          ? index % 2 === 0 ? "#1183D0" : "#f8df36"
                          : METHODOLOGY_COLORS[index] ?? "#87d4ac",
                      }}
                    />
                    <p className="mt-2 font-inter text-[15px] font-semibold text-[#3c3e3f]">
                      {index + 1}. {step.label}
                    </p>
                    {caseStudy.slug !== CONFIDENTIAL_PLACEHOLDER_SLUG ? (
                      <p className="font-inter text-[14px] leading-[1.625em] text-[#5c7792]">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : (
                caseStudy.slug === "calendar-keeper" ? (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => handleCalendarKeeperPhaseChange((['empathize', 'define', 'ideate', 'prototype'] as const)[index])}
                    aria-current={calendarKeeperPhase === (['empathize', 'define', 'ideate', 'prototype'] as const)[index] ? "step" : undefined}
                    className={`relative px-3 py-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6FB4] focus-visible:ring-offset-4 sm:px-4 ${
                      calendarKeeperPhase === (['empathize', 'define', 'ideate', 'prototype'] as const)[index]
                        ? "text-[#0E6FB4]"
                        : "text-[#5c5960] hover:text-[#0E6FB4]"
                    }`}
                  >
                    <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.16em]">{step.label}</span>
                    {calendarKeeperPhase === (['empathize', 'define', 'ideate', 'prototype'] as const)[index] ? <span className="absolute inset-x-0 -bottom-px h-1 bg-[#0E6FB4]" /> : null}
                  </button>
                ) : (
                  <div key={step.step} className="flex flex-col rounded-[20px] border border-[#d7d2d3] bg-white p-6">
                    <span className="font-inter text-[13px] font-semibold tracking-[0.18em] text-[#0E6FB4]">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-3 font-inter text-[16px] font-semibold text-[#141114]">{step.label}</p>
                    <p className="mt-2 font-inter text-[14px] leading-[1.6] text-[#5c5960]">{step.description}</p>
                  </div>
                )
              )
            ))}
          </div>
          )}
          {caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG ? (
            <div className="mx-auto mt-10 max-w-[860px] space-y-8">
              {caseStudy.methodology.steps.map((step, index) => (
                <div key={`${step.step}-detail`} className="text-center">
                  <h2 className="mb-5 text-center font-inter text-[36px] leading-tight text-[#0e2951]">
                    {step.label}
                  </h2>
                  {index === 2 ? (
                    <div className="mt-3 grid items-start gap-8 text-left lg:grid-cols-[minmax(0,1fr)_420px]">
                      <div className="space-y-3">
                        {step.description.split("\n").map((line, lineIndex) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;
                          return (
                            <p key={`${step.step}-line-${lineIndex}`} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                              {trimmed}
                            </p>
                          );
                        })}
                      </div>
                      <div className="rounded-[24px] border border-[#d7dfeb] bg-white p-3 shadow-[0_18px_40px_rgba(14,41,81,0.08)]">
                        <div className="relative max-h-[520px] overflow-hidden rounded-[18px]">
                          <span className="absolute left-4 top-4 z-10 inline-flex rounded-[4px] bg-[#fca5a5] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#7f1d1d]">
                            Before
                          </span>
                          <img
                            src={withBasePath("/images/projects/zapiano/banners/page-6.svg")}
                            alt="Zapiano landing redesign reference"
                            className="h-auto w-full"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/92 to-white/0" />
                        </div>
                      </div>
                    </div>
                  ) : index === 3 ? (
                    <div className="mt-3 grid items-start gap-8 text-left lg:grid-cols-[minmax(0,1fr)_420px]">
                      <div className="rounded-[24px] border border-[#d7dfeb] bg-white p-3 shadow-[0_18px_40px_rgba(14,41,81,0.08)]">
                        <div className="relative max-h-[520px] overflow-hidden rounded-[18px]">
                          <span className="absolute left-4 top-4 z-10 inline-flex rounded-[4px] bg-[#16a34a] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white">
                            After
                          </span>
                          <img
                            src={withBasePath("/images/projects/zapiano/banners/page-3.svg")}
                            alt="Zapiano landing redesign after applying benchmark and funnel improvements"
                            className="h-auto w-full"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/92 to-white/0" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {step.description.split("\n").map((line, lineIndex) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;
                          return (
                            <p key={`${step.step}-line-${lineIndex}`} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                              {trimmed}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {step.description.split("\n").map((line, lineIndex) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        if (trimmed.startsWith("- ")) {
                          return (
                            <p key={`${step.step}-line-${lineIndex}`} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                              {trimmed}
                            </p>
                          );
                        }
                        return (
                          <p key={`${step.step}-line-${lineIndex}`} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                            {trimmed}
                          </p>
                        );
                      })}
                    </div>
                  )}
                  {index === 0 ? (
                    <div className="mt-10 overflow-hidden rounded-[24px] border border-[#dadde1] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.08)] text-left">
                      <div className="border-b border-[#dadde1] px-6 py-5">
                        <h3 className="text-[20px] font-semibold text-[#1c1e21]">{CONFIDENTIAL_FUNNEL_ARCHITECTURE.title}</h3>
                        <p className="mt-1 text-[13px] text-[#65676b]">{CONFIDENTIAL_FUNNEL_ARCHITECTURE.subtitle}</p>
                      </div>
                      <div className="grid lg:grid-cols-2">
                        {[CONFIDENTIAL_FUNNEL_ARCHITECTURE.before, CONFIDENTIAL_FUNNEL_ARCHITECTURE.after].map((column) => {
                          const isBefore = column.badge === "Before";
                          return (
                            <div
                              key={column.badge}
                              className={`px-6 py-8 md:px-8 ${isBefore ? "border-b border-[#dadde1] bg-[#fef5f5] lg:border-b-0 lg:border-r" : "bg-[#f0fdf4]"}`}
                            >
                              <div className="mb-6 flex items-center gap-3">
                                <span
                                  className={`inline-flex rounded-[4px] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${
                                    isBefore ? "bg-[#fca5a5] text-[#7f1d1d]" : "bg-[#16a34a] text-white"
                                  }`}
                                >
                                  {column.badge}
                                </span>
                                <span className="text-[16px] font-semibold text-[#1c1e21]">{column.title}</span>
                              </div>
                              <p className="mb-6 text-[12px] leading-[1.6] text-[#65676b]">{column.subtitle}</p>
                              <div className="space-y-2">
                                {column.stages.map((stage, stageIndex) => (
                                  <Fragment key={`${column.badge}-${stage.name}`}>
                                    <div
                                      className={`rounded-[8px] border bg-white px-4 py-4 ${
                                        stage.tone === "problem"
                                          ? "border-[#fca5a5]"
                                          : stage.tone === "win"
                                            ? "border-[#86efac]"
                                            : "border-[#dadde1]"
                                      }`}
                                    >
                                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[#65676b]">{stage.label}</p>
                                      <p className="mb-1 text-[14px] font-semibold text-[#1c1e21]">{stage.name}</p>
                                      <p className="text-[12px] leading-[1.5] text-[#65676b]">{stage.detail}</p>
                                      {stage.tags?.length ? (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                          {stage.tags.map((tag) => (
                                            <span
                                              key={tag}
                                              className={`rounded-[3px] px-2 py-1 text-[10px] font-medium ${
                                                isBefore ? "bg-[#fee2e2] text-[#b91c1c]" : "bg-[#dbeafe] text-[#1e40af]"
                                              }`}
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      ) : null}
                                    </div>
                                    {stageIndex === 0 || stageIndex === 1 ? (
                                      <div className="py-1 text-center text-[18px] leading-none text-[#65676b]">↓</div>
                                    ) : null}
                                    {stageIndex === 1 ? (
                                      <div
                                        className={`rounded-[6px] border border-dashed px-4 py-2 text-center text-[13px] font-semibold ${
                                          isBefore ? "border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]" : "border-[#86efac] bg-[#dcfce7] text-[#15803d]"
                                        }`}
                                      >
                                        {column.conversion}
                                      </div>
                                    ) : null}
                                  </Fragment>
                                ))}
                              </div>
                              <div
                                className={`mt-6 rounded-[4px] border-l-[3px] bg-white/70 px-4 py-4 text-[12px] leading-[1.5] text-[#1c1e21] ${
                                  isBefore ? "border-[#b91c1c]" : "border-[#15803d]"
                                }`}
                              >
                                <strong className="mb-1 block text-[11px] uppercase tracking-[0.05em]">{column.takeawayTitle}</strong>
                                {column.takeaway}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="border-t border-[#dadde1] bg-[#f5f6f7] px-6 py-4 text-[12px] leading-[1.5] text-[#65676b]">
                        <strong className="text-[#1c1e21]">Impact:</strong> {CONFIDENTIAL_FUNNEL_ARCHITECTURE.footer.replace(/^Impact:\s*/, "")}
                      </div>
                    </div>
                  ) : null}
                  {index === 1 ? (
                    <div className="mt-10 text-left">
                      <div className="mx-auto mb-10 max-w-[860px] space-y-5 text-center font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        <p>
                          Before sketching anything, I audited five direct competitors against seven conversion heuristics that matter for cold paid traffic. The pattern was clear: Zapiano was the weakest landing in the category on every dimension that drives entry conversion.
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-[24px] border border-[#dadde1] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.08)]">
                        <div className="border-b border-[#dadde1] px-6 py-5">
                          <h3 className="text-[18px] font-semibold text-[#1c1e21]">Competitive benchmark</h3>
                          <p className="mt-1 text-[13px] text-[#65676b]">
                            Adult piano learning category | 5 competitors evaluated across 7 UX and conversion heuristics
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#dadde1] bg-[#f5f6f7] px-6 py-4 text-[12px] text-[#65676b]">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce7] text-[12px] font-semibold text-[#15803d]">✓</span>
                            Strong
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fef3c7] text-[12px] font-semibold text-[#b45309]">~</span>
                            Partial
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fee2e2] text-[12px] font-semibold text-[#b91c1c]">✗</span>
                            Missing
                          </div>
                          <div className="ml-auto">Analysis: April 2025 | Method: competitive benchmark of paid traffic landing pages</div>
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                          <table className="min-w-[1480px] w-full border-collapse text-[13px]">
                            <thead>
                              <tr className="bg-[#f5f6f7] text-center text-[11px] font-medium leading-[1.4] text-[#65676b]">
                                <th className="min-w-[230px] border-b border-r border-[#ebedf0] px-4 py-3 text-left">Product</th>
                                {CONFIDENTIAL_BENCHMARK_HEADERS.map((header) => (
                                  <th key={header} className="border-b border-r border-[#ebedf0] px-2 py-3">
                                    {header}
                                  </th>
                                ))}
                                <th className="min-w-[220px] border-b border-[#ebedf0] px-4 py-3 text-left">Key takeaway for Zapiano</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(["Direct competitors", "Zapiano"] as const).map((group) => (
                                <Fragment key={group}>
                                  <tr className="bg-[#ebedf0]">
                                    <td colSpan={10} className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.04em] text-[#65676b]">
                                      {group}
                                    </td>
                                  </tr>
                                  {CONFIDENTIAL_BENCHMARK_ROWS.filter((row) => row.group === group).map((row) => (
                                    <tr
                                      key={`${group}-${row.product}-${row.domain}`}
                                      className={
                                        row.badge === "After"
                                          ? "bg-[#f0fdf4]"
                                          : row.badge === "Before"
                                            ? "bg-[#fef5f5]"
                                            : "bg-white"
                                      }
                                    >
                                      <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-left">
                                        <div className="font-medium text-[#1c1e21]">
                                          {row.product}
                                          {row.badge === "Before" ? (
                                            <span className="ml-2 inline-flex rounded-[4px] bg-[#fca5a5] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#7f1d1d]">
                                              Before
                                            </span>
                                          ) : row.badge === "After" ? (
                                            <span className="ml-2 inline-flex rounded-[4px] bg-[#16a34a] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white">
                                              After
                                            </span>
                                          ) : null}
                                        </div>
                                        <div className="mt-1 text-[11px] text-[#65676b]">{row.domain}</div>
                                      </td>
                                      {row.scores.map((score, scoreIndex) => (
                                        <td key={`${row.product}-${scoreIndex}`} className="border-b border-r border-[#ebedf0] px-2 py-4 text-center">
                                          <span
                                            className={`inline-flex h-[26px] w-[26px] items-center justify-center rounded-full text-[14px] font-semibold ${
                                              score === "strong"
                                                ? "bg-[#dcfce7] text-[#15803d]"
                                                : score === "partial"
                                                  ? "bg-[#fef3c7] text-[#b45309]"
                                                  : "bg-[#fee2e2] text-[#b91c1c]"
                                            }`}
                                          >
                                            {score === "strong" ? "✓" : score === "partial" ? "~" : "✗"}
                                          </span>
                                        </td>
                                      ))}
                                      <td className="border-b border-[#ebedf0] px-4 py-4 text-left text-[12px] leading-[1.45] text-[#65676b]">
                                        <div className="space-y-1">
                                          {row.takeaway.split("\n").map((line, lineIndex) => (
                                            <p key={`${row.product}-${row.domain}-takeaway-${lineIndex}`}>{line}</p>
                                          ))}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="grid gap-4 p-5 md:hidden">
                          {(["Direct competitors", "Zapiano"] as const).map((group) => (
                            <div key={group} className="space-y-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#65676b]">{group}</p>
                              {CONFIDENTIAL_BENCHMARK_ROWS.filter((row) => row.group === group).map((row) => (
                                <Card
                                  key={`mobile-${group}-${row.product}-${row.domain}`}
                                  className={row.badge === "After" ? "border-[#9cd99f] bg-[#f0fdf4]" : row.badge === "Before" ? "border-[#f3b2b2] bg-[#fef5f5]" : ""}
                                >
                                  <CardContent className="space-y-4 px-5 py-5">
                                    <div>
                                      <p className="text-[18px] font-semibold text-[#0e2951]">
                                        {row.product}
                                        {row.badge ? (
                                          <span className={`ml-2 inline-flex rounded-[4px] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] ${row.badge === "After" ? "bg-[#16a34a] text-white" : "bg-[#fca5a5] text-[#7f1d1d]"}`}>
                                            {row.badge}
                                          </span>
                                        ) : null}
                                      </p>
                                      <p className="mt-1 text-[13px] text-[#5c7792]">{row.domain}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-[12px] leading-[1.5] text-[#5c7792]">
                                      {CONFIDENTIAL_BENCHMARK_HEADERS.map((header, headerIndex) => (
                                        <div key={`${row.product}-mobile-${header}`}>
                                          <p className="font-semibold text-[#0e2951]">{header}</p>
                                          <p className="mt-1">
                                            {row.scores[headerIndex] === "strong" ? "Strong" : row.scores[headerIndex] === "partial" ? "Partial" : "Missing"}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div>
                                      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">Key takeaway</p>
                                      <div className="mt-2 space-y-1 text-[14px] leading-[1.6] text-[#5c7792]">
                                        {row.takeaway.split("\n").map((line, lineIndex) => (
                                          <p key={`mobile-${row.product}-${row.domain}-takeaway-${lineIndex}`}>{line}</p>
                                        ))}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-[#dadde1] bg-[#f5f6f7] px-6 py-4 text-[11px] text-[#65676b]">
                          Score summary | Before: 0 strong, 2 partial, 5 missing of 7 dimensions. After: 7 strong of 7. Closed all 4 critical gaps versus Pianote category benchmark.
                        </div>
                      </div>
                      <div className="mx-auto mt-8 max-w-[820px] text-center">
                        <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                          The redesign brief wrote itself: close the four critical gaps of entry friction, segmentation, founder visibility, and community proof while keeping what was already working, including risk reversal and content depth.
                        </p>
                      </div>
                    </div>
                  ) : null}
                  {index === 4 ? (
                    <div className="mt-10 text-left">
                      <div className="overflow-hidden rounded-[24px] border border-[#dadde1] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.08)]">
                        <div className="border-b border-[#dadde1] px-6 py-5">
                          <h3 className="text-[18px] font-semibold text-[#1c1e21]">A/B testing comparison</h3>
                          <p className="mt-1 text-[13px] text-[#65676b]">
                            Same offer, same audience, two different social proof treatments.
                          </p>
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                          <table className="w-full border-collapse text-[13px]">
                            <thead>
                              <tr className="bg-[#f5f6f7] text-left text-[11px] font-medium leading-[1.4] text-[#65676b]">
                                <th className="w-[20%] border-b border-r border-[#ebedf0] px-4 py-3">Difference</th>
                                <th className="w-[24%] border-b border-r border-[#ebedf0] px-4 py-3">Variant A</th>
                                <th className="w-[24%] border-b border-r border-[#ebedf0] px-4 py-3">Variant B</th>
                                <th className="w-[32%] border-b border-[#ebedf0] px-4 py-3">Why it mattered</th>
                              </tr>
                            </thead>
                            <tbody>
                              {CONFIDENTIAL_AB_TEST_ROWS.map((row) => (
                                <tr key={row.metric} className={row.metric === "Conversion outcome" ? "bg-[#f0fdf4]" : "bg-white"}>
                                  <td className="border-b border-r border-[#ebedf0] px-4 py-4 font-semibold text-[#1c1e21]">{row.metric}</td>
                                  <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#65676b]">{row.variantA}</td>
                                  <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#65676b]">
                                    <div className="flex items-start gap-2">
                                      <span>{row.variantB}</span>
                                      {row.metric === "Conversion outcome" ? (
                                        <span className="inline-flex rounded-[4px] bg-[#16a34a] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white">
                                          Winner
                                        </span>
                                      ) : null}
                                    </div>
                                  </td>
                                  <td className="border-b border-[#ebedf0] px-4 py-4 text-[#65676b]">{row.takeaway}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="grid gap-4 p-5 md:hidden">
                          {CONFIDENTIAL_AB_TEST_ROWS.map((row) => (
                            <Card key={`ab-mobile-${row.metric}`}>
                              <CardContent className="space-y-4 px-5 py-5">
                                <p className="text-[16px] font-semibold text-[#0e2951]">{row.metric}</p>
                                <div className="space-y-3 text-[14px] leading-[1.6] text-[#5c7792]">
                                  <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#65676b]">Variant A</p>
                                    <p className="mt-1">{row.variantA}</p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#65676b]">Variant B</p>
                                    <p className="mt-1">
                                      {row.variantB}
                                      {row.metric === "Conversion outcome" ? (
                                        <span className="ml-2 inline-flex rounded-[4px] bg-[#16a34a] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white">
                                          Winner
                                        </span>
                                      ) : null}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">Why it mattered</p>
                                    <p className="mt-1">{row.takeaway}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <div className="mx-auto mt-8 max-w-[820px] text-center">
                        <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                          Once both variants had statistically meaningful data, I used Copilot to compare scroll depth, time-to-CTA, and segment behavior across variants. It compressed the slowest part of the testing cycle, synthesis, without replacing the design judgment that came before it.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
          </>
          )}
        </section>
      ) : null}

      {visibleStoryBlocks.length && caseStudy.slug !== CONFIDENTIAL_PLACEHOLDER_SLUG ? (
        <section id="rt-problem" className={`scroll-mt-24 bg-transparent py-10 ${usesNayyaVisualStyle ? `w-full ${caseStudy.slug === "flock-accessibility-system" || caseStudy.slug === "protecta" ? "bg-white" : "bg-[#faf8f7]"}` : "mx-auto max-w-[1200px] px-6 md:px-10 xl:px-20"}`}>
          <div className={usesNayyaVisualStyle ? "mx-auto max-w-[1200px] px-6 md:px-10 xl:px-20" : ""}>
          <div className={caseStudy.slug === "reversetech" ? "max-w-[860px]" : caseStudy.slug === "protecta" ? "max-w-[900px]" : "grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start"}>
            <div>
              {usesNayyaVisualStyle ? (
                <div className="mb-10">
                  <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">{renderNayyaEditorialTitle(translate("caseStudy.problem"))}</h2>
                </div>
              ) : (
                <SectionHeading eyebrow={translate("caseStudy.caseStudyLabel")} title={translate("caseStudy.problem")} className="mb-12" />
              )}
              <div className="space-y-10">
                {visibleStoryBlocks.map((block) => {
                  const items = getPayloadList(block.payload, "items");
                  return (
                    <div key={block.id} id={caseStudy.slug === "reversetech" ? block.id : undefined} className={caseStudy.slug === "reversetech" ? "scroll-mt-24" : undefined}>
                      {block.id !== "situation" && block.id !== "actions" ? (
                        <p className={`mb-4 ${usesNayyaVisualStyle && block.id === "task" ? "text-[15px] normal-case tracking-normal" : `text-[13px] uppercase ${usesNayyaVisualStyle ? "tracking-[0.16em]" : "tracking-[0.28em]"}`} font-semibold text-[#0E6FB4]`}>
                          {block.id === "task" ? translate("caseStudy.context") : block.title}
                        </p>
                      ) : null}
                      {block.body ? (
                        block.body.split(/\n+/).map((paragraph, idx) => (
                          <p
                            key={idx}
                            className={`font-inter ${caseStudy.slug === "protecta" ? "text-[17px]" : "text-[16px]"} leading-[1.7] ${usesNayyaVisualStyle ? "text-[#5c5960]" : "text-[#5c7792]"} mb-4 last:mb-0 ${
                              caseStudy.slug === "reversetech" ? "max-w-[760px]" : caseStudy.slug === "protecta" ? "max-w-[820px]" : "max-w-[720px]"
                            }`}
                          >
                            {paragraph.trim()}
                          </p>
                        ))
                      ) : null}
                      {caseStudy.slug === "protecta" && block.id === "research" ? (
                        <a
                          href="https://notebook.google.com/notebook/4ce934be-90fa-44ad-9770-9b2bef5ffbb2"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex items-center font-inter text-[14px] font-semibold text-[#0E6FB4] underline decoration-[#1183D0]/35 underline-offset-4 transition-colors hover:text-[#0e5a8a] hover:decoration-[#0e5a8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0] focus-visible:ring-offset-4"
                        >
                          {translate("caseStudy.openNotebookResearch")}
                        </a>
                      ) : null}
                      {items.length ? (
                        <div className="mt-5 space-y-3">
                          {items.map((item) => (
                            <p
                              key={item}
                              className={`font-inter ${caseStudy.slug === "protecta" ? "text-[17px]" : "text-[16px]"} leading-[1.7] ${usesNayyaVisualStyle ? "text-[#5c5960]" : "text-[#5c7792]"} ${
                                caseStudy.slug === "reversetech" ? "max-w-[760px]" : caseStudy.slug === "protecta" ? "max-w-[820px]" : "max-w-[720px]"
                              }`}
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      ) : null}
                      {caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG && block.id === "task" && successMetrics.length ? (
                        <div className="mt-8">
                          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#0E6FB4]">{translate("caseStudy.successMetrics")}</p>
                          <ul className="space-y-3">
                            {successMetrics.map((item) => (
                              <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">{stripLeadingBullet(item)}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {caseStudy.slug !== "reversetech" && caseStudy.slug !== "protecta" ? (
            <div className="grid gap-4">
              {
                problemMetrics.map((metric, index) => (
                  <Card
                    key={`${metric.label}-${metric.value}`}
                    className={`overflow-hidden ${
                      usesNayyaVisualStyle
                      ? "relative min-h-[190px] rounded-[20px] border-0 bg-white shadow-[0_14px_30px_rgba(29,22,36,0.10)]"
                        : ""
                    }`}
                    style={usesNayyaVisualStyle ? { boxShadow: "0 14px 30px rgba(29, 22, 36, 0.1)" } : undefined}
                  >
                    {usesNayyaVisualStyle ? (
                      <span
                        aria-hidden="true"
                        className={`absolute right-0 top-0 size-[74px] rounded-bl-full ${
                          ["bg-[#f8df36]", "bg-[#c7e8f7]", "bg-[#f3b4ed]", "bg-[#00d9cf]"][index % 4]
                        }`}
                      />
                    ) : null}
                    <CardContent className="px-7 py-7">
                      <p className={`relative text-[30px] font-bold leading-none ${usesNayyaVisualStyle ? "text-[#141114]" : "text-[#0e2951]"}`}>{metric.value}</p>
                      <p className={`relative mt-4 text-[16px] leading-[1.625em] ${usesNayyaVisualStyle ? "text-[#5c5960]" : "text-[#0e2951]"}`}>
                        {metric.label}
                      </p>
                      {metric.context ? (
                        <p className={`mt-2 text-[14px] leading-[1.6] ${usesNayyaVisualStyle ? "text-[#5c5960]" : "text-[#5c7792]"}`}>{metric.context}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                ))
              }
            </div>
            ) : null}
          </div>
          </div>
        </section>
      ) : (
        <>
        <section id="calendar-empathize" className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "empathize" ? "" : "hidden"}`}>
          <div className="mx-auto max-w-[860px]">
            <div className="mb-12">
              <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0E6FB4]">Research</p>
              <h2 className="mx-auto mt-3 max-w-[760px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle("Behind the schedule")}
              </h2>
              <p className="mx-auto mb-6 mt-5 max-w-[760px] text-center text-[17px] leading-[1.7] text-[#5c5960]">Research across France and Germany narrowed a broad scheduling opportunity to one priority: help clinical staff keep a trustworthy schedule while giving returning patients a reliable self-service path.</p>
              <p className="text-center text-[15px] leading-[1.6] text-[#5c5960]">
                <a href="https://docs.google.com/document/d/1f8IdPBMvMJf_yqPTCc1hNMkU1EpcaO1OIUKFSGaVCLk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-[#0E6FB4] hover:text-[#0e5a8a] underline">
                  View detailed research insights →
                </a>
              </p>
            </div>

            <div className="mb-12">
              <div className="flex flex-col gap-8">
                <div className="order-2">
                  <h3 className="mb-8 text-center font-inter text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#141114]">What shaped the direction</h3>
                  <ul className="space-y-4 text-[17px] leading-[1.7] text-[#5c5960]">
                    <li><strong>Germany was the entry opportunity.</strong> France was already more established; Germany left a narrower opening for a practice-management offer.</li>
                    <li><strong>Migration trust mattered more than feature parity.</strong> Practices feared losing patient data, so a credible migration path had to precede additional scheduling features.</li>
                    <li><strong>The product needed to earn its place in daily operations.</strong> Compliance was table stakes; clearer workflows, reliable availability, and recovery from failures were the meaningful design opportunities.</li>
                  </ul>
                </div>

                <div className="order-1">
                  <h4 className="mb-4 text-center font-inter text-[20px] font-semibold text-[#141114]">📊 Feature & Capability Comparison</h4>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-[13px] border-collapse">
                      <thead>
                        <tr className="bg-[#faf8f7]">
                          <th className="border border-[#d7d2d3] px-3 py-2 text-left font-semibold text-[#141114]">Feature</th>
                          <th className="border border-[#d7d2d3] px-3 py-2 text-center font-semibold text-[#141114]">Doctolib</th>
                          <th className="border border-[#d7d2d3] px-3 py-2 text-center font-semibold text-[#141114]">Samedi</th>
                          <th className="border border-[#d7d2d3] px-3 py-2 text-center font-semibold text-[#141114]">German Incumbents</th>
                          <th className="border border-[#d7d2d3] px-3 py-2 text-center font-semibold text-[#141114]">French Incumbents</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">Patient Booking</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                        </tr>
                        <tr className="bg-[#faf8f7]">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">Data Migration Tools</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">End-to-End Encryption</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                        </tr>
                        <tr className="bg-[#faf8f7]">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">EU Data Sovereignty</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">Waitlist / Backfill</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                        </tr>
                        <tr className="bg-[#faf8f7]">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">Usability / Satisfaction</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">Self-Service Onboarding</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#16a34a] font-bold">✓</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                        </tr>
                        <tr className="bg-[#faf8f7]">
                          <td className="border border-[#d7d2d3] px-3 py-2 font-medium">Free Entry Tier</td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#dc2626] font-bold">✗</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                          <td className="border border-[#d7d2d3] px-3 py-2 text-center"><span className="text-[#d97706] font-bold">~</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-[#f0fdf4] border-l-4 border-[#16a34a] rounded">
                    <p className="text-[15px] leading-[1.7] text-[#5c5960]"><strong>Key Finding:</strong> Data migration is the real differentiator, 44.8% of German practices fear data won't migrate cleanly. This is the #1 blocker to switching, making it a higher initial priority than additional compliance certifications or payment integrations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="mb-8 text-center font-inter text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#141114]">User Needs</h3>
              <p className="mx-auto mb-8 max-w-[700px] text-center text-[17px] leading-[1.7] text-[#5c5960]">Two groups determined the first release: the people managing the schedule and the returning patients who need to act without adding to their workload.</p>

              <div className="space-y-3">
                <div className="mb-6 p-4 bg-[#faf8f7] border-l-4 border-[#1183D0] rounded">
                  <p className="text-[14px] font-semibold text-[#141114]">Primary Focus</p>
                  <p className="text-[13px] text-[#5c5960] mt-1">These two personas guided the initial design direction</p>
                </div>
                {([
                  {
                    id: "receptionists",
                    title: "1. Clinical staff / medical assistants",
                    needs: [
                      "They balance calls, changes, and clinical work. The scheduling experience needed to make availability, constraints, and recovery clear without adding another coordination layer."
                    ]
                  },
                  {
                    id: "patients",
                    title: "2. Returning patients",
                    needs: [
                      "They need to find, confirm, or change a familiar appointment quickly. Clear availability and durable confirmation reduce avoidable calls back to the practice."
                    ]
                  },
                ] as CalendarKeeperUserNeed[]).map((userType) => (
                  <div key={userType.id} className="border border-[#d7d2d3] rounded-lg overflow-hidden bg-[#faf8f7]">
                    <button
                      onClick={() => setExpandedUserNeed(expandedUserNeed === userType.id ? null : userType.id)}
                      className="w-full flex items-center justify-between p-5 bg-white hover:bg-[#faf8f7] transition-colors border-b border-[#d7d2d3]"
                    >
                      <h4 className="font-inter text-[18px] font-semibold text-[#141114] text-left">{userType.title}</h4>
                      <svg
                        className={`w-5 h-5 text-[#141114] transition-transform ${expandedUserNeed === userType.id ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                    {expandedUserNeed === userType.id && (
                      <div className="px-5 pb-5 border-t border-[#d7d2d3] bg-[#fafbfc]">
                        {userType.goal && (
                          <p className="text-[16px] leading-[1.7] text-[#141114] font-semibold mb-4">Goal: {userType.goal}</p>
                        )}
                        <ul className="space-y-3 mb-4">
                          {userType.needs.map((need, idx) => (
                            <li key={idx} className="text-[15px] leading-[1.6] text-[#5c5960]">{need}</li>
                          ))}
                        </ul>
                        {userType.consequence && (
                          <p className="text-[15px] leading-[1.6] text-[#5c5960]"><strong>Consequence:</strong> {userType.consequence}</p>
                        )}
                        {userType.jtbd && (
                          <p className="text-[15px] leading-[1.6] text-[#5c5960] mt-3"><strong>JTBD (provisional):</strong> "{userType.jtbd}"</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-8 border-t border-[#d7d2d3] pt-6">
                  <p className="text-[14px] font-semibold text-[#141114] mb-4">Secondary Users</p>
                  {([
                    {
                      id: "caregivers",
                      title: "3. Caregivers",
                      needs: [
                        "Research showed that booking appointments for family members is a common use case, not an edge case. Caregivers need an easy way to manage appointments for dependents, but current experiences are slowed down by unnecessary friction, such as cumbersome form inputs. These insights highlighted the need to design \"booking on behalf of someone else\" as a core workflow rather than an add-on feature."
                      ]
                    },
                    {
                      id: "elderly",
                      title: "4. Older & Low-Digital-Literacy Patients",
                      needs: [
                        "Research highlighted that older adults have different digital needs across markets. Many German patients struggle with digital tools, while accessibility requirements such as readable interfaces and clear information about practice accessibility are essential for all users. Designing an inclusive booking experience reduces reliance on phone support and improves access to care for a broader range of patients."
                      ]
                    },
                    {
                      id: "doctors",
                      title: "5. Doctors & Clinicians",
                      needs: [
                        "Research showed that doctors want to maximize clinical time while minimizing administrative work. Although workflows differ between Germany and France, both markets experience scheduling inefficiencies and administrative burdens that reduce time with patients. These insights reinforced the need for a reliable scheduling system that minimizes errors, streamlines workflows, and protects valuable clinical capacity."
                      ]
                    }
                  ] as CalendarKeeperUserNeed[]).map((userType) => (
                  <div key={userType.id} className="border border-[#d7d2d3] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedUserNeed(expandedUserNeed === userType.id ? null : userType.id)}
                      className="w-full flex items-center justify-between p-5 bg-white hover:bg-[#faf8f7] transition-colors"
                    >
                      <h4 className="font-inter text-[18px] font-semibold text-[#141114] text-left">{userType.title}</h4>
                      <svg
                        className={`w-5 h-5 text-[#141114] transition-transform ${expandedUserNeed === userType.id ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                    {expandedUserNeed === userType.id && (
                      <div className="px-5 pb-5 border-t border-[#d7d2d3] bg-[#fafbfc]">
                        {userType.goal && (
                          <p className="text-[16px] leading-[1.7] text-[#141114] font-semibold mb-4">Goal: {userType.goal}</p>
                        )}
                        <ul className="space-y-3 mb-4">
                          {userType.needs.map((need, idx) => (
                            <li key={idx} className="text-[15px] leading-[1.6] text-[#5c5960]">{need}</li>
                          ))}
                        </ul>
                        {userType.consequence && (
                          <p className="text-[15px] leading-[1.6] text-[#5c5960]"><strong>Consequence:</strong> {userType.consequence}</p>
                        )}
                        {userType.jtbd && (
                          <p className="text-[15px] leading-[1.6] text-[#5c5960] mt-3"><strong>JTBD (provisional):</strong> "{userType.jtbd}"</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20 ${caseStudy.slug === "calendar-keeper" && calendarKeeperPhase !== "empathize" ? "hidden" : ""}`}>
          <div className="mx-auto max-w-[860px]">
            <h3 className="mb-4 text-center font-inter text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#141114]">Research takeaway</h3>
            <p className="text-center text-[17px] leading-[1.7] text-[#5c5960]">The first release should make scheduling dependable for staff before expanding the feature set.</p>
          </div>
        </section>

        {caseStudy.slug === "calendar-keeper" ? (
          <section id="calendar-define" className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "define" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-[1080px]">
              <h2 className="mx-auto mt-3 max-w-[720px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle("A day for the Calendar Keeper")}
              </h2>
              <p className="mx-auto mb-8 mt-5 max-w-[720px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">Five moments show where unreliable availability turns routine scheduling into rework and lost clinical capacity.</p>

              <div className="overflow-x-auto rounded-[24px] border border-[#d7d2d3] bg-[#faf8f7] shadow-[0_12px_32px_rgba(20,17,20,0.06)]">
                <div className="min-w-[920px] p-5 md:p-7">
                  <div className="grid grid-cols-5 gap-3 border-b border-[#d7d2d3] pb-4">
                    {[
                      { step: "01", title: "Open the day", moment: "Check the calendar and prepare the clinic" },
                      { step: "02", title: "Handle requests", moment: "Answer calls, messages, and walk-ins" },
                      { step: "03", title: "Coordinate a visit", moment: "Find the right practitioner, room, and slot" },
                      { step: "04", title: "Keep care moving", moment: "Balance scheduling with clinical and TI tasks" },
                      { step: "05", title: "Recover the schedule", moment: "Resolve changes, errors, and missed availability" },
                    ].map((stage) => (
                      <div key={stage.step}>
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-[#0E6FB4]">{stage.step}</p>
                        <h4 className="font-inter text-[16px] font-semibold leading-[1.25] text-[#141114]">{stage.title}</h4>
                        <p className="mt-2 text-[12px] leading-[1.5] text-[#5c5960]">{stage.moment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-5 gap-3">
                    {[
                      {
                        tension: "Calendar confidence is fragile",
                        detail: "A sync failure or stale availability can turn the first calendar check into a day-long operational issue.",
                        opportunity: "Make sync status and recovery actions visible.",
                        tone: "border-[#d7d2d3] bg-[#fffdf5]",
                      },
                      {
                        tension: "Routine requests pile up",
                        detail: "Rebooking and insurance calls compete with patients already at the front desk.",
                        opportunity: "Deflect repeat tasks through reliable self-service.",
                        tone: "border-[#d7d2d3] bg-[#fffdf5]",
                      },
                      {
                        tension: "Scheduling requires constant cross-checking",
                        detail: "Every booking may depend on practitioner, room, equipment, and patient needs.",
                        opportunity: "Surface constraints before a slot is confirmed.",
                        tone: "border-[#d7d2d3] bg-[#f5faff]",
                      },
                      {
                        tension: "The work is interrupted, not sequential",
                        detail: "German MFAs balance scheduling alongside clinical work and TI-mandated tasks.",
                        opportunity: "Support handoffs and quick return-to-task moments.",
                        tone: "border-[#d7d2d3] bg-[#f8f6ff]",
                      },
                      {
                        tension: "Errors reduce clinical capacity",
                        detail: "Double-bookings and manual fixes take time away from care and leave no room for recovery.",
                        opportunity: "Offer clear exception handling and a trustworthy audit trail.",
                        tone: "border-[#d7d2d3] bg-[#fff7f7]",
                      },
                    ].map((stage) => (
                      <article key={stage.tension} className={`rounded-[18px] border p-4 ${stage.tone}`}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141114]">Pain point</p>
                        <h5 className="mt-2 font-inter text-[15px] font-semibold leading-[1.35] text-[#141114]">{stage.tension}</h5>
                        <p className="mt-3 text-[13px] leading-[1.55] text-[#5c5960]">{stage.detail}</p>
                        <div className="mt-4 border-t border-[#d7d2d3] pt-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">Design opportunity</p>
                          <p className="mt-1 text-[13px] font-medium leading-[1.55] text-[#141114]">{stage.opportunity}</p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-[14px] bg-[#141114] px-4 py-3 text-[13px] leading-[1.5] text-white">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f8df36]" aria-hidden="true" />
                    <span><strong>Design principle:</strong> Protect clinical capacity by making availability reliable, routine tasks self-serve, and exceptions easy to resolve.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {caseStudy.slug === "calendar-keeper" ? (
          <section className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "define" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-[1080px]">
              <h2 className="mx-auto mt-3 max-w-[720px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle("A return visit, from search to confirmation")}
              </h2>
              <p className="mx-auto mb-8 mt-5 max-w-[720px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">A returning patient needs a fast, familiar path. Uncertainty at any step turns a routine change into another call to the practice.</p>

              <div className="overflow-x-auto rounded-[24px] border border-[#d7d2d3] bg-[#faf8f7] shadow-[0_12px_32px_rgba(20,17,20,0.06)]">
                <div className="min-w-[920px] p-5 md:p-7">
                  <div className="grid grid-cols-5 gap-3 border-b border-[#d7d2d3] pb-4">
                    {[
                      { step: "01", title: "Find a time", moment: "Look for an available follow-up appointment" },
                      { step: "02", title: "Choose a visit", moment: "Confirm practitioner, visit type, and location" },
                      { step: "03", title: "Identify quickly", moment: "Use the details already on file" },
                      { step: "04", title: "Get certainty", moment: "Receive a clear, durable confirmation" },
                      { step: "05", title: "Manage the booking", moment: "Rebook or change plans without starting over" },
                    ].map((stage) => (
                      <div key={stage.step}>
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-[#0E6FB4]">{stage.step}</p>
                        <h4 className="font-inter text-[16px] font-semibold leading-[1.25] text-[#141114]">{stage.title}</h4>
                        <p className="mt-2 text-[12px] leading-[1.5] text-[#5c5960]">{stage.moment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-5 gap-3">
                    {[
                      {
                        tension: "Availability feels like a dead end",
                        detail: "When the right appointment is not visible, patients cannot tell whether to wait, try again, or call the practice.",
                        opportunity: "Explain availability and offer a clear next step.",
                        tone: "border-[#d7d2d3] bg-[#fffdf5]",
                      },
                      {
                        tension: "Key details are inconsistent",
                        detail: "Unclear practitioner information or appointment options make a familiar choice feel risky.",
                        opportunity: "Make visit details reliable and easy to compare.",
                        tone: "border-[#d7d2d3] bg-[#f5faff]",
                      },
                      {
                        tension: "Registration repeats unnecessary work",
                        detail: "Long forms and extra data requests add effort before a returning patient can complete a simple booking.",
                        opportunity: "Recognize returners and ask only for what changed.",
                        tone: "border-[#d7d2d3] bg-[#f8f6ff]",
                      },
                      {
                        tension: "Technical errors break trust",
                        detail: "A blank page, logout, or unclear confirmation leaves patients unsure whether their slot is actually reserved.",
                        opportunity: "Make status, recovery, and confirmation unmistakable.",
                        tone: "border-[#d7d2d3] bg-[#fff8f3]",
                      },
                      {
                        tension: "Changes return patients to the phone",
                        detail: "Without a fast self-service path to rebook, routine adjustments become another front-desk call.",
                        opportunity: "Let patients manage an existing booking in a few steps.",
                        tone: "border-[#d7d2d3] bg-[#fff7f7]",
                      },
                    ].map((stage) => (
                      <article key={stage.tension} className={`rounded-[18px] border p-4 ${stage.tone}`}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141114]">Pain point</p>
                        <h5 className="mt-2 font-inter text-[15px] font-semibold leading-[1.35] text-[#141114]">{stage.tension}</h5>
                        <p className="mt-3 text-[13px] leading-[1.55] text-[#5c5960]">{stage.detail}</p>
                        <div className="mt-4 border-t border-[#d7d2d3] pt-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">Design opportunity</p>
                          <p className="mt-1 text-[13px] font-medium leading-[1.55] text-[#141114]">{stage.opportunity}</p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-[14px] bg-[#141114] px-4 py-3 text-[13px] leading-[1.5] text-white">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f8df36]" aria-hidden="true" />
                    <span><strong>Design principle:</strong> Make a return visit feel like a continuation, not a new administrative task.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {caseStudy.slug === "calendar-keeper" ? (
          <section id="calendar-ideate" className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "ideate" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-[1080px]">
              <h2 className="mx-auto mt-3 max-w-[760px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle("How might we make the schedule trustworthy?")}
              </h2>
              <p className="mx-auto mb-8 mt-5 max-w-[760px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">The direction was a resource-aware schedule that remains understandable when the underlying infrastructure does not.</p>

              <div className="mx-auto max-w-[880px] space-y-3">
                {[
                  {
                    question: "How might we book around real clinical dependencies, not just time slots?",
                    answer: "Model the practitioner, room, equipment, and preparation time together before an appointment is confirmed.",
                  },
                  {
                    question: "How might we make a sync failure a known condition instead of a silent gap?",
                    answer: "Show a clear “Not synced” status and give staff a visible reconciliation queue.",
                  },
                  {
                    question: "How might we keep the clinic moving during an outage?",
                    answer: "Allow local appointment creation with identity pending verification, then resolve it safely when systems recover.",
                  },
                  {
                    question: "How might we help staff resolve exceptions without extra training?",
                    answer: "Prototype a simple status badge and reconciliation queue that explains what happened and what action to take next.",
                  },
                  {
                    question: "How might we make resource conflicts clear before they become double-bookings?",
                    answer: "Surface conflicts at selection time, with an available alternative that preserves the clinical setup needed for the visit.",
                  },
                  {
                    question: "How might we make backfill useful only when the clinic has enough context?",
                    answer: "Avoid relying on empty waitlist data at launch, and focus the first experience on dependable core booking instead.",
                  },
                ].map((item, index) => (
                  <article key={item.question} className="overflow-hidden rounded-[18px] border border-[#d7d2d3] bg-[#faf8f7]">
                    <button
                      type="button"
                      onClick={() => setExpandedHmwIndex((current) => current === index ? null : index)}
                      aria-expanded={expandedHmwIndex === index}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white"
                    >
                      <span className="shrink-0 text-[11px] font-semibold tracking-[0.18em] text-[#0E6FB4]">HMW {String(index + 1).padStart(2, "0")}</span>
                      <h3 className="flex-1 font-inter text-[17px] font-semibold leading-[1.35] text-[#141114]">{item.question}</h3>
                      <ChevronRight className={`h-5 w-5 shrink-0 text-[#0E6FB4] transition-transform ${expandedHmwIndex === index ? "rotate-90" : "-rotate-90"}`} />
                    </button>
                    {expandedHmwIndex === index ? <div className="border-t border-[#d7d2d3] bg-white px-5 py-4"><p className="text-[14px] leading-[1.65] text-[#5c5960]">{item.answer}</p></div> : null}
                  </article>
                ))}
              </div>

              <div className="mt-10 space-y-10">
                <LowFiFlowMap
                  persona="Calendar Keeper / Medical Assistant"
                  description="A low-fidelity operational flow that prioritizes visibility, constraint checking, and recovery when the schedule changes."
                  steps={[
                    { title: "Today’s schedule", caption: "Start-of-day overview", rows: ["Sync status: check", "8 appointments", "2 pending changes"], action: "Review alerts" },
                    { title: "Incoming request", caption: "Call, message, or walk-in", rows: ["Patient", "Request type", "Preferred time"], action: "Find availability" },
                    { decision: "Slot + resources available?" },
                    { title: "Schedule visit", caption: "Confirm the right setup", rows: ["Practitioner", "Room / equipment", "Visit duration"], action: "Hold slot" },
                    { title: "Resolve exception", caption: "Make recovery visible", rows: ["Conflict reason", "Suggested alternative", "Notify patient"], action: "Apply update" },
                    { title: "Calendar updated", caption: "Reliable shared record", rows: ["Status: confirmed", "Audit trail", "Team notified"], action: "Done" },
                  ]}
                />
                <LowFiFlowMap
                  persona="Returning Patient"
                  description="A low-fidelity self-service flow designed to make a familiar appointment quick to find, confirm, and manage."
                  steps={[
                    { title: "Return to booking", caption: "Recognize the patient", rows: ["Email or mobile", "Date of birth", "Privacy reassurance"], action: "Continue" },
                    { title: "Choose a visit", caption: "See relevant options", rows: ["Preferred practitioner", "Visit type", "Available times"], action: "Select a time" },
                    { decision: "Suitable time available?" },
                    { title: "Confirm details", caption: "Ask only what changed", rows: ["Contact details", "Reason for visit", "Appointment summary"], action: "Confirm booking" },
                    { title: "Booking confirmed", caption: "Provide certainty", rows: ["Date and time", "Practice details", "Confirmation saved"], action: "Manage booking" },
                    { title: "Manage appointment", caption: "Rebook without calling", rows: ["Change time", "Cancel visit", "Book for dependent"], action: "Save changes" },
                  ]}
                />
              </div>

              <div className="mx-auto mt-6 max-w-[820px] text-center text-[14px] leading-[1.65] text-[#5c5960]">
                <p><strong className="text-[#141114]">Strategic focus:</strong> Data sovereignty and MFA-first workflows are entry requirements. The defensible advantage is reliable, resource-aware scheduling, especially in degraded mode.</p>
              </div>
              <div className="mx-auto mt-12 max-w-[820px]">
                <div className="text-center">
                  <h3 className="mt-3 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">Prioritizing the first flows</h3>
                </div>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <article className="rounded-[20px] border border-[#d7d2d3] bg-[#faf8f7] p-6">
                    <h4 className="font-inter text-[15px] font-semibold leading-[1.4] text-[#0E6FB4]">Why these two users first</h4>
                    <div className="mt-3 space-y-3 text-[14px] leading-[1.7] text-[#5c5960]">
                      <p>The Calendar Keeper owns the most complex, high-impact work: coordinating practitioners, rooms, equipment, changes, and recovery when systems fail.</p>
                      <p>Returning patients create the most frequent, predictable requests. Designing a fast self-service path for them removes routine calls before they reach the clinic team.</p>
                    </div>
                  </article>
                  <article className="rounded-[20px] border border-[#d7d2d3] bg-[#faf8f7] p-6">
                    <h4 className="font-inter text-[15px] font-semibold leading-[1.4] text-[#0E6FB4]">Why the other users are not separate first flows</h4>
                    <div className="mt-3 space-y-3 text-[14px] leading-[1.7] text-[#5c5960]">
                      <p>Caregivers can extend the returning-patient experience through the same identity and appointment-management foundation.</p>
                      <p>Older and lower-digital-literacy patients shape accessibility across every screen, while doctors and clinicians benefit from a reliable shared schedule but do not manage the repeated coordination work this console removes.</p>
                    </div>
                  </article>
                </div>
              </div>
              <p className="mx-auto mt-8 max-w-[820px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">The low-fi flows keep availability, constraints, and the next action visible: staff can resolve exceptions without losing context, while patients can complete routine changes without returning to the phone.</p>
            </div>
          </section>
        ) : null}

        </>
      )}

      {caseStudy.slug === "protecta" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="max-w-[900px]">
            <div className="mb-8 text-left">
              <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                AI-Augmented <span className="font-playfair font-normal italic">Delivery Workflow</span>
              </h2>
              <p className="mt-5 max-w-[820px] font-inter text-[17px] leading-[1.7] text-[#5c5960]">{PROTECTA_DECISION_MODEL[localizedLanguage].body}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {caseStudy.methodology.steps.map((step, index) => (
                <article key={step.step} className="rounded-[20px] border border-[#d7d2d3] bg-white p-6">
                  <p className="font-inter text-[11px] font-semibold tracking-[0.18em] text-[#0E6FB4]">{step.step}</p>
                  <h3 className="mt-3 font-inter text-[20px] font-semibold leading-[1.35] text-[#141114]">{step.label}</h3>
                  <p className="mt-3 font-inter text-[14px] leading-[1.65] text-[#5c5960]">{PROTECTA_WORKFLOW_SUMMARIES[localizedLanguage][index] ?? step.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(PROTECTA_WORKFLOW_TOOLS[index] ?? []).map((tool) => (
                      <span key={tool} className="rounded-full bg-[#E0EEFB] px-2 py-1 font-inter text-[10px] font-semibold text-[#0E6FB4]">{tool}</span>
                    ))}
                  </div>
                </article>
              ))}
            <div className="hidden mt-5 grid gap-5 md:col-span-3 lg:grid-cols-3">
              <article className="overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-white">
                <div className="min-h-[224px] bg-[#17302d] p-4">
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60"><span>Claude Design</span><span>Exploration</span></div>
                  <div className="mt-4 rounded-[14px] bg-[#f8f5ed] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                    <div className="flex items-center justify-between"><span className="font-inter text-[15px] text-[#154f4d]">Protecta</span><span className="rounded-full border border-[#c9dacb] px-2 py-1 text-[7px] font-semibold text-[#47675f]">EN&nbsp; / &nbsp;ES</span></div>
                    <p className="mt-5 max-w-[180px] font-inter text-[22px] leading-[1.05] text-[#154f4d]">Coverage that shows up for you.</p>
                    <div className="mt-4 h-2 w-full rounded-full bg-[#d8e1d2]" /><div className="mt-2 h-2 w-4/5 rounded-full bg-[#d8e1d2]" />
                    <span className="mt-5 inline-flex rounded-full bg-[#d96c4b] px-3 py-2 text-[8px] font-semibold text-white">Get a free quote</span>
                  </div>
                </div>
                <div className="p-4"><h4 className="font-inter text-[16px] font-semibold text-[#0e2951]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[0].title}</h4><p className="mt-2 font-inter text-[12px] leading-[1.55] text-[#5c7792]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[0].body}</p></div>
              </article>
              <article className="overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-white">
                <div className="min-h-[224px] bg-[#f1f4f8] p-4">
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-[#5c7792]"><span>Figma AI</span><span>Components</span></div>
                  <div className="mt-4 grid grid-cols-[1.15fr_.85fr] gap-3">
                    <div className="rounded-[12px] border border-[#b6d7f1] bg-white p-3 shadow-sm"><p className="text-[8px] font-semibold text-[#0e2951]">Hero / Default</p><p className="mt-3 font-inter text-[17px] leading-[1.05] text-[#154f4d]">Care that stays with you.</p><span className="mt-4 inline-flex rounded-full bg-[#d96c4b] px-2.5 py-1.5 text-[7px] font-semibold text-white">Quote</span></div>
                    <div className="space-y-2"><div className="rounded-[10px] border border-dashed border-[#1183D0] bg-[#e8f4fd] p-2"><p className="text-[7px] font-semibold text-[#0E6FB4]">Button</p><div className="mt-2 rounded-full bg-[#154f4d] px-2 py-1.5 text-center text-[7px] font-semibold text-white">Primary</div></div><div className="rounded-[10px] border border-dashed border-[#1183D0] bg-[#e8f4fd] p-2"><p className="text-[7px] font-semibold text-[#0E6FB4]">Language</p><div className="mt-2 flex rounded-full bg-white p-0.5 text-[7px]"><span className="rounded-full bg-[#154f4d] px-1.5 py-1 text-white">EN</span><span className="px-1.5 py-1 text-[#47675f]">ES</span></div></div></div>
                  </div>
                </div>
                <div className="p-4"><h4 className="font-inter text-[16px] font-semibold text-[#0e2951]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[1].title}</h4><p className="mt-2 font-inter text-[12px] leading-[1.55] text-[#5c7792]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[1].body}</p></div>
              </article>
              <article className="overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-white">
                <div className="min-h-[224px] bg-[#0e2951] p-4">
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b8dfff]"><span>Storybook</span><span>Button / Docs</span></div>
                  <div className="mt-4 rounded-[12px] bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,.18)]"><div className="flex gap-1.5 border-b border-[#e6eef5] pb-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1183D0]" /><span className="h-1.5 w-1.5 rounded-full bg-[#83cef8]" /><span className="ml-1 text-[7px] font-semibold text-[#5c7792]">Components / Button</span></div><div className="mt-4 rounded-[10px] bg-[#f6f9fb] p-3"><button type="button" className="rounded-full bg-[#d96c4b] px-3 py-2 text-[8px] font-semibold text-white">Get a free quote</button><p className="mt-3 text-[7px] text-[#5c7792]">Default · hover · focus · disabled</p></div></div>
                </div>
                <div className="p-4"><h4 className="font-inter text-[16px] font-semibold text-[#0e2951]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[2].title}</h4><p className="mt-2 font-inter text-[12px] leading-[1.55] text-[#5c7792]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[2].body}</p></div>
              </article>
            </div>
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "protecta" && researchBlock ? (
        <section className="bg-[#faf8f7] py-10">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 xl:px-20">
            <div className="max-w-[900px]">
              <div className="mb-8 text-left">
                <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                  {localizedLanguage === "es" ? "Captura +" : "Capture +"}{" "}
                  <span className="font-playfair font-normal italic">{researchBlock.title}</span>
                </h2>
              </div>
              <div className="px-0 py-2">
                {researchBlock.body?.split(/\n+/).map((paragraph, index) => <p key={index} className="mb-4 last:mb-0 font-inter text-[17px] leading-[1.8] text-[#5c5960]">{paragraph.trim()}</p>)}
                <a href="https://notebook.google.com/notebook/4ce934be-90fa-44ad-9770-9b2bef5ffbb2" target="_blank" rel="noreferrer" className="mt-6 inline-flex font-inter text-[14px] font-semibold text-[#0E6FB4] underline underline-offset-4">{translate("caseStudy.openNotebookResearch")}</a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "protecta" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="max-w-[900px] text-left">
            <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {PROTECTA_BRAND_CONTENT_COPY[localizedLanguage].title}{" "}
              <span className="font-playfair font-normal italic">{PROTECTA_BRAND_CONTENT_COPY[localizedLanguage].titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-[820px] font-inter text-[17px] leading-[1.7] text-[#5c5960]">{PROTECTA_BRAND_CONTENT_COPY[localizedLanguage].body}</p>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <article className="overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white">
                <div className="bg-[#154f4d] p-5 text-[#fdfcfe]">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#cfe3ad]">Visual direction</p>
                  <p className={`mt-8 max-w-[250px] text-[30px] leading-[1.02] ${newsreader.className}`}>Coverage that actually shows up.</p>
                  <div className="mt-8 flex gap-2">
                    <span className="h-6 w-6 rounded-full bg-[#cfe3ad]" />
                    <span className="h-6 w-6 rounded-full bg-[#fdfcfe]" />
                    <span className="h-6 w-6 rounded-full bg-[#d96c4b]" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-inter text-[18px] font-semibold text-[#141114]">Warm, premium, human</h3>
                  <p className="mt-2 font-inter text-[14px] leading-[1.65] text-[#5c5960]">Deep pine grounds the system; cream and warm accents keep insurance guidance calm and approachable.</p>
                </div>
              </article>

              <article className="overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white">
                <div className="bg-[#fdfcfe] p-5">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#5c5960]">Message hierarchy</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#d96c4b]">Complete family protection</p>
                      <p className={`mt-1 text-[23px] leading-[1.05] text-[#154f4d] ${newsreader.className}`}>Coverage that shows up for you.</p>
                    </div>
                    <div className="border-t border-[#d7d2d3] pt-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#d96c4b]">Protección familiar completa</p>
                      <p className={`mt-1 text-[23px] leading-[1.05] text-[#154f4d] ${newsreader.className}`}>Cobertura que está contigo.</p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-inter text-[18px] font-semibold text-[#141114]">English and Spanish, equally considered</h3>
                  <p className="mt-2 font-inter text-[14px] leading-[1.65] text-[#5c5960]">Each language gets its own clear hierarchy and natural phrasing, not a translated afterthought.</p>
                </div>
              </article>

              <article className="overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white">
                <div className="bg-[#f8f5ed] p-5">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#5c5960]">Voice + content system</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Warm', 'Clear', 'Supportive'].map((tone) => (
                      <span key={tone} className="rounded-full bg-white px-3 py-1.5 font-inter text-[11px] font-semibold text-[#154f4d]">{tone}</span>
                    ))}
                  </div>
                  <p className="mt-7 font-inter text-[15px] leading-[1.6] text-[#154f4d]">Problem <span className="px-1 text-[#d96c4b]">→</span> Explanation <span className="px-1 text-[#d96c4b]">→</span> Solution <span className="px-1 text-[#d96c4b]">→</span> Next step</p>
                </div>
                <div className="p-5">
                  <h3 className="font-inter text-[18px] font-semibold text-[#141114]">Guide before selling</h3>
                  <p className="mt-2 font-inter text-[14px] leading-[1.65] text-[#5c5960]">Short, plain-spoken content builds confidence first, then invites a conversation when the family is ready.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" ? (
        <>
          {showStickyTaskTabs ? (
            <div className="fixed inset-x-0 top-[88px] z-40 border-b border-[#d7e8f7] bg-white/95 backdrop-blur lg:top-0">
              <div className="mx-auto max-w-[1200px] px-6 pt-0 pb-0 md:px-10 xl:px-20">
                <div className="w-full lg:mx-auto lg:max-w-[900px]">
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsReverseTechTaskMenuOpen((current) => !current)}
                      className="flex w-full items-center justify-between rounded-[18px] border border-[#d7e8f7] bg-white px-4 py-3 text-left shadow-[0_12px_28px_rgba(17,131,208,0.08)]"
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">{translate("caseStudy.tasks")}</p>
                        <p className="mt-1 text-[14px] font-semibold text-[#0e2951]">{activeReverseTechTaskLabel}</p>
                      </div>
                      <Menu className="h-5 w-5 text-[#0e2951]" />
                    </button>
                    {isReverseTechTaskMenuOpen ? (
                      <div className="mt-3 flex flex-col border-b border-[#d7e8f7]">
                        {reverseTechTaskTabs.map((item) => (
                          <button
                            key={`sticky-mobile-${item.label}`}
                            type="button"
                            onClick={() => handleReverseTechTaskTabChange(item.id)}
                            className={`relative px-4 py-3 text-left transition-colors ${
                              reversetechTaskTab === item.id ? "text-[#0E6FB4]" : "text-[#0e2951] hover:text-[#0E6FB4]"
                            }`}
                          >
                            <span className="text-[13px] font-semibold">{item.label}</span>
                            {reversetechTaskTab === item.id ? (
                              <span className="absolute inset-x-0 -bottom-px h-1 bg-[#1183D0]" />
                            ) : null}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="hidden flex-wrap items-end justify-center gap-0 border-b border-[#d7e8f7] lg:flex">
                    {reverseTechTaskTabs.map((item) => (
                      <button
                        key={`sticky-${item.label}`}
                        type="button"
                        onClick={() => handleReverseTechTaskTabChange(item.id)}
                        className={`relative px-5 py-3 text-center transition-colors ${
                          reversetechTaskTab === item.id ? "text-[#0E6FB4]" : "text-[#5c7792] hover:text-[#0E6FB4]"
                        }`}
                      >
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">{item.label}</p>
                        {reversetechTaskTab === item.id ? (
                          <span className="absolute inset-x-0 -bottom-px h-1 bg-[#1183D0]" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <section ref={reversetechTaskTabsRef} className="mx-auto max-w-[1200px] px-6 py-2 md:px-10 xl:px-20">
            <div className="w-full border-b border-[#d7e8f7] lg:mx-auto lg:max-w-[900px]">
              <div className="pb-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsReverseTechTaskMenuOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-[18px] border border-[#d7e8f7] bg-white px-4 py-3 text-left shadow-[0_12px_28px_rgba(17,131,208,0.08)]"
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">{translate("caseStudy.tasks")}</p>
                    <p className="mt-1 text-[14px] font-semibold text-[#0e2951]">{activeReverseTechTaskLabel}</p>
                  </div>
                  <Menu className="h-5 w-5 text-[#0e2951]" />
                </button>
                {isReverseTechTaskMenuOpen ? (
                  <div className="mt-3 flex flex-col border-b border-[#d7e8f7]">
                    {reverseTechTaskTabs.map((item) => (
                      <button
                        key={`mobile-${item.label}`}
                        type="button"
                        onClick={() => handleReverseTechTaskTabChange(item.id)}
                        className={`relative px-4 py-3 text-left transition-colors ${
                          reversetechTaskTab === item.id ? "text-[#0E6FB4]" : "text-[#0e2951] hover:text-[#0E6FB4]"
                        }`}
                      >
                        <span className="text-[13px] font-semibold">{item.label}</span>
                        {reversetechTaskTab === item.id ? (
                          <span className="absolute inset-x-0 -bottom-px h-1 bg-[#1183D0]" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="hidden flex-wrap items-end justify-center gap-0 border-b border-[#d7e8f7] lg:flex">
                {reverseTechTaskTabs.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleReverseTechTaskTabChange(item.id)}
                    className={`relative px-5 py-4 text-center transition-colors ${
                      reversetechTaskTab === item.id ? "text-[#0E6FB4]" : "text-[#5c7792] hover:text-[#0E6FB4]"
                    }`}
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">{item.label}</p>
                    {reversetechTaskTab === item.id ? (
                      <span className="absolute inset-x-0 -bottom-px h-1 bg-[#1183D0]" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {taskDetailBlock && (caseStudy.slug !== "reversetech" || reversetechTaskTab === "task1") ? (
        <section id="rt-funnel-diagnosis" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading
            eyebrow={caseStudy.slug === "reversetech" ? undefined : taskDetailBlock.title}
            title={reverseTechTaskDetailHeading ?? taskDetailBlock.title}
            centered={caseStudy.slug !== "reversetech"}
            className="mb-12"
          />
          <div className="mx-auto max-w-[1040px]">
            {taskDetailBlock.body ? (
              <div className="mb-8 max-w-[820px] space-y-4">
                {taskDetailBlock.body.split(/\n+/).map((paragraph, idx) => (
                  <p key={idx} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            ) : null}
            {taskDetailTable.length ? (
              <div className="overflow-hidden rounded-[24px] border border-[#dadde1] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.08)]">
                <div className="border-b border-[#dadde1] px-6 py-5">
                  <h3 className="text-[18px] font-semibold text-[#1c1e21]">{translate("caseStudy.funnelChurnSnapshot")}</h3>
                  <p className="mt-1 text-[13px] text-[#65676b]">
                    {translate("caseStudy.funnelChurnSnapshotSubtitle")}
                  </p>
                </div>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full border-collapse text-[13px]">
                    <thead>
                      <tr className="bg-[#f5f6f7] text-left text-[11px] font-medium leading-[1.4] text-[#65676b]">
                        {[
                          translate("caseStudy.eventStep"),
                          translate("caseStudy.performance"),
                          translate("caseStudy.churnCount"),
                          translate("caseStudy.churnPercentHeader"),
                          translate("caseStudy.userCount"),
                          translate("caseStudy.remainingPercentHeader"),
                        ].map((label, index) => (
                          <th
                            key={label}
                            className={`px-4 py-3 ${index < 5 ? "border-b border-r border-[#ebedf0]" : "border-b border-[#ebedf0]"}`}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {taskDetailTable.map((row, rowIndex) => (
                        <tr key={`${row.step}-${rowIndex}`} className="bg-white">
                          <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#1c1e21]">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium">{formatReverseTechStepTitle(row.step, language)}</span>
                                {typeof row.tag === "string" ? (
                                  <span className="inline-flex rounded-[4px] bg-[#dbeafe] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#1e40af]">
                                    {row.tag}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#65676b]">
                            {(() => {
                              const performance = getReverseTechPerformanceLabel(row.step, language);
                              return performance ? (
                                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] ${performance.className}`}>
                                  {performance.label}
                                </span>
                              ) : (
                                <span
                                  className="inline-block h-3 w-3 rounded-full"
                                  style={{ backgroundColor: typeof row.dotColor === "string" ? row.dotColor : "#22c55e" }}
                                />
                              );
                            })()}
                          </td>
                          <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#65676b]">
                            {typeof row.churnCount === "string" ? row.churnCount : ""}
                          </td>
                          <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#65676b]">
                            {typeof row.churnPercent === "string" ? row.churnPercent : ""}
                          </td>
                          <td className="border-b border-r border-[#ebedf0] px-4 py-4 text-[#65676b]">
                            {typeof row.userCount === "string" ? row.userCount : ""}
                          </td>
                          <td className="border-b border-[#ebedf0] px-4 py-4 text-[#65676b]">
                            {typeof row.remainingPercent === "string" ? row.remainingPercent : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid gap-4 p-5 md:hidden">
                  {taskDetailTable.map((row, rowIndex) => (
                    <Card key={`mobile-${row.step}-${rowIndex}`}>
                      <CardContent className="space-y-4 px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[18px] font-semibold text-[#0e2951]">
                                {formatReverseTechStepTitle(row.step, language)}
                              </p>
                              {(() => {
                                const performance = getReverseTechPerformanceLabel(row.step, language);
                                return performance ? (
                                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] ${performance.className}`}>
                                    {performance.label}
                                  </span>
                                ) : (
                                  <span
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: typeof row.dotColor === "string" ? row.dotColor : "#22c55e" }}
                                  />
                                );
                              })()}
                              {typeof row.tag === "string" ? (
                                <span className="inline-flex rounded-[4px] bg-[#dbeafe] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#1e40af]">
                                  {row.tag}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[12px] leading-[1.5] text-[#5c7792]">
                          <div>
                            <p className="font-semibold text-[#0e2951]">{translate("caseStudy.churnCountMobile")}</p>
                            <p className="mt-1">{typeof row.churnCount === "string" ? row.churnCount : ""}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0e2951]">{translate("caseStudy.churnPercentMobile")}</p>
                            <p className="mt-1">{typeof row.churnPercent === "string" ? row.churnPercent : ""}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0e2951]">{translate("caseStudy.userCountMobile")}</p>
                            <p className="mt-1">{typeof row.userCount === "string" ? row.userCount : ""}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0e2951]">{translate("caseStudy.remainingPercentMobile")}</p>
                            <p className="mt-1">{typeof row.remainingPercent === "string" ? row.remainingPercent : ""}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="border-t border-[#dadde1] bg-[#f5f6f7] px-6 py-4 text-[11px] text-[#65676b]">
                  {translate("caseStudy.funnelSnapshotSource")}
                </div>
              </div>
            ) : null}
            {taskDetailAnalyses.length ? (
              <div className="mt-14 space-y-14">
                {taskDetailAnalyses.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    id={
                      typeof item.title === "string"
                        ? item.title.includes("Age Step")
                          ? "rt-age-step"
                          : item.title.includes("Main goal")
                            ? "rt-main-goal"
                            : item.title.includes("Enter Email")
                              ? "rt-enter-email"
                              : undefined
                        : undefined
                    }
                    className="mx-auto max-w-[860px] scroll-mt-24"
                  >
                    <div className={`grid items-start gap-8 ${typeof item.image === "string" ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : ""}`}>
                      <div>
                        <div className="space-y-3">
                          <h3 className="text-[22px] font-semibold leading-[1.3] text-[#1c1e21]">
                            {formatReverseTechStepTitle(item.title, language)}
                          </h3>
                          {(() => {
                            const performance = getReverseTechStepTag(item.title, language);
                            return performance ? (
                              <div>
                                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] ${performance.className}`}>
                                  {performance.label}
                                </span>
                              </div>
                            ) : null;
                          })()}
                        </div>
                        <div className="mt-4 space-y-4">
                          {typeof item.body === "string"
                            ? item.body.split(/\n{2,}/).map((paragraph, paragraphIndex) => (
                              <p key={paragraphIndex} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                                {paragraph}
                              </p>
                            ))
                            : null}
                        </div>
                      </div>
                      {typeof item.image === "string" ? (
                        <div className="w-full max-w-[260px] overflow-hidden rounded-[24px] border border-[#dadde1] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.08)]">
                          <img
                            src={withBasePath(item.image)}
                            alt={formatReverseTechStepTitle(item.title, language) || translate("caseStudy.analysisReference")}
                            className="h-auto w-full"
                          />
                        </div>
                      ) : null}
                    </div>
                    {typeof item.consideration === "string" ? (
                      <div className="mt-6 w-full rounded-[16px] bg-[#f5f6f7] px-5 py-4 text-left">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">
                          Consideration
                        </p>
                        <p className="mt-2 font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                          {item.consideration}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "flock-accessibility-system" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 xl:px-20">
          <div className="mb-12">
            <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              Audit to <span className="block font-playfair font-normal italic">Systemization</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {caseStudy.methodology.steps.map((step, index) => (
              <div key={step.step} className="flex flex-col gap-4">
                <div
                  className="flex flex-1 flex-col gap-2 rounded-2xl p-5"
                  style={{ backgroundColor: index % 2 === 0 ? "#1183D020" : "#f8df3633" }}
                >
                  <div
                    className="w-full rounded-xl"
                    style={{ height: 10, backgroundColor: index % 2 === 0 ? "#1183D0" : "#f8df36" }}
                  />
                  <p className="mt-2 font-inter text-[15px] font-semibold text-[#3c3e3f]">
                    {step.step}. {step.label}
                  </p>
                  <p className="font-inter text-[14px] leading-[1.625em] text-[#5c5960]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "flock-accessibility-system" ? (
        <>
          <section className="mx-auto max-w-[1200px] px-6 py-6 md:px-10 xl:px-20">
            <div className="py-6">
              <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                  <CardContent className="px-0 py-4 text-left lg:flex lg:min-h-[420px] lg:flex-col lg:justify-center">
                    <div className="space-y-4">
                      <h2 className="mb-6 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                        {renderNayyaEditorialTitle("Accessibility Audit")}
                      </h2>
                      <p className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                        Existing Confluence documentation and the product were reviewed to identify missing patterns and determine which could be retained within the new library structure.
                      </p>
                      <p className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                        Issues were organized by severity, system impact, and implementation complexity, while distinguishing between accessibility gaps and system inconsistencies.
                      </p>
                      <p className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                        Audit findings were translated into reusable system guidance by separating accessibility issues from pattern decisions and documenting expected component behavior.
                      </p>
                      <p className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                        Accessibility checks were conducted using Axe and VoiceOver to analyze issues across desktop and mobile.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <a
                  href={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-ui.svg")}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                    <div className="overflow-hidden rounded-[24px] border border-[#d7d2d3] bg-white shadow-[0_18px_40px_rgba(69,16,68,0.16)]">
                    <img
                      src={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-ui.svg")}
                      alt="Flock button accessibility audit examples"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                  <p className="mt-4 text-center font-inter text-[13px] leading-[1.6] text-[#5c7792]">
                    Open image to zoom
                  </p>
                </a>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
            <h2 className="mb-10 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              Before &amp; After
              <span className="block">
                Accessibility <span className="font-playfair font-normal italic">Updates</span>
              </span>
            </h2>
            <p className="mb-10 max-w-[860px] text-left font-inter text-[17px] leading-[1.7] text-[#5c5960]">
              Each example below shows how the same product patterns were reworked to improve hierarchy, navigation, controls, and clarity without relying on the original branded UI.
            </p>
            <FlockChecklistShowcase />
          </section>
        </>
      ) : null}

      {caseStudy.slug !== "nayya-ai-benefits" && caseStudy.slug !== "flock-accessibility-system" && caseStudy.slug !== "i9-everify-integration" && caseStudy.slug !== "calendar-keeper" && caseStudy.slug !== "protecta" && (caseStudy.constraints?.length ?? 0) > 0 ? (
        <section id="rt-design-proposal" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title="Constraints" centered className="mb-12" />
          <div className="grid gap-6 md:grid-cols-2">
            {(caseStudy.constraints ?? []).map((item) => (
              <Card key={item} className="p-0 py-0">
                <CardContent className="p-8">
                  <Badge>Constraint</Badge>
                  <p className="mt-4 font-inter text-[22px] leading-[1.85] text-[#5c7792]">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG && findBlock("research") ? (() => {
        const block = findBlock("research")!;
        const items = getPayloadList(block.payload, "items");

        return (
          <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
            <SectionHeading title={block.title} centered className="mb-12" />
            <div className="mx-auto max-w-[820px] text-center">
              {block.body ? block.body.split(/\n+/).map((paragraph, idx) => (
                <p key={idx} className="mb-4 font-inter text-[16px] leading-[1.7] text-[#5c7792] last:mb-0">
                  {paragraph.trim()}
                </p>
              )) : null}
              {items.length ? (
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })() : null}

      {(caseStudy.slug === "nayya-ai-benefits" ||
        caseStudy.slug === "i9-everify-integration" ||
        caseStudy.slug === "flock-accessibility-system" ||
        (caseStudy.slug !== "calendar-keeper" && designStrategy.length > 0 && (caseStudy.slug !== "reversetech" || reversetechTaskTab === "task1"))) ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          {caseStudy.slug === "nayya-ai-benefits" ? (
          <>
            <h2 className="mb-6 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle(designProposalTitle)}
            </h2>
            <div className="max-w-[900px] space-y-5">
              {designStrategy.map((item) => (
                <p key={item} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">{item}</p>
              ))}
            </div>
          </>
          ) : caseStudy.slug === "i9-everify-integration" ? (
          <>
            <h2 className="mb-6 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle(designProposalTitle)}
            </h2>
            <div className="mb-10 max-w-[900px] space-y-5">
              <p className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                Made I-9 feel like part of Flex onboarding rather than a disconnected compliance task by aligning it with existing onboarding patterns and designing a dedicated company settings flow to configure and manage the integration.
              </p>
            </div>
            <div className="mx-auto max-w-[1100px]">
              <img
                src={withBasePath("/images/projects/i9-everify-integration/banners/i9-admin-design-process.svg")}
                alt="I-9 admin interface design"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-10 max-w-[900px] space-y-5">
              {designStrategy.map((item) => (
                <p key={item} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">{item}</p>
              ))}
            </div>
            <div className="mt-10 max-w-[1100px]">
              <div>
                <div className="mt-6">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-employee-design-process.svg")}
                    alt="I-9 employee interface design"
                    className="h-auto w-full"
                  />
                </div>
                <div className="my-10 max-w-[900px] space-y-5">
                  <p className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                    Keep completed documents, progress indicators, and follow-up actions visible after the vendor experience.
                  </p>
                </div>
                <div className="mt-6">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-admin-experience.svg")}
                    alt="I-9 admin experience"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </>
          ) : caseStudy.slug === "flock-accessibility-system" ? (
          <>
            <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex justify-center lg:justify-start">
                <img
                  src={withBasePath("/images/projects/flock-accessibility-system/banners/flock-notification-banner.svg")}
                  alt="Flock notification banner design"
                  className="h-auto w-full max-w-[420px]"
                />
              </div>
              <div className="space-y-5 text-left">
                <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                  {renderNayyaEditorialTitle(designProposalTitle)}
                </h2>
                {designStrategy.map((item) => (
                  <p key={item} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">{item}</p>
                ))}
              </div>
            </div>
          </>
          ) : (
          <>
            {caseStudy.slug !== "protecta" ? (
              <SectionHeading
                title={designProposalTitle}
                centered={caseStudy.slug !== "reversetech"}
                className={caseStudy.slug === "reversetech" ? "mb-5" : "mb-12"}
              />
            ) : null}
            {caseStudy.slug === "reversetech" ? (
              <div className="max-w-[820px] space-y-8">
                {designProposalLinks.length ? (
                  <div className="flex justify-start">
                    {designProposalLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-[#1183D0]/30 px-4 py-2 font-inter text-[14px] font-semibold text-[#0E6FB4] transition-colors hover:border-[#1183D0] hover:text-[#0e2951]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                {designProposalIntro.map((item) => {
                  const markdownLink = parseStandaloneMarkdownLink(item);
                  if (markdownLink) {
                    return (
                      <p key={item} className="font-inter text-[16px] leading-[1.7]">
                        <a
                          href={markdownLink.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-[#0E6FB4] underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0e2951]"
                        >
                          {markdownLink.label}
                        </a>
                      </p>
                    );
                  }
                  return (
                    <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                      {item}
                    </p>
                  );
                })}
                {designProposalNotes.length ? (
                  <div className="space-y-5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">
                      {translate("caseStudy.aFewNotes")}
                    </p>
                    {designProposalNotes.map((item) => (
                      <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        {item}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              caseStudy.slug === "protecta" ? (
                <>
                  <div className="flex flex-col">
                  <div className="order-2 mx-auto mt-12 max-w-[1040px]">
                    <div className="max-w-[900px] text-left">
                      <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">{PROTECTA_COMPONENT_COPY[localizedLanguage].title}</h2>
                      <p className="mt-5 max-w-[820px] font-inter text-[17px] leading-[1.7] text-[#5c5960]">{PROTECTA_COMPONENT_COPY[localizedLanguage].body}</p>
                    </div>
                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                      <article className="overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-white">
                        <div className="min-h-[224px] bg-[#17302d] p-4">
                          <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60"><span>Claude Design</span><span>Exploration</span></div>
                          <div className="mt-4 rounded-[14px] bg-[#f8f5ed] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                            <div className="flex items-center justify-between"><span className="font-inter text-[15px] text-[#154f4d]">Protecta</span><span className="rounded-full border border-[#c9dacb] px-2 py-1 text-[7px] font-semibold text-[#47675f]">EN&nbsp; / &nbsp;ES</span></div>
                            <p className="mt-5 max-w-[180px] font-inter text-[22px] leading-[1.05] text-[#154f4d]">Coverage that shows up for you.</p>
                            <div className="mt-4 h-2 w-full rounded-full bg-[#d8e1d2]" /><div className="mt-2 h-2 w-4/5 rounded-full bg-[#d8e1d2]" />
                            <span className="mt-5 inline-flex rounded-full bg-[#d96c4b] px-3 py-2 text-[8px] font-semibold text-white">Get a free quote</span>
                          </div>
                        </div>
                        <div className="p-4"><h4 className="font-inter text-[16px] font-semibold text-[#0e2951]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[0].title}</h4><p className="mt-2 font-inter text-[12px] leading-[1.55] text-[#5c7792]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[0].body}</p></div>
                      </article>
                      <article className="overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-white">
                        <div className="min-h-[224px] bg-[#f1f4f8] p-4">
                          <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-[#5c7792]"><span>Figma AI</span><span>Components</span></div>
                          <div className="mt-4 grid grid-cols-[1.15fr_.85fr] gap-3">
                            <div className="rounded-[12px] border border-[#b6d7f1] bg-white p-3 shadow-sm"><p className="text-[8px] font-semibold text-[#0e2951]">Hero / Default</p><p className="mt-3 font-inter text-[17px] leading-[1.05] text-[#154f4d]">Care that stays with you.</p><span className="mt-4 inline-flex rounded-full bg-[#d96c4b] px-2.5 py-1.5 text-[7px] font-semibold text-white">Quote</span></div>
                            <div className="space-y-2"><div className="rounded-[10px] border border-dashed border-[#1183D0] bg-[#e8f4fd] p-2"><p className="text-[7px] font-semibold text-[#0E6FB4]">Button</p><div className="mt-2 rounded-full bg-[#154f4d] px-2 py-1.5 text-center text-[7px] font-semibold text-white">Primary</div></div><div className="rounded-[10px] border border-dashed border-[#1183D0] bg-[#e8f4fd] p-2"><p className="text-[7px] font-semibold text-[#0E6FB4]">Language</p><div className="mt-2 flex rounded-full bg-white p-0.5 text-[7px]"><span className="rounded-full bg-[#154f4d] px-1.5 py-1 text-white">EN</span><span className="px-1.5 py-1 text-[#47675f]">ES</span></div></div></div>
                          </div>
                        </div>
                        <div className="p-4"><h4 className="font-inter text-[16px] font-semibold text-[#0e2951]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[1].title}</h4><p className="mt-2 font-inter text-[12px] leading-[1.55] text-[#5c7792]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[1].body}</p></div>
                      </article>
                      <article className="overflow-hidden rounded-[18px] border border-[#d7e8f7] bg-white">
                        <div className="min-h-[224px] bg-[#0e2951] p-4">
                          <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b8dfff]"><span>Storybook</span><span>Button / Docs</span></div>
                          <div className="mt-4 rounded-[12px] bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,.18)]"><div className="flex gap-1.5 border-b border-[#e6eef5] pb-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1183D0]" /><span className="h-1.5 w-1.5 rounded-full bg-[#83cef8]" /><span className="ml-1 text-[7px] font-semibold text-[#5c7792]">Components / Button</span></div><div className="mt-4 rounded-[10px] bg-[#f6f9fb] p-3"><button type="button" className="rounded-full bg-[#d96c4b] px-3 py-2 text-[8px] font-semibold text-white">Get a free quote</button><p className="mt-3 text-[7px] text-[#5c7792]">Default · hover · focus · disabled</p></div></div>
                        </div>
                        <div className="p-4"><h4 className="font-inter text-[16px] font-semibold text-[#0e2951]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[2].title}</h4><p className="mt-2 font-inter text-[12px] leading-[1.55] text-[#5c7792]">{PROTECTA_HANDOFF_COPY[localizedLanguage].stages[2].body}</p></div>
                      </article>
                    </div>
                    <div className="mt-12">
                      <div className="overflow-hidden rounded-[20px] border border-[#d7e8f7] bg-white shadow-[0_14px_34px_rgba(17,131,208,0.10)]">
                        <div className="border-b border-[#d7e8f7] bg-[#f8fbff] p-2">
                          <div role="tablist" aria-label={language === "es" ? "Componentes de Protecta" : "Protecta components"} className="flex gap-1 overflow-x-auto">
                            {PROTECTA_STORYBOOK[localizedLanguage].components.map((component) => {
                              const iconKey = component.url.split("/docs/")[1]?.split("--")[0] ?? "";
                              const Icon = PROTECTA_STORYBOOK_ICONS[iconKey] ?? Component;
                              const isActive = component.url === activeProtectaStorybookUrl;
                              return (
                                <button key={component.title} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveProtectaStorybookUrl(component.url)} className={`inline-flex shrink-0 items-center gap-2 rounded-[12px] px-3 py-2 font-inter text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0] focus-visible:ring-offset-2 ${isActive ? "bg-white text-[#0E6FB4] shadow-[0_4px_12px_rgba(17,131,208,0.12)]" : "text-[#5c7792] hover:bg-white/70 hover:text-[#0e2951]"}`}>
                                  <Icon className="h-4 w-4" aria-hidden="true" /><span>{component.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 border-b border-[#d7e8f7] bg-white px-4 py-3"><span className="h-2 w-2 rounded-full bg-[#1183D0]" /><span className="h-2 w-2 rounded-full bg-[#83cef8]" /><span className="h-2 w-2 rounded-full bg-[#cfe5f8]" /><span className="ml-2 font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5c7792]">Protecta Storybook · {activeProtectaStorybookComponent.title}</span></div>
                        <iframe title={language === "es" ? `Documentación de Protecta Storybook: ${activeProtectaStorybookComponent.title}` : `Protecta Storybook ${activeProtectaStorybookComponent.title} documentation`} src={activeProtectaStorybookUrl} className="h-[520px] w-full bg-white" loading="lazy" />
                      </div>
                      <div className="mt-5 flex justify-center"><a href={PROTECTA_STORYBOOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center font-inter text-[14px] font-semibold text-[#0E6FB4] underline decoration-[#1183D0]/35 underline-offset-4 transition-colors hover:text-[#0e5a8a] hover:decoration-[#0e5a8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0] focus-visible:ring-offset-4">{PROTECTA_STORYBOOK[localizedLanguage].link}</a></div>
                    </div>
                    <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                      <div className="space-y-4">
                        <figure className="hidden">
                          <div className="overflow-hidden">
                            <img src={withBasePath("/images/projects/protecta/protecta-logo.svg")} alt="Protecta logo" className="h-auto w-full" />
                          </div>
                          <figcaption className="mt-2 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E6FB4]">{translate("caseStudy.logoDesign")}</figcaption>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {[
                              ["/images/projects/protecta/protecta-imagotype.svg", translate("caseStudy.imagotype"), "bg-[#154f4d]", ""],
                              ["/images/projects/protecta/protecta-isotype-pine.svg", translate("caseStudy.pineIsotype"), "bg-[#f8f8f4]", ""],
                              ["/images/projects/protecta/protecta-isotype-pine.svg", translate("caseStudy.whiteIsotype"), "bg-[#154f4d]", "brightness-0 invert"],
                            ].map(([src, label, background, logoClass]) => (
                              <div key={`${src}-${label}`} className="min-w-0">
                                <div className={`flex aspect-square items-center justify-center rounded-[14px] border border-[#d7e5de] p-3 ${background}`}>
                                  <img src={withBasePath(src)} alt={language === "es" ? `Variación del logotipo de Protecta: ${label}` : `${label} Protecta logo variation`} className={`h-full w-full object-contain ${logoClass}`} />
                                </div>
                                <p className="mt-1.5 text-center font-inter text-[10px] font-semibold text-[#5c7792]">{label}</p>
                              </div>
                            ))}
                          </div>
                        </figure>
                        <figure>
                          <div className="overflow-hidden rounded-[20px] border border-[#d7e5de] bg-[#154f4d] shadow-[0_14px_34px_rgba(21,79,77,0.14)]">
                            <img src={withBasePath("/images/projects/protecta/screenshots/protecta-home-desktop.png")} alt="Protecta website design" className="h-auto w-full object-cover" />
                          </div>
                        </figure>
                      </div>
                      <div className="flex flex-col gap-8">
                        <figure className="order-1">
                          <div className="overflow-hidden">
                            <img src={withBasePath("/images/projects/protecta/protecta-logo.svg")} alt="Protecta logo" className="h-auto w-full" />
                          </div>
                        </figure>
                        <div className="order-3">
                          <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-[18px] bg-white p-5"><p className="font-inter text-[28px] text-[#154f4d]">Newsreader</p><p className="mt-2 font-inter text-[12px] text-[#69807a]">{translate("caseStudy.warmEditorialType")}</p></div>
                            <div className="rounded-[18px] bg-white p-5"><p className="font-inter text-[27px] font-semibold text-[#154f4d]">Geist</p><p className="mt-2 font-inter text-[12px] text-[#69807a]">{translate("caseStudy.clearUiType")}</p></div>
                            <div className="rounded-[18px] bg-white p-5"><p className="font-mono text-[18px] font-semibold text-[#154f4d]">JetBrains Mono</p><p className="mt-2 font-inter text-[12px] text-[#69807a]">{translate("caseStudy.eyebrowsLabelsData")}</p></div>
                          </div>
                        </div>
                        <div className="order-2">
                          <div className="mt-4 grid grid-cols-5 overflow-hidden rounded-[18px]">
                            {(language === "es"
                              ? [["#154F4D", "Pino profundo"], ["#CFE3AD", "Salvia suave"], ["#FDFCFE", "Crema"], ["#D96C4B", "Arcilla"], ["#E6BE63", "Miel"]]
                              : [["#154F4D", "Deep pine"], ["#CFE3AD", "Soft sage"], ["#FDFCFE", "Cream"], ["#D96C4B", "Clay"], ["#E6BE63", "Honey"]]
                            ).map(([color, name]) => (
                              <div key={color} className="min-h-[108px] p-3" style={{ backgroundColor: color }}><p className={`text-[11px] font-semibold ${color === "#154F4D" ? "text-white" : "text-[#154f4d]"}`}>{name}</p><p className={`mt-1 text-[10px] ${color === "#154F4D" ? "text-white/80" : "text-[#154f4d]/70"}`}>{color}</p></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </>
              ) : (
                <div className="mx-auto max-w-[820px] space-y-8 text-center">
                  {designStrategy.map((item) => (
                    <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{item}</p>
                  ))}
                </div>
              )
            )}
            {caseStudy.slug === "reversetech" ? (
              <div className="mx-auto mt-12 max-w-[920px]">
                <div className="grid items-start gap-0 md:grid-cols-[320px_minmax(0,1fr)]">
                  <div className="px-6 pb-4 text-center md:pb-0">
                    <div className="mb-4 flex justify-center">
                      <div className="inline-flex rounded-full border border-[#d7e8f7] bg-[#f8fbff] p-1 shadow-[0_8px_24px_rgba(17,131,208,0.08)]">
                        <button
                          type="button"
                          onClick={() => setReversetechComparisonTab("before")}
                          aria-pressed={reversetechComparisonTab === "before"}
                          className={`min-w-[96px] rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all ${
                            reversetechComparisonTab === "before"
                              ? "reverse-tech-switch-active text-white shadow-[0_6px_16px_rgba(14,41,81,0.22)]"
                              : "text-[#5c7792]"
                          }`}
                        >
                          {translate("caseStudy.before")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setReversetechComparisonTab("after")}
                          aria-pressed={reversetechComparisonTab === "after"}
                          className={`min-w-[96px] rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all ${
                            reversetechComparisonTab === "after"
                              ? "reverse-tech-switch-active text-white shadow-[0_6px_16px_rgba(17,131,208,0.22)]"
                              : "text-[#5c7792]"
                          }`}
                        >
                          {translate("caseStudy.after")}
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: withBasePath(
                            reversetechComparisonTab === "before"
                              ? "/images/projects/Reversetech/email.png"
                              : "/images/projects/Reversetech/cta-variant-4.svg"
                          ),
                          alt: reversetechComparisonTab === "before" ? translate("caseStudy.enterEmailBefore") : translate("caseStudy.enterEmailAfter"),
                        })
                      }
                      className="block w-full text-left transition-transform hover:scale-[1.01]"
                    >
                      {reversetechComparisonTab === "before" ? (
                        <div className="mx-auto w-full max-w-[240px] rounded-[36px] bg-[#151515] p-[10px] shadow-[0_18px_40px_rgba(15,23,42,0.24)] ring-1 ring-black/10">
                          <div className="relative overflow-hidden rounded-[28px] bg-black">
                            <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-[24px] w-[120px] -translate-x-1/2 rounded-b-[18px] bg-[#151515]" />
                            <img
                              src={withBasePath("/images/projects/Reversetech/email.png")}
                              alt={translate("caseStudy.enterEmailBefore")}
                              className="h-auto w-full"
                            />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={withBasePath("/images/projects/Reversetech/cta-variant-4.svg")}
                          alt={translate("caseStudy.enterEmailAfter")}
                          className="h-auto w-full"
                        />
                      )}
                    </button>
                  </div>
                  <div className="px-6 py-6 text-left">
                    <div className="mt-3 space-y-5 font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                      <div className="px-1 py-1">
                        <div className="space-y-2">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">
                            {translate("caseStudy.designDirection")}
                          </p>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1183D0]" />
                              <span>{translate("caseStudy.designDirectionBullet1")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1183D0]" />
                              <span>{translate("caseStudy.designDirectionBullet2")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1183D0]" />
                              <span>{translate("caseStudy.designDirectionBullet3Pre")} <em>&ldquo;{translate("caseStudy.seeMyPlan")}&rdquo;</em> {translate("caseStudy.designDirectionBullet3Post")} <em>&ldquo;{translate("caseStudy.continue")}&rdquo;</em></span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="border-t border-[#d7e8f7] px-1 pt-5">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0e2951]">
                                {translate("caseStudy.lowEffortTestPath")}
                              </p>
                              <span className="inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#15803d]">
                                {translate("caseStudy.cmsReady")}
                              </span>
                            </div>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]" />
                                <span>{translate("caseStudy.lowEffortBullet1")}</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]" />
                                <span>{translate("caseStudy.lowEffortBullet2")}</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]" />
                                <span>{translate("caseStudy.lowEffortBullet3")}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#d7e8f7] px-1 pt-5">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0e2951]">
                                {translate("caseStudy.higherEffortVersion")}
                              </p>
                              <span className="inline-flex rounded-full bg-[#fee2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b91c1c]">
                                {translate("caseStudy.needsDev")}
                              </span>
                              <span className="inline-flex rounded-full bg-[#ede9fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6d28d9]">
                                {translate("caseStudy.conditionalLogic")}
                              </span>
                            </div>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b91c1c]" />
                                <span>{translate("caseStudy.higherEffortBullet1")}</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b91c1c]" />
                                <span>{translate("caseStudy.higherEffortBullet2")}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
          )}
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" && reversetechTaskTab === "task3" ? (
        <section id="rt-task-3" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title={translate("caseStudy.competitorPatternExtraction")} className="mb-8" />
          <div className="mb-8 max-w-[860px]">
            <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              {translate("caseStudy.task3Description")}
            </p>
          </div>
          <div className="w-full space-y-6">
            <h3 className="font-inter text-[22px] font-semibold leading-[1.3] text-[#0e2951]">
              {translate("caseStudy.discovery")}
            </h3>
            <ContentPanel>
              <div className="border-b border-[#d7e8f7] bg-[#f8fbff] px-6 py-4">
                <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">{translate("caseStudy.competitorAnalysis")}</p>
              </div>
              <div className="hidden md:block">
                <div className="grid grid-cols-[0.9fr_1fr_1fr_1fr_1fr] border-b border-[#d7e8f7] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0e2951]">
                  <div className="border-r border-[#d7e8f7] pr-4">{translate("caseStudy.dimension")}</div>
                  <div className="border-r border-[#d7e8f7] px-4">
                    <a
                      href={REVERSE_TECH_REVERSE_HEALTH_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 border-b border-[#1183D0]/40 pb-0.5 transition-colors hover:text-[#0E6FB4] hover:border-[#1183D0]"
                    >
                      Reverse Health
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7V15" />
                      </svg>
                    </a>
                  </div>
                  <div className="border-r border-[#d7e8f7] px-4">
                    <a
                      href={REVERSE_TECH_MUSCLE_BOOSTER_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 border-b border-[#1183D0]/40 pb-0.5 transition-colors hover:text-[#0E6FB4] hover:border-[#1183D0]"
                    >
                      Muscle Booster
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7V15" />
                      </svg>
                    </a>
                  </div>
                  <div className="border-r border-[#d7e8f7] px-4">
                    <a
                      href={REVERSE_TECH_FLO_HEALTH_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 border-b border-[#1183D0]/40 pb-0.5 transition-colors hover:text-[#0E6FB4] hover:border-[#1183D0]"
                    >
                      Flo Health
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7V15" />
                      </svg>
                    </a>
                  </div>
                  <div className="pl-4">
                    <a
                      href={REVERSE_TECH_BETTER_ME_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 border-b border-[#1183D0]/40 pb-0.5 transition-colors hover:text-[#0E6FB4] hover:border-[#1183D0]"
                    >
                      Better Me
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7V15" />
                      </svg>
                    </a>
                  </div>
                </div>
                {getReverseTechCompetitorDimensions(language).map((row) => (
                  <div
                    key={row.dimension}
                    className="grid grid-cols-[0.9fr_1fr_1fr_1fr_1fr] border-t border-[#d7e8f7] px-6 py-5 text-[15px] leading-[1.7] text-[#5c7792]"
                  >
                    <div className="border-r border-[#d7e8f7] pr-4 font-semibold text-[#0e2951]">{row.dimension}</div>
                    <div className="border-r border-[#d7e8f7] px-4">{row.reverseHealth}</div>
                    <div className="border-r border-[#d7e8f7] px-4">{row.muscleBooster}</div>
                    <div className="border-r border-[#d7e8f7] px-4">{row.floHealth}</div>
                    <div className="pl-4">{row.betterMe}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 p-5 md:hidden">
                {getReverseTechCompetitorDimensions(language).map((row) => (
                  <Card key={`mobile-${row.dimension}`} className="overflow-hidden">
                    <CardContent className="space-y-4 px-5 py-5">
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">{translate("caseStudy.dimension")}</p>
                        <p className="mt-2 text-[18px] font-semibold leading-snug text-[#0e2951]">
                          {row.dimension}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">
                          <a
                            href={REVERSE_TECH_REVERSE_HEALTH_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0E6FB4]"
                          >
                            Reverse Health
                          </a>
                        </p>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.reverseHealth}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">
                          <a
                            href={REVERSE_TECH_MUSCLE_BOOSTER_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0E6FB4]"
                          >
                            Muscle Booster
                          </a>
                        </p>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.muscleBooster}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">
                          <a
                            href={REVERSE_TECH_FLO_HEALTH_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0E6FB4]"
                          >
                            Flo Health
                          </a>
                        </p>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.floHealth}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">
                          <a
                            href={REVERSE_TECH_BETTER_ME_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0E6FB4]"
                          >
                            Better Me
                          </a>
                        </p>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.betterMe}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentPanel>

            <div className="space-y-5 pt-4">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">{translate("caseStudy.patternExtractionEyebrow")}</p>
                <h3 className="mt-3 font-inter text-[22px] font-semibold leading-[1.3] text-[#0e2951]">
                  {translate("caseStudy.whichPatternsWorthTesting")}
                </h3>
                <p className="mx-auto mt-3 max-w-[760px] font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                  {translate("caseStudy.patternsIntro")}
                </p>
              </div>

              <ContentPanel>
                <div className="hidden md:block">
                  <div className="grid grid-cols-[0.95fr_1.05fr_0.8fr_1.2fr] border-b border-[#d7e8f7] bg-[#f8fbff] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0e2951]">
                    <div className="border-r border-[#d7e8f7] pr-4">{translate("caseStudy.screenshot")}</div>
                    <div className="border-r border-[#d7e8f7] px-4">{translate("caseStudy.pattern")}</div>
                    <div className="border-r border-[#d7e8f7] px-4">{translate("caseStudy.metricMoved")}</div>
                    <div className="pl-4">{translate("caseStudy.hypothesisWhy")}</div>
                  </div>
                  {getReverseTechPatternRows(language).map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[0.95fr_1.05fr_0.8fr_1.2fr] border-t border-[#d7e8f7] px-6 py-5 text-[15px] leading-[1.7] text-[#5c7792]"
                    >
                      <div className="border-r border-[#d7e8f7] pr-4">
                        <div className="space-y-3">
                          {row.screenshotTitle ? (
                            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0e2951]">
                              {row.screenshotTitle}
                            </p>
                          ) : null}
                          <div className="flex aspect-[4/5] items-center justify-center rounded-[20px] border border-dashed border-[#b8d7ee] bg-[#f8fbff] px-4 text-center">
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                src: withBasePath(row.imageSrc),
                                alt: `${row.label} preview`,
                              })
                            }
                            className="group block h-full w-full overflow-hidden rounded-[18px] text-left"
                          >
                            <img
                              src={withBasePath(row.imageSrc)}
                              alt={`${row.label} preview`}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-r border-[#d7e8f7] px-4">
                        {"tag" in row && row.tag ? (
                          <span
                            className={`mb-3 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                              row.tag === "Avoid"
                                ? "bg-[#fee2e2] text-[#b91c1c]"
                                : "bg-[#e0f2fe] text-[#0369a1]"
                            }`}
                          >
                            {row.tag}
                          </span>
                        ) : null}
                        <p>{row.title}</p>
                      </div>
                      <div className="border-r border-[#d7e8f7] px-4">{row.metric}</div>
                      <div className="pl-4">
                        <p>{row.hypothesis}</p>
                        {"note" in row && row.note ? (
                          <div className="mt-4 rounded-[16px] border border-[#d7e8f7] bg-[#f8fbff] px-4 py-4">
                            <p className="text-[14px] leading-[1.6] text-[#7b93ab]">
                              <strong className="text-[#0e2951]">{translate("caseStudy.note")}</strong> {row.note}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 p-5 md:hidden">
                  {getReverseTechPatternRows(language).map((row) => (
                    <Card key={`pattern-mobile-${row.label}`} className="overflow-hidden">
                      <CardContent className="space-y-4 px-5 py-5">
                        <div className="space-y-3">
                          {row.screenshotTitle ? (
                            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0e2951]">
                              {row.screenshotTitle}
                            </p>
                          ) : null}
                          <div className="flex aspect-[4/3] items-center justify-center rounded-[20px] border border-dashed border-[#b8d7ee] bg-[#f8fbff] px-4 text-center">
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                src: withBasePath(row.imageSrc),
                                alt: `${row.label} preview`,
                              })
                            }
                            className="group block h-full w-full overflow-hidden rounded-[18px] text-left"
                          >
                            <img
                              src={withBasePath(row.imageSrc)}
                              alt={`${row.label} preview`}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">{translate("caseStudy.pattern")}</p>
                          {"tag" in row && row.tag ? (
                            <span
                              className={`mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                                row.tag === "Avoid"
                                  ? "bg-[#fee2e2] text-[#b91c1c]"
                                  : "bg-[#e0f2fe] text-[#0369a1]"
                              }`}
                            >
                              {row.tag}
                            </span>
                          ) : null}
                          <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.title}</p>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">{translate("caseStudy.metricMoved")}</p>
                          <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.metric}</p>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">{translate("caseStudy.hypothesisWhy")}</p>
                          <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.hypothesis}</p>
                          {"note" in row && row.note ? (
                            <div className="mt-4 rounded-[16px] border border-[#d7e8f7] bg-[#f8fbff] px-4 py-4">
                              <p className="text-[14px] leading-[1.6] text-[#7b93ab]">
                                <strong className="text-[#0e2951]">{translate("caseStudy.note")}</strong> {row.note}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentPanel>

              {hypothesisItems.length ? (
                <div id="rt-hypothesis-2" className="pt-4">
                  {reverseTechHypothesis3Accordion}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" && reversetechTaskTab === "task4" ? (
        <section id="rt-impact-metrics" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-6 pt-10 md:px-10 xl:px-20">
          <SectionHeading title={translate("caseStudy.impactMetrics")} className="mb-8" />
          <div className="mb-8 max-w-[860px]">
            <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              The existing paid-acquisition funnel converted <strong className="font-semibold text-[#0e2951]">0.63% of visitors</strong> into customers. Rather than assuming the 37-step quiz middle was the issue, I used funnel data to identify the highest-friction moments and tested a paywall that led with outcome-based value, clearer offer framing, and simpler pricing.
            </p>
          </div>
          <div className="max-w-[1040px] rounded-[20px] border border-[#d7e8f7] bg-[#f8fbff] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">Live A/B test result</p>
            <p className="mt-3 font-inter text-[25px] font-semibold leading-[1.25] text-[#0e2951] md:text-[30px]">The winning paywall increased conversion from 0.63% to 0.77%.</p>
            <p className="mt-4 max-w-[760px] text-[14px] leading-[1.7] text-[#5c7792]">Across 50,000 paid-search sessions per variant, this was a 0.14 percentage-point increase, or a 22% relative lift, 70 additional purchases at the tested volume, without increasing media spend.</p>
          </div>
          <div className="mx-auto mt-6 max-w-[1040px] rounded-[20px] border border-[#d7e8f7] bg-white p-6 md:p-7">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#d7e8f7] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#385b7a]">
                    <th className="px-3 py-3">Variant</th>
                    <th className="px-3 py-3">Sessions</th>
                    <th className="px-3 py-3">Purchases</th>
                    <th className="px-3 py-3">Conversion</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#5c7792]">
                  {[
                    ["Control", "50,000", "315", "0.63%"],
                    ["Winning variant", "50,000", "385", "0.77%"],
                  ].map(([variant, sessions, purchases, conversion]) => (
                    <tr key={variant} className={variant === "Winning variant" ? "bg-[#eef8ff] font-semibold text-[#0e2951]" : "border-b border-[#edf4fa] last:border-0"}>
                      <td className="px-3 py-4">{variant}</td>
                      <td className="px-3 py-4">{sessions}</td>
                      <td className="px-3 py-4">{purchases}</td>
                      <td className="px-3 py-4">{conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mx-auto mt-6 grid max-w-[1040px] gap-6 rounded-[20px] border border-[#d7e8f7] bg-white p-6 md:grid-cols-2 md:p-7">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">How impact was measured</p>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-[14px] leading-[1.65] text-[#5c7792]">
                <li><strong className="font-semibold text-[#0e2951]">Primary metric:</strong> completed purchase rate from paid-search sessions.</li>
                <li><strong className="font-semibold text-[#0e2951]">Diagnostic metrics:</strong> quiz completion, email-gate completion, and paywall-to-purchase conversion.</li>
                <li><strong className="font-semibold text-[#0e2951]">Guardrail metrics:</strong> refund rate, checkout errors, and conversion by device.</li>
              </ul>
            </div>
            <div className="rounded-[16px] bg-[#f8fbff] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">Evaluation criteria</p>
              <p className="mt-4 text-[14px] leading-[1.7] text-[#5c7792]">A variant needed sustained conversion improvement against the control with adequate traffic before it could be selected.</p>
            </div>
          </div>
          <p className="mt-6 max-w-[920px] font-inter text-[15px] font-medium leading-[1.7] text-[#385b7a]">I translated funnel evidence into prioritised, testable designs for the paywall conversion gap. The launched winning variant delivered a 0.14 percentage-point lift in end-to-end conversion, equivalent to 14 additional purchases per 10,000 qualified visits.</p>
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" && reversetechTaskTab === "task5" ? (
        <section id="rt-ai-implementation" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-6 pt-10 md:px-10 xl:px-20">
          <SectionHeading title={translate("caseStudy.howIUsedTools")} className="mb-8" />
          <div className="mb-8 max-w-[860px]">
            <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              {translate("caseStudy.task4Description")}
            </p>
          </div>
          {reverseTechToolsSection}
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" && reversetechTaskTab === "task1" && (ctaVariants.length || contentVariants.length) ? (
        <section className="hidden">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_20px_48px_rgba(17,131,208,0.08)]">
              <div className="border-b border-[#d7e8f7] bg-[#f8fbff] px-6 py-5">
                <h3 className="font-inter text-[20px] font-semibold leading-[1.3] text-[#0e2951]">
                  {translate("caseStudy.extraImprovingEmailCapture")}
                </h3>
                <p className="mt-2 max-w-[760px] font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                  {translate("caseStudy.extraImprovingEmailCaptureIntro")}
                </p>
              </div>
              <div className="hidden grid-cols-[0.7fr_1fr_1.2fr] gap-4 border-b border-[#d7e8f7] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0e2951] md:grid">
                <div>{translate("caseStudy.hypothesisHeader")}</div>
                <div>{translate("caseStudy.whatITested")}</div>
                <div>{translate("caseStudy.whyItMattered")}</div>
              </div>
              <div className="divide-y divide-[#e7eef6]">
                {[
                  [
                    translate("caseStudy.hypothesis1"),
                    translate("caseStudy.contentVariant"),
                    translate("caseStudy.hypothesis1Description"),
                  ],
                  [
                    translate("caseStudy.hypothesis2"),
                    translate("caseStudy.ctaVariant"),
                    translate("caseStudy.hypothesis2Description"),
                  ],
                  [
                    translate("caseStudy.hypothesis3Label"),
                    translate("caseStudy.exploratoryHypothesis"),
                    translate("caseStudy.hypothesis3Description"),
                  ],
                ].map(([label, title, description]) => (
                  <div key={label} className="grid gap-2 px-6 py-4 md:grid-cols-[0.7fr_1fr_1.2fr] md:gap-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0E6FB4]">{label}</div>
                    <div className="font-inter text-[14px] font-semibold text-[#0e2951]">{title}</div>
                    <div className="font-inter text-[14px] leading-[1.7] text-[#5c7792]">{description}</div>
                  </div>
                ))}
              </div>
            </div>
            {[
              { block: contentVariantsBlock, variants: contentVariants },
              { block: ctaVariantsBlock, variants: ctaVariants },
            ].map(({ block, variants }) =>
              block && variants.length ? (
                <div key={block.id} id={caseStudy.slug === "reversetech" ? block.id : undefined} className={caseStudy.slug === "reversetech" ? "scroll-mt-24" : undefined}>
                  <div className="overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_20px_48px_rgba(17,131,208,0.08)]">
                    <button
                      type="button"
                      onClick={() => toggleHypothesis(block.id as "content-variants" | "cta-variants")}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <div>
                        <p className="mb-2 font-inter text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">
                          {block.id === "content-variants" ? translate("caseStudy.hypothesis1") : translate("caseStudy.hypothesis2")}
                        </p>
                        <h3 className="font-inter text-[22px] font-semibold leading-[1.3] text-[#0e2951]">
                          {block.title}
                        </h3>
                      </div>
                      {openHypothesisIds.includes(block.id as "content-variants" | "cta-variants") ? <Minus className="h-5 w-5 text-[#0E6FB4]" /> : <Plus className="h-5 w-5 text-[#0E6FB4]" />}
                    </button>
                    {openHypothesisIds.includes(block.id as "content-variants" | "cta-variants") ? (
                      <div className="border-t border-[#d7e8f7] px-6 pb-6 pt-8">
                        {block.body ? (
                          <div className="mb-10 whitespace-pre-wrap space-y-4 text-left font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                            {block.body.split('\n\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                        ) : null}
                        <div className="grid gap-5 md:grid-cols-3">
                          {variants.map((variant, index) => (
                            (() => {
                              const imageSrc = typeof variant.imageSrc === "string" ? variant.imageSrc : null;
                              const variantTitle = typeof variant.title === "string" ? variant.title : "";
                              const variantAlt = variantTitle || translate("caseStudy.variantWireframe");

                              return (
                                <Card key={`${block.id}-${index}`} className="overflow-hidden border-transparent shadow-none">
                                  <CardContent className="p-7">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1e40af]">
                                        {`Variant ${index + 1}`}
                                      </span>
                                    </div>
                                    <h3 className="mt-4 font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">
                                      {variantTitle}
                                    </h3>
                                    <p className="mt-4 font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                                      {typeof variant.body === "string" ? variant.body : ""}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                      {index === 0 && (
                                        <>
                                          <span className="inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#15803d]">
                                            {translate("caseStudy.tagCmsOnly")}
                                          </span>
                                          <span className="inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0369a1]">
                                            {translate("caseStudy.tagNoDev")}
                                          </span>
                                          <span className="inline-flex rounded-full bg-[#fef3c7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b45309]">
                                            {translate("caseStudy.tagFastToTest")}
                                          </span>
                                        </>
                                      )}
                                      {index === 1 && (
                                        <>
                                          <span className="inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0369a1]">
                                            {translate("caseStudy.tagCmsEverflow")}
                                          </span>
                                          <span className="inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#15803d]">
                                            {translate("caseStudy.tagAbTestable")}
                                          </span>
                                          <span className="inline-flex rounded-full bg-[#fef3c7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b45309]">
                                            {translate("caseStudy.tagMediumEffort")}
                                          </span>
                                        </>
                                      )}
                                      {index === 2 && (
                                        <>
                                          <span className="inline-flex rounded-full bg-[#fee2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b91c1c]">
                                            {translate("caseStudy.tagDevRequired")}
                                          </span>
                                          <span className="inline-flex rounded-full bg-[#ede9fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6d28d9]">
                                            {translate("caseStudy.tagVariableLogic")}
                                          </span>
                                          <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#1d4ed8]">
                                            {translate("caseStudy.tagHigherLeverage")}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                    {imageSrc ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setLightboxImage({
                                            src: withBasePath(imageSrc),
                                            alt: variantAlt,
                                          })
                                        }
                                        className="mt-6 block w-full overflow-hidden rounded-[18px] bg-white text-left transition-transform hover:scale-[1.01]"
                                      >
                                        <img
                                          src={withBasePath(imageSrc)}
                                          alt={variantAlt}
                                          className="h-auto w-full"
                                        />
                                      </button>
                                    ) : null}
                                  </CardContent>
                                </Card>
                              );
                            })()
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            )}
            <div id="rt-hypothesis-4" className="scroll-mt-24">
              <div className="overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_20px_48px_rgba(17,131,208,0.08)]">
                <button
                  type="button"
                  onClick={() => toggleHypothesis("rt-hypothesis-4")}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div>
                    <p className="mb-2 font-inter text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0E6FB4]">
                      {translate("caseStudy.hypothesis3Heading")}
                    </p>
                    <h3 className="font-inter text-[22px] font-semibold leading-[1.3] text-[#0e2951]">
                      {translate("caseStudy.exploratoryHypothesisHeading")}
                    </h3>
                  </div>
                  {openHypothesisIds.includes("rt-hypothesis-4") ? <Minus className="h-5 w-5 text-[#0E6FB4]" /> : <Plus className="h-5 w-5 text-[#0E6FB4]" />}
                </button>
                {openHypothesisIds.includes("rt-hypothesis-4") ? (
                  <div className="border-t border-[#d7e8f7] px-6 pb-6 pt-6">
                    <div className="space-y-5">
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        {translate("caseStudy.emailDropoffParagraph1")}
                      </p>
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        {translate("caseStudy.emailDropoffParagraph2")}
                      </p>
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        {translate("caseStudy.emailDropoffParagraph3")}
                      </p>
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        {translate("caseStudy.emailDropoffParagraph4")}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" && reversetechTaskTab === "task1" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="space-y-5 text-left">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E6FB4]">
                {translate("caseStudy.implementationFeasibility")}
              </p>
              <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                {translate("caseStudy.implementationFeasibilityIntro")}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[20px] border border-[#d7e8f7] bg-white p-5 shadow-[0_14px_34px_rgba(14,41,81,0.06)]">
                <h4 className="font-inter text-[18px] font-semibold leading-[1.35] text-[#0e2951]">
                  {translate("caseStudy.copyOnlyRefinements")}
                </h4>
                <p className="mt-3 font-inter text-[14px] leading-[1.7] text-[#5c7792]">
                  {translate("caseStudy.copyOnlyRefinementsBody")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#15803d]">
                    {translate("caseStudy.tagCmsOnly")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0369a1]">
                    {translate("caseStudy.tagNoDev")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#fef3c7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b45309]">
                    {translate("caseStudy.tagFastToTest")}
                  </span>
                </div>
              </div>
              <div className="rounded-[20px] border border-[#d7e8f7] bg-white p-5 shadow-[0_14px_34px_rgba(14,41,81,0.06)]">
                <h4 className="font-inter text-[18px] font-semibold leading-[1.35] text-[#0e2951]">
                  {translate("caseStudy.staticGoalBasedVariants")}
                </h4>
                <p className="mt-3 font-inter text-[14px] leading-[1.7] text-[#5c7792]">
                  {translate("caseStudy.staticGoalBasedVariantsBody")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0369a1]">
                    {translate("caseStudy.tagCmsEverflow")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#15803d]">
                    {translate("caseStudy.tagAbTestable")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#fef3c7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b45309]">
                    {translate("caseStudy.tagMediumEffort")}
                  </span>
                </div>
              </div>
              <div className="rounded-[20px] border border-[#d7e8f7] bg-white p-5 shadow-[0_14px_34px_rgba(14,41,81,0.06)]">
                <h4 className="font-inter text-[18px] font-semibold leading-[1.35] text-[#0e2951]">
                  {translate("caseStudy.dynamicPersonalization")}
                </h4>
                <p className="mt-3 font-inter text-[14px] leading-[1.7] text-[#5c7792]">
                  {translate("caseStudy.dynamicPersonalizationBody")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-[#fee2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b91c1c]">
                    {translate("caseStudy.tagDevRequired")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#ede9fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6d28d9]">
                    {translate("caseStudy.tagVariableLogic")}
                  </span>
                  <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#1d4ed8]">
                    {translate("caseStudy.tagHigherLeverage")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "i9-everify-integration" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle("Alternatives explored")}
          </h2>
          <p className="mb-10 max-w-[820px] font-inter text-[17px] leading-[1.7] text-[#5c5960]">
            Three integration approaches were considered and assessed on placement, user familiarity, and third-party dependency. Embedding I-9 directly into the existing onboarding flow was selected as the strongest option and moved into testing.
          </p>
          <div className="grid gap-5">
            <Card className="overflow-hidden rounded-[24px] border-0 md:sticky md:min-h-[240px] md:flex-row bg-[#c7c6ff] md:top-20" style={{ zIndex: 1, boxShadow: "0 18px 40px rgba(69, 16, 68, 0.16)" }}>
              <div className="flex w-full shrink-0 items-center justify-center p-5 sm:p-6 md:w-[38%] md:p-8">
                <div className="flex aspect-[16/10] w-full max-w-[440px] items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_10px_24px_rgba(69,16,68,0.14)]">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-admin-design-process.svg")}
                    alt="Launch I-9 from HIREtech concept"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col items-start justify-center p-6 md:p-8">
                <Badge className="border border-[#d7d2d3] bg-[#faf8f7] text-[#5c5960]">Rejected</Badge>
                <h3 className="mt-4 font-inter text-[24px] font-semibold leading-snug text-[#141114]">Launch I-9 from HIREtech</h3>
                <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c5960]">Product initially proposed launching I-9 from HIREtech, but testing quickly ruled it out, new users didn't recognize the platform and had no context for why they were leaving Flex.</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-[24px] border-0 md:sticky md:min-h-[240px] md:flex-row bg-[#c7e8f7] md:top-[100px]" style={{ zIndex: 2, boxShadow: "0 18px 40px rgba(69, 16, 68, 0.16)" }}>
              <div className="flex w-full shrink-0 items-center justify-center p-5 sm:p-6 md:w-[38%] md:p-8">
                <div className="flex aspect-[16/10] w-full max-w-[440px] items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_10px_24px_rgba(69,16,68,0.14)]">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-employee-design-process.svg")}
                    alt="Standalone I-9 section concept"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col items-start justify-center p-6 md:p-8">
                <Badge className="border border-[#d7d2d3] bg-[#faf8f7] text-[#5c5960]">Rejected</Badge>
                <h3 className="mt-4 font-inter text-[24px] font-semibold leading-snug text-[#141114]">Standalone I-9 section</h3>
                <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c5960]">Explored a standalone I-9 section separate from onboarding, but competitive benchmarking showed embedding it within the onboarding flow was the industry standard.</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-[24px] border-0 md:sticky md:min-h-[240px] md:flex-row bg-white md:top-[120px]" style={{ zIndex: 3, boxShadow: "0 18px 40px rgba(69, 16, 68, 0.16)" }}>
              <div className="flex w-full shrink-0 items-center justify-center p-5 sm:p-6 md:w-[38%] md:p-8">
                <div className="flex aspect-[16/10] w-full max-w-[440px] items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_10px_24px_rgba(69,16,68,0.14)]">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-admin-experience.svg")}
                    alt="Integrated into onboarding flow concept"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col items-start justify-center p-6 md:p-8">
                <Badge className="border border-[#f8df36] bg-[#f8df36] text-[#141114]">Selected</Badge>
                <h3 className="mt-4 font-inter text-[24px] font-semibold leading-snug text-[#141114]">Integrated into onboarding flow</h3>
                <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c5960]">Integrated I-9 directly into the existing onboarding flow, aligning with competitive patterns and familiar user mental models. This was the approved direction.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "i9-everify-integration" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle("Key Insights from Testing")}
          </h2>
          <p className="mb-10 max-w-[820px] font-inter text-[17px] leading-[1.7] text-[#5c5960]">
            Research and discovery clarified the key questions for testing: Did users understand the handoff, feel confident continuing, and maintain trust throughout the experience? The selected guided decision modal was the concept tested, and the findings showed which parts of the integration felt clear and where friction still remained.
          </p>
          <div className="hidden overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white md:block">
            <div className="grid grid-cols-[1.05fr_1.45fr_1.5fr] gap-6 border-b border-[#d7d2d3] bg-[#faf8f7] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5c5960]">
              <div>Metric</div>
              <div>Finding</div>
              <div>Insight</div>
            </div>
            {I9_TESTING_RESULTS.map((row) => (
              <div
                key={`${row.metric}-${row.label}`}
                className="grid grid-cols-[1.05fr_1.45fr_1.5fr] gap-6 border-t border-[#d7d2d3] px-6 py-5 text-[15px] leading-[1.6] text-[#5c5960]"
              >
                <div>
                  <p className="text-[28px] font-semibold leading-none text-[#141114]">{row.metric}</p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#5c5960]">{row.label}</p>
                </div>
                <p className="font-normal text-[#5c5960]">{row.finding}</p>
                <p className="font-normal text-[#5c5960]">{row.insight}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:hidden">
            {I9_TESTING_RESULTS.map((row) => (
              <Card key={`${row.metric}-${row.label}`} className="overflow-hidden">
                <CardContent className="space-y-4 px-5 py-5">
                  <div>
                    <p className="text-[28px] font-semibold leading-none text-[#0e2951]">{row.metric}</p>
                    <p className="mt-2 text-[14px] leading-[1.5] text-[#5c7792]">{row.label}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">Finding</p>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{row.finding}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0E6FB4]">Insight</p>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{row.insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "i9-everify-integration" && findBlock("research") ? (() => {
        const block = findBlock("research")!;
        const items = getPayloadList(block.payload, "items");
        const deliveryItems = getPayloadList(block.payload, "delivery_items");
        return (
          <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
            <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle(block.title)}
            </h2>
            <div className="mx-auto grid max-w-[1120px] items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="space-y-4">
                {block.body ? block.body.split(/\n+/).map((p, i) => (
                  <p key={i} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">{p.trim()}</p>
                )) : null}
                {items.length ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <p key={item} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">{item}</p>
                    ))}
                  </div>
                ) : null}
                {deliveryItems.length ? (
                  <div className="space-y-4">
                    {deliveryItems.map((item) => (
                      <p key={item} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">{item}</p>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#d7d2d3] bg-white shadow-[0_18px_40px_rgba(69,16,68,0.16)]">
                <iframe
                  title="I-9 solution design"
                  src="https://embed.figma.com/design/WKPa60cO7df7mmw8SlB2dA/OLD-PHASE-I-9---Phase-1?node-id=382-141419&embed-host=share"
                  className="h-[480px] w-full"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        );
      })() : null}

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle(translate("caseStudy.alternativesExplored"))}
          </h2>
          <p className="mb-10 max-w-[820px] font-inter text-[16px] leading-[1.7] text-[#5c5960]">
            {translate("caseStudy.alternativesIntro")}
          </p>

          <div className="grid gap-5">
            {NAYYA_PROCESS_ALTERNATIVES[language].map((item, index) => {
              const tradeoff = NAYYA_PROCESS_TRADEOFFS[language][index];
              const stickyOffset = ["md:top-20", "md:top-[100px]", "md:top-[120px]"][index];
              const cardColors = ["bg-[#c7c6ff]", "bg-[#c7e8f7]", "bg-white"];

              return (
                <Card
                  key={item.title}
                  className={`overflow-hidden rounded-[24px] border-0 md:sticky md:min-h-[240px] md:flex-row ${cardColors[index % cardColors.length]} ${stickyOffset}`}
                  style={{ zIndex: index + 1, boxShadow: "0 18px 40px rgba(69, 16, 68, 0.16)" }}
                >
                  <div className="flex w-full shrink-0 items-center justify-center p-5 sm:p-6 md:w-[38%] md:p-8">
                    <div className="flex aspect-[16/10] w-full max-w-[440px] items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_10px_24px_rgba(69,16,68,0.14)]">
                      <img
                        src={withBasePath(item.imageSrc)}
                        alt={`${item.title.replaceAll("*", "")} ${translate("caseStudy.concept")}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <CardContent className="flex flex-1 flex-col items-start justify-center p-6 md:p-8">
                    <Badge className={!item.selected ? "border border-[#d7d2d3] bg-[#faf8f7] text-[#5c5960]" : "border border-[#f8df36] bg-[#f8df36] text-[#141114]"}>
                      {translate(item.selected ? "caseStudy.statusSelected" : "caseStudy.statusRejected")}
                    </Badge>
                    <h3 className="mt-4 font-inter text-[24px] font-semibold leading-snug text-[#141114]">
                      {renderMarkedTitle(item.title)}
                    </h3>
                    <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c5960]">{item.body}</p>
                    {tradeoff ? (
                      <div className="mt-5 grid gap-4 border-t border-[#d7d2d3] pt-4 sm:grid-cols-2">
                        <p className="font-inter text-[14px] leading-[1.65] text-[#5c5960]">
                          <span className="font-semibold text-[#141114]">{translate("caseStudy.strength")}: </span>
                          {tradeoff.strength}
                        </p>
                        <p className="font-inter text-[14px] leading-[1.65] text-[#5c5960]">
                          <span className="font-semibold text-[#141114]">{translate("caseStudy.tradeoff")}: </span>
                          {tradeoff.tradeoff}
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle(translate("caseStudy.keyInsightsFromTesting"))}
          </h2>
          <p className="mb-10 max-w-[820px] font-inter text-[16px] leading-[1.7] text-[#5c5960]">
            {translate("caseStudy.testingIntro")}
          </p>
          <DataTablePanel
            wrapperClassName="hidden overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white md:block"
            columnsClassName="grid grid-cols-[1.05fr_1.45fr_1.5fr] gap-6 px-6"
            headerClassName="border-b border-[#d7d2d3] bg-[#faf8f7] py-4 text-[#5c5960]"
            rowClassName="border-[#d7d2d3] px-6 py-5"
            headers={[
              <div>{translate("caseStudy.metricCol")}</div>,
              <div>{translate("caseStudy.findingCol")}</div>,
              <div>{translate("caseStudy.insightCol")}</div>,
            ]}
            rows={NAYYA_TESTING_RESULTS[language].map((row) => [
              <div>
                <p className="text-[28px] font-semibold leading-none text-[#141114]">{row.metric}</p>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#5c5960]">{row.label}</p>
              </div>,
              <p className="font-normal text-[#5c5960]">{row.finding}</p>,
              <p className="font-normal text-[#5c5960]">{row.insight}</p>,
            ])}
          />

          <div className="grid gap-4 md:hidden">
            {NAYYA_TESTING_RESULTS[language].map((row) => (
              <KeyValueStackCard
                key={`${row.metric}-${row.label}`}
                items={[
                  {
                    label: row.metric,
                    value: row.label,
                    valueClassName: "mt-2 text-[14px] leading-[1.5] text-[var(--ui-color-text-muted)]",
                  },
                  { label: translate("caseStudy.findingCol"), value: row.finding, valueClassName: "mt-2 text-[14px] leading-[1.6] text-[var(--ui-color-text-muted)]" },
                  { label: translate("caseStudy.insightCol"), value: row.insight, valueClassName: "mt-2 text-[14px] leading-[1.6] text-[var(--ui-color-text-muted)]" },
                ]}
              />
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-14">
            <ContentPanel className="border-[#d7d2d3] shadow-[0_14px_34px_rgba(20,17,20,0.06)]">
              <iframe
                title="Nayya impact frame from Figma"
                src={NAYYA_IMPACT_FIGMA_EMBED}
                className="h-[520px] w-full"
                allowFullScreen
              />
            </ContentPanel>
            <div>
              <h2 className="mb-6 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle(translate("caseStudy.theSolution"))}
              </h2>
              {resultBlock?.body ? resultBlock.body.split(/\n+/).map((paragraph, idx) => (
                <p key={idx} className="mb-4 font-inter text-[17px] leading-[1.7] text-[#5c5960] last:mb-0">
                  {paragraph.trim()}
                </p>
              )) : null}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "flock-accessibility-system" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="space-y-5">
              <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle(translate("caseStudy.theSolution"))}
              </h2>
              {FLOCK_SOLUTION.map((item) => (
                <div key={item.title} className="font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                  <p>
                    <span className="font-semibold text-[#141114]">{item.title}:</span> {item.body}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-suggestions.svg")}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="overflow-hidden rounded-[24px] border border-[#d7d2d3] bg-white shadow-[0_18px_40px_rgba(69,16,68,0.16)]">
                <img
                  src={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-suggestions.svg")}
                  alt="Flock button suggestions and solution example"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </a>
          </div>
        </section>
      ) : null}

      {caseStudy.slug !== "reversetech" && caseStudy.slug !== "calendar-keeper" && caseStudy.slug !== "i9-everify-integration" ? (
        <section className={`py-10 ${usesNayyaVisualStyle ? (caseStudy.slug === "flock-accessibility-system" ? "bg-white" : "bg-[#faf8f7]") : ""}`}>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 xl:px-20">
          {usesNayyaVisualStyle ? (
            caseStudy.slug !== "protecta" ? (
              <h2 className="mb-10 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {renderNayyaEditorialTitle(translate("caseStudy.resultsImpact"))}
              </h2>
            ) : null
          ) : (
            <SectionHeading eyebrow={caseStudy.slug === "protecta" ? translate("caseStudy.measuredImpact") : undefined} title={translate("caseStudy.resultsImpact")} centered className="mb-12" />
          )}
          {caseStudy.slug === "protecta" ? (
            <div>
              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
                <div className="max-w-[620px] space-y-5 font-inter text-[17px] leading-[1.7] text-[#5c5960]">
                  <h2 className="font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                    {localizedLanguage === "es" ? "Validar" : "Validate"}
                  </h2>
                  {PROTECTA_VALIDATE_COPY[language].outcomes.slice(0, 2).map((outcome) => (
                    <div key={outcome.title}>
                      <h3 className="font-inter text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#141114]">{outcome.title}</h3>
                      <p className="mt-2">{outcome.body}</p>
                    </div>
                  ))}
                </div>
                <figure className="overflow-hidden rounded-[24px] bg-[#e8eefc] shadow-[0_18px_40px_rgba(69,16,68,0.12)]">
                  <img src={homeCoverImage} alt="Protecta project cover" className="h-full w-full object-cover" />
                </figure>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {PROTECTA_RECORDED_RESULTS[language].metrics.map((metric) => (
                  <article key={metric.label} className="rounded-[20px] border border-[#e6dfe6] bg-white p-6">
                    <p className="font-inter text-[36px] font-bold leading-none tracking-[-0.04em] text-[#141114]">{metric.value}</p>
                    <h3 className="mt-3 font-inter text-[16px] font-medium text-[#141114]">{metric.label}</h3>
                    {metric.rate ? <p className="mt-2 font-inter text-[12px] leading-[1.5] text-[#5c5960]">{metric.rate}</p> : null}
                  </article>
                ))}
              </div>
              <p className="mt-5 max-w-[900px] font-inter text-[13px] leading-[1.65] text-[#5c5960]">{PROTECTA_RECORDED_RESULTS[language].note}</p>
              <div className="my-10 max-w-[980px] border-l-2 border-[#141114] pl-5 font-inter text-[15px] leading-[1.65] text-[#5c5960]">
                <span className="font-semibold text-[#141114]">{localizedLanguage === "es" ? "Qué medir después: " : language === "de" ? "Nächster Messschritt: " : "What to measure next: "}</span>
                {PROTECTA_VALIDATE_COPY[language].next}
              </div>
            </div>
          ) : null}
          {caseStudy.slug === "flock-accessibility-system" ? (
            <div className="mx-auto max-w-[1040px] overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white">
              <div className="grid grid-cols-[1fr_1fr] gap-6 border-b border-[#d7d2d3] bg-[#faf8f7] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5c5960]">
                <div>Before</div>
                <div>After</div>
              </div>
              {FLOCK_RESULTS_COMPARISON.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr] gap-6 border-t border-[#d7d2d3] px-6 py-5 text-[15px] leading-[1.6] text-[#5c5960]"
                >
                  <p>{row.before}</p>
                  <p className="font-semibold text-[#141114]">{row.after}</p>
                </div>
              ))}
            </div>
          ) : caseStudy.slug !== "protecta" && usesNayyaVisualStyle && resultRows.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {resultRows.map((row) => (
              <article
                key={`${row.metric}-${row.value}`}
                className="flex min-h-[180px] flex-col items-start rounded-[20px] border border-[#e6dfe6] bg-white/80 p-7 sm:p-8"
              >
                <p className="font-inter text-[36px] font-bold leading-none tracking-[-0.04em] text-[#141114] sm:text-[40px]">
                  {row.value}
                </p>
                <h3 className="mt-3 font-inter text-[18px] font-medium leading-snug text-[#141114] sm:text-[20px]">
                  {row.metric}
                </h3>
              </article>
            ))}
          </div>
        ) : caseStudy.slug !== "protecta" && resultRows.length ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {resultRows.map((row) => (
              <MetricStatCard
                key={`${row.metric}-${row.value}`}
                value={row.value ?? ""}
                label={row.metric ?? ""}
              />
            ))}
          </div>
        ) : null}
        {caseStudy.slug !== "protecta" && caseStudy.slug !== "flock-accessibility-system" && [resultInsights, resultOpportunities, projectedImprovements, successMetrics].some((items) => items.length) ? (
          <div className={`mx-auto mt-10 ${usesNayyaVisualStyle ? "grid max-w-full gap-6 lg:grid-cols-2 lg:items-stretch" : "max-w-[820px]"}`}>
            {primaryResultInsights.length ? (
              <Card className={usesNayyaVisualStyle ? "border-0 bg-transparent p-0 py-0 shadow-none" : "border-0 bg-transparent p-0 py-0 shadow-none"}>
                <CardContent className={usesNayyaVisualStyle ? "p-0" : "p-8"}>
                  {usesNayyaVisualStyle ? (
                    <h3 className="max-w-[520px] font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                      {renderNayyaEditorialTitle(
                        caseStudy.slug === "i9-everify-integration"
                          ? translate("caseStudy.keyResults")
                          : translate("caseStudy.enrollmentInsights")
                      )}
                    </h3>
                  ) : (
                    <h3 className="font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">
                      {caseStudy.slug === "i9-everify-integration"
                        ? translate("caseStudy.keyResults")
                        : translate("caseStudy.enrollmentInsights")}
                    </h3>
                  )}
                  <ul className={usesNayyaVisualStyle ? "mt-7" : "mt-5 list-disc space-y-3 pl-5"}>
                    {visiblePrimaryResultInsights.map((item, index) => {
                      const isYearHeading = /^2026(?:\s+data)?$/i.test(stripLeadingBullet(item));
                      const nextItem = visiblePrimaryResultInsights[index + 1];
                      const nextIsYearHeading = nextItem ? /^2026(?:\s+data)?$/i.test(stripLeadingBullet(nextItem)) : false;

                      return isYearHeading ? (
                        <li key={item} className="my-5 list-none pl-1 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#0E6FB4]">{normalizeInsightHeading(item)}</li>
                      ) : (
                        <li key={item} className={`font-inter text-[15px] leading-[1.7] ${usesNayyaVisualStyle ? `flex gap-4 py-4 text-[#141114] ${nextIsYearHeading ? "" : "border-b border-[#ded8de]"}` : "text-[#5c7792]"}`}>
                          {usesNayyaVisualStyle ? <span className="mt-0.5 shrink-0 text-[18px] font-bold leading-none text-[#0E6FB4]" aria-hidden="true">✓</span> : null}
                          <span>{stripLeadingBullet(item)}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {caseStudy.slug === "nayya-ai-benefits" ? (
                    <p className="mt-5 font-inter text-[15px] font-semibold leading-[1.7] text-[#5c5960]">
                      {translate("caseStudy.nayyaInsightsClosing")}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}
            {usesNayyaVisualStyle ? (
              <figure className="min-h-[420px] overflow-hidden rounded-[24px] bg-[#e8eefc] shadow-[0_18px_40px_rgba(69,16,68,0.12)]">
                <img
                  src={homeCoverImage}
                  alt={`${caseStudy.title} project cover`}
                  className="h-full min-h-[420px] w-full object-cover"
                />
              </figure>
            ) : null}
            {resultOpportunities.length ? (
              <Card className={usesNayyaVisualStyle ? "border-0 bg-transparent p-0 py-0 shadow-none lg:col-span-2" : "border-0 bg-transparent p-0 py-0 shadow-none"}>
                <CardContent className={usesNayyaVisualStyle ? "flex flex-col gap-8 p-0 lg:flex-row lg:items-start lg:gap-16" : "p-8"}>
                  <h3 className={`font-inter font-semibold leading-[1.1] tracking-[-0.035em] ${usesNayyaVisualStyle ? "max-w-[520px] shrink-0 text-[clamp(1.75rem,2.6vw,2.5rem)] text-[#141114] lg:w-[38%]" : "text-[20px] leading-snug tracking-normal text-[#0e2951]"}`}>
                    {usesNayyaVisualStyle
                      ? renderNayyaEditorialTitle(translate("caseStudy.opportunitiesNext"))
                      : translate("caseStudy.opportunitiesNext")}
                  </h3>
                  <ul className={`${usesNayyaVisualStyle ? "mt-0 flex-1 space-y-0" : "mt-5 list-disc space-y-3 pl-5"}`}>
                    {resultOpportunities.map((item) => (
                      <li key={item} className={`font-inter text-[15px] leading-[1.7] ${usesNayyaVisualStyle ? "flex gap-4 border-b border-[#ded8de] py-4 text-[#141114]" : "text-[#5c7792]"}`}>
                        {usesNayyaVisualStyle ? <span className="mt-0.5 shrink-0 text-[18px] font-bold leading-none text-[#0E6FB4]" aria-hidden="true">✓</span> : null}
                        <span>{stripLeadingBullet(item)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
            {caseStudy.slug !== "protecta" && projectedImprovements.length ? (
              <div className="p-8 md:col-span-2">
                <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#0E6FB4]">{translate("caseStudy.projectedImprovements")}</p>
                <ul className="space-y-3">
                  {projectedImprovements.map((item) => (
                    <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">{stripLeadingBullet(item)}</li>
                  ))}
                </ul>
                {caseStudy.slug === CONFIDENTIAL_PLACEHOLDER_SLUG ? (
                  <div className="mt-8 overflow-hidden rounded-[20px] border border-[#d7e8f7] bg-white">
                    <div className="border-b border-[#d7e8f7] bg-[#f7f9fb] px-5 py-4">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0E6FB4]">
                        {translate("caseStudy.conservativeScenario")}
                      </p>
                    </div>
                  <DataTablePanel
                    wrapperClassName="hidden md:block"
                    columnsClassName="grid grid-cols-4 px-5"
                    headerClassName="py-4 text-[12px] font-semibold"
                    rowClassName="py-4"
                    headers={[<div>{translate("caseStudy.budget")}</div>, <div>{translate("caseStudy.reach")}</div>, <div>{translate("caseStudy.purchases")}</div>, <div>{translate("caseStudy.revenue")}</div>]}
                    rows={CONFIDENTIAL_CONSERVATIVE_SCENARIO_ROWS.map((row) => [
                      <div className="font-semibold text-[var(--ui-color-text-strong)]">{row.budget}</div>,
                      <div>{row.reach}</div>,
                      <div>{row.purchases}</div>,
                      <div>{row.revenue}</div>,
                    ])}
                  />
                    <div className="grid gap-3 p-4 md:hidden">
                      {CONFIDENTIAL_CONSERVATIVE_SCENARIO_ROWS.map((row) => (
                        <KeyValueStackCard
                          key={`scenario-${row.budget}`}
                          items={[
                            {
                              label: translate("caseStudy.budget"),
                              value: row.budget,
                              valueClassName: "mt-1 font-semibold text-[var(--ui-color-text-strong)]",
                            },
                            { label: translate("caseStudy.reach"), value: row.reach, valueClassName: "mt-1" },
                            { label: translate("caseStudy.purchases"), value: row.purchases, valueClassName: "mt-1" },
                            { label: translate("caseStudy.revenue"), value: row.revenue, valueClassName: "mt-1" },
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            {successMetrics.length && caseStudy.slug !== CONFIDENTIAL_PLACEHOLDER_SLUG ? (
              <Card className={isNayyaCaseStudy ? "mt-5 rounded-[20px] border border-[#e6dfe6] bg-white/80 p-0 py-0 shadow-none" : "p-0 py-0"}>
                <CardContent className="p-8">
                  <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#0E6FB4]">{translate("caseStudy.successMetrics")}</p>
                  <ul className="space-y-3">
                    {successMetrics.map((item) => (
                      <li key={item} className={`font-inter text-[15px] leading-[1.7] ${isNayyaCaseStudy ? "text-[#5c5960]" : "text-[#5c7792]"}`}>{stripLeadingBullet(item)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </div>
          ) : null}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "i9-everify-integration" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-left font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle("Post-launch impact")}
          </h2>
          <p className="mb-10 max-w-[820px] font-inter text-[17px] leading-[1.7] text-[#5c5960]">
            The released I-9 and E-Verify integration made a compliance-critical onboarding step clearer and easier to complete. By improving the handoff, next-step guidance, and expectations around the external verification experience, the flow reduced friction for employees while creating a more reliable path for HR teams.
          </p>
          <div className="hidden overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white md:block">
            <div className="grid grid-cols-[1.55fr_0.7fr_0.7fr_1.25fr] gap-6 border-b border-[#d7d2d3] bg-[#faf8f7] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5c5960]">
              <div>Post-launch measure</div>
              <div>Before</div>
              <div>After</div>
              <div>Impact</div>
            </div>
              {[
                  ["I-9 and E-Verify flow completion", "69%", "81%", "+12 percentage points"],
                  ["Average time to complete the flow", "4 min 12 sec", "3 min 6 sec", "26% faster"],
                  ["Hesitation at the E-Verify redirect", "46%", "33%", "13 percentage-point reduction"],
                  ["Status interpretation errors", "31%", "22%", "9 percentage-point reduction"],
                  ["User confidence score", "3.2/5", "4.0/5", "+0.8 points"],
                  ["Manual process dependency", "60, 70% baseline", "Target: under 25%", "Post-launch tracking target"],
                  ["Survey responses after first release", ", ", "2,548 responses", "Confirmed the integrated direction was working"],
              ].map(([measure, before, after, impact]) => (
                <div key={measure} className="grid grid-cols-[1.55fr_0.7fr_0.7fr_1.25fr] gap-6 border-b border-[#d7d2d3] px-6 py-5 text-[14px] leading-[1.6] text-[#5c5960] last:border-0">
                  <div className="font-inter font-semibold text-[#141114]">{measure}</div>
                  <div>{before}</div>
                  <div className="font-semibold text-[#141114]">{after}</div>
                  <div className="font-semibold text-[#141114]">{impact}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:hidden">
              {[
                  ["I-9 and E-Verify flow completion", "69%", "81%", "+12 percentage points"],
                  ["Average time to complete the flow", "4 min 12 sec", "3 min 6 sec", "26% faster"],
                  ["Hesitation at the E-Verify redirect", "46%", "33%", "13 percentage-point reduction"],
                  ["Status interpretation errors", "31%", "22%", "9 percentage-point reduction"],
                  ["User confidence score", "3.2/5", "4.0/5", "+0.8 points"],
                  ["Manual process dependency", "60, 70% baseline", "Target: under 25%", "Post-launch tracking target"],
                  ["Survey responses after first release", ", ", "2,548 responses", "Confirmed the integrated direction was working"],
              ].map(([measure, before, after, impact]) => (
                <div key={measure} className="rounded-[18px] border border-[#d7e8f7] bg-white p-5">
                  <p className="font-inter text-[16px] font-semibold leading-snug text-[#0e2951]">{measure}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-[13px] leading-[1.5]">
                    <div><p className="uppercase tracking-[0.12em] text-[#5c7792]">Before</p><p className="mt-1 font-semibold text-[#0e2951]">{before}</p></div>
                    <div><p className="uppercase tracking-[0.12em] text-[#5c7792]">After</p><p className="mt-1 font-semibold text-[#0e2951]">{after}</p></div>
                    <div><p className="uppercase tracking-[0.12em] text-[#5c7792]">Impact</p><p className="mt-1 font-semibold text-[#0E6FB4]">{impact}</p></div>
                  </div>
                </div>
                ))}
            </div>
            <div className="mt-8 max-w-[900px] pt-7">
              <h3 className="font-inter text-[22px] font-semibold leading-snug text-[#141114]">Why the change mattered</h3>
              <div className="mt-3 space-y-4">
                <p className="text-[17px] leading-[1.7] text-[#5c5960]">The previous experience left employees uncertain about when they would leave Flex, what E-Verify required, and whether their progress had been saved. The redesigned flow made the transition explicit, clarified the required action, and gave users clearer guidance at the point of decision.</p>
                <p className="text-[17px] leading-[1.7] text-[#5c5960]">After launch, more employees completed the flow, completed it faster, and showed less hesitation at the E-Verify handoff. For HR teams, this created a stronger foundation for timely employment verification and reduced friction in a sensitive compliance process.</p>
              </div>
            </div>
        </section>
      ) : null}

      {caseStudy.slug === "i9-everify-integration" && resultOpportunities.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle(translate("caseStudy.opportunitiesNext"))}
          </h2>
          <div className="grid gap-0">
            {resultOpportunities.map((item, index) => (
              <div
                key={item}
                className={`flex gap-4 py-4 text-[#141114] ${index < resultOpportunities.length - 1 ? "border-b border-[#ded8de]" : ""}`}
              >
                <span className="mt-0.5 shrink-0 text-[18px] font-bold leading-none text-[#0E6FB4]" aria-hidden="true">✓</span>
                <p className="font-inter text-[15px] leading-[1.7]">{stripLeadingBullet(item)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug !== "reversetech" && caseStudy.slug !== "calendar-keeper" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          {usesNayyaVisualStyle ? (
            <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle(translate("caseStudy.learnings"))}
            </h2>
          ) : (
            <SectionHeading title={translate("caseStudy.learnings")} centered className="mb-12" />
          )}
          <div className={`max-w-[820px] space-y-8 ${usesNayyaVisualStyle ? "mr-auto text-left" : "mx-auto text-center"}`}>
            {reflections.map((reflection) => (
              <p key={reflection.title} className={`font-inter text-[16px] leading-[1.7] ${usesNayyaVisualStyle ? "text-[#5c5960]" : "text-[#5c7792]"}`}>
                <strong className={`font-semibold ${usesNayyaVisualStyle ? "text-[#141114]" : ""}`}>{reflection.title} </strong>
                {reflection.body}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "reversetech" && reversetechTaskTab === "task2" ? (
        <section id="rt-paywall-experiment-design" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title={translate("caseStudy.paywallExperimentDesign")} centered className="mb-8" />
          <div className="mx-auto mt-10 max-w-[980px]">
            <p className="mx-auto max-w-[760px] text-center font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              {translate("caseStudy.experimentsFramingIntro")}
            </p>
          </div>
          {/* Phone frames, low-fi wireframes */}
          <div className="mt-20">
            <div className="mx-auto mb-8 grid max-w-[1180px] gap-8 text-center md:grid-cols-3">
              <NarrativePanelCard
                badge={translate("caseStudy.control")}
                description={translate("caseStudy.controlDescription")}
                sections={[
                  {
                    title: translate("caseStudy.currentStructure"),
                    align: "left",
                    items: [
                      translate("caseStudy.currentStructureItem1"),
                      translate("caseStudy.currentStructureItem2"),
                      translate("caseStudy.currentStructureItem3"),
                    ],
                  },
                ]}
              />
              <NarrativePanelCard
                badge={translate("caseStudy.goalA")}
                description={translate("caseStudy.goalADescription")}
                sections={[
                  {
                    title: translate("caseStudy.experimentA"),
                    titleClassName: "text-[var(--ui-color-brand-primary)] text-[12px] tracking-[0.16em]",
                    text: translate("caseStudy.experimentAText"),
                  },
                  {
                    title: translate("caseStudy.deltaVsControl"),
                    titleClassName: "text-[#c8412a]",
                    align: "left",
                    items: [
                      translate("caseStudy.experimentAItem1"),
                      translate("caseStudy.experimentAItem2"),
                      translate("caseStudy.experimentAItem3"),
                      translate("caseStudy.experimentAItem4"),
                    ],
                  },
                ]}
              />
              <NarrativePanelCard
                badge={translate("caseStudy.goalB")}
                description={translate("caseStudy.goalBDescription")}
                sections={[
                  {
                    title: translate("caseStudy.experimentB"),
                    titleClassName: "text-[var(--ui-color-brand-primary)] text-[12px] tracking-[0.16em]",
                    text: translate("caseStudy.experimentBText"),
                  },
                  {
                    title: translate("caseStudy.deltaVsControl"),
                    titleClassName: "text-[#2a5cb8]",
                    align: "left",
                    items: [
                      translate("caseStudy.experimentBItem1"),
                      translate("caseStudy.experimentBItem2"),
                      translate("caseStudy.experimentBItem3"),
                      translate("caseStudy.experimentBItem4"),
                      translate("caseStudy.experimentBItem5"),
                    ],
                  },
                ]}
              />
            </div>
            <div className="grid gap-8 md:grid-cols-3">

              {/* ── Control ── */}
              <div>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d7e8f7] bg-white text-[12px] font-semibold text-[#5c7792]">C</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">{translate("caseStudy.controlLabel")}</span>
                </div>
                <div className="mb-4 rounded-[8px] border border-[#e0eaf4] bg-[#f8fbff] p-4 text-[13px] leading-[1.5] text-[#5c7792]">
                  <strong className="text-[#0e2951]">{translate("caseStudy.whatShipsNow")} </strong>{translate("caseStudy.controlCaption")}
                </div>
                <div className="relative w-full rounded-[24px] border border-[#d7e8f7] bg-white p-3 pb-8 text-left shadow-[0_20px_48px_rgba(17,131,208,0.08)]">
                  <div
                    className={`relative rounded-[18px] border border-[#d7e8f7] bg-[#f8fbff] ${
                      isPaywallControlExpanded ? "overflow-visible" : "h-[920px] overflow-hidden"
                    }`}
                  >
                    <img
                      src={withBasePath("/images/projects/Reversetech/paywall.png")}
                      alt={translate("caseStudy.currentReversetechPaywallAlt")}
                      className="w-full object-top"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPaywallControlExpanded((current) => !current)}
                    className="absolute bottom-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center rounded-full border border-[#d7e8f7] bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#f8fbff]"
                  >
                    {isPaywallControlExpanded ? translate("caseStudy.close") : translate("caseStudy.expand")}
                  </button>
                </div>
              </div>

              {/* ── Experiment A ── */}
              <div>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c8412a] bg-[#c8412a] text-[12px] font-semibold text-white">A</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c8412a]">{translate("caseStudy.experimentALabel")}</span>
                </div>
                <div className="mb-4 rounded-[8px] border border-[#e0eaf4] bg-[#f8fbff] p-4 text-[13px] leading-[1.5] text-[#5c7792]">
                  <strong className="text-[#0e2951]">{translate("caseStudy.hypothesisCaptionLabel")} </strong>{translate("caseStudy.experimentAHypothesis")}
                  <br />
                  <strong className="text-[#0e2951]">{translate("caseStudy.primaryMetricLabel")} </strong>{translate("caseStudy.experimentAPrimaryMetric")}
                </div>
                {/* Phone */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openExperimentModal("a")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openExperimentModal("a");
                    }
                  }}
                  className="relative cursor-zoom-in rounded-[36px] border-2 border-[#1c1a17] bg-[#EAF3F6] p-[14px_12px_16px] shadow-[6px_6px_0_#1c1a17] transition-transform"
                >
                  {reverseTechExperimentAMockup}
                </div>
              </div>

              {/* ── Experiment B ── */}
              <div>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2a5cb8] bg-[#2a5cb8] text-[12px] font-semibold text-white">B</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2a5cb8]">{translate("caseStudy.experimentB")}</span>
                </div>
                <div className="mb-4 rounded-[8px] border border-[#e0eaf4] bg-[#f8fbff] p-4 text-[13px] leading-[1.5] text-[#5c7792]">
                  <strong className="text-[#0e2951]">{translate("caseStudy.hypothesisCaptionLabel")} </strong>{translate("caseStudy.experimentBHypothesis")}
                  <br />
                  <strong className="text-[#0e2951]">{translate("caseStudy.primaryMetricLabel")} </strong>{translate("caseStudy.experimentBPrimaryMetric")}
                </div>
                {/* Phone */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openExperimentModal("b")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openExperimentModal("b");
                    }
                  }}
                  className="relative cursor-zoom-in rounded-[36px] border-2 border-[#1c1a17] bg-[#EAF3F6] p-[14px_12px_16px] shadow-[6px_6px_0_#1c1a17] transition-transform"
                >
                  {reverseTechExperimentBMockup}
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12">
            <div className="mx-auto mb-12 max-w-[980px] px-6 py-2 text-center">
              <h3 className="text-center font-inter text-[24px] leading-tight text-[#0e2951]">{translate("caseStudy.tensionHeading")}</h3>
              <div className="mt-6 grid gap-5 text-left md:grid-cols-2">
                <div className="rounded-[24px] border border-[#f0d3cd] bg-white p-6 shadow-[0_16px_32px_rgba(200,65,42,0.08)]">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#c8412a] text-[14px] font-semibold text-white">A</span>
                    <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#c8412a]">{translate("caseStudy.experimentA")}</p>
                  </div>
                  <p className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                    {translate("caseStudy.experimentAOptimizedFor")}
                  </p>
                  <div className="mt-5 rounded-[18px] border border-[#f0d3cd] bg-white/80 px-4 py-4 text-left">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#c8412a] shadow-[0_8px_20px_rgba(200,65,42,0.12)]">
                        <CircleAlert className="h-4 w-4" />
                      </span>
                      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#c8412a]">{translate("caseStudy.risk")}</p>
                    </div>
                    <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                      {translate("caseStudy.experimentARisk")}
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#d7e8f7] bg-white p-6 shadow-[0_16px_32px_rgba(17,131,208,0.08)]">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2a5cb8] text-[14px] font-semibold text-white">B</span>
                    <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#2a5cb8]">{translate("caseStudy.experimentB")}</p>
                  </div>
                  <p className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                    {translate("caseStudy.experimentBOptimizedFor")}
                  </p>
                  <div className="mt-5 rounded-[18px] border border-[#d7e8f7] bg-white/80 px-4 py-4 text-left">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#2a5cb8] shadow-[0_8px_20px_rgba(42,92,184,0.12)]">
                        <CircleAlert className="h-4 w-4" />
                      </span>
                      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#2a5cb8]">{translate("caseStudy.risk")}</p>
                    </div>
                    <p className="mt-3 font-inter text-[15px] leading-[1.7] text-[#5c7792]">
                      {translate("caseStudy.experimentBRisk")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {sourceItems.length || sourceEntriesWithOverrides.length ? (
        <section id={caseStudy.slug === "reversetech" ? "rt-sources" : undefined} className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          {caseStudy.slug === "reversetech" ? (
            <details className="group w-full rounded-[20px] border border-[#d7d2d3] bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-inter text-[20px] font-semibold text-[#141114] marker:content-none">
                {sourcesBlock?.title ?? translate("caseStudy.sources")}
                <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="space-y-3 border-t border-[#d7d2d3] px-6 py-5">
                {sourceList}
              </div>
            </details>
          ) : (
            <>
              <SectionHeading title={sourcesBlock?.title ?? translate("caseStudy.sources")} centered className="mb-8" />
              <div className="mx-auto max-w-[900px] space-y-3">
                {sourceList}
              </div>
            </>
          )}
        </section>
      ) : null}

      {activeExperimentModal ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={closeExperimentModal}
        >
          <div
            className="relative w-full max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              <button
                type="button"
                aria-label={translate("caseStudy.zoomOut")}
                onClick={() => setExperimentModalZoom((current) => Math.max(0.5, Number((current - 0.25).toFixed(2))))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
              >
                <Minus className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={translate("caseStudy.zoomIn")}
                onClick={() => setExperimentModalZoom((current) => Math.min(3, Number((current + 0.25).toFixed(2))))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
              >
                <Plus className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Reset zoom"
                onClick={() => setExperimentModalZoom(1)}
                className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
            <button
              type="button"
              aria-label={translate("caseStudy.closeExperimentPreview")}
              onClick={closeExperimentModal}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
              <div className="max-h-[85vh] overflow-auto p-4">
                <div className="flex min-h-full min-w-full items-start justify-center">
                  <div
                    className="relative max-w-none"
                    style={{
                      width: `${EXPERIMENT_MODAL_BASE_WIDTH * experimentModalZoom}px`,
                      height: experimentModalBaseHeight
                        ? `${experimentModalBaseHeight * experimentModalZoom}px`
                        : undefined,
                    }}
                  >
                    <div
                      ref={experimentModalMockupRef}
                      className="mx-auto w-[320px] max-w-none"
                      style={{
                        transform: `scale(${experimentModalZoom})`,
                        transformOrigin: "top center",
                      }}
                    >
                      <div className="relative rounded-[36px] border-2 border-[#1c1a17] bg-[#EAF3F6] p-[14px_12px_16px] shadow-[6px_6px_0_#1c1a17]">
                        {activeExperimentModal === "a" ? reverseTechExperimentAMockup : reverseTechExperimentBMockup}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {lightboxImage ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative w-full max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              <button
                type="button"
                aria-label={translate("caseStudy.zoomOut")}
                onClick={() => setLightboxZoom((current) => Math.max(0.5, Number((current - 0.25).toFixed(2))))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
              >
                <Minus className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={translate("caseStudy.zoomIn")}
                onClick={() => setLightboxZoom((current) => Math.min(3, Number((current + 0.25).toFixed(2))))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
              >
                <Plus className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Reset zoom"
                onClick={() => setLightboxZoom(1)}
                className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
            <button
              type="button"
              aria-label={translate("caseStudy.closeImagePreview")}
              onClick={() => setLightboxImage(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e2951] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:text-[#0E6FB4]"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
              <div className="max-h-[85vh] overflow-auto p-4">
                <div className="flex min-h-full min-w-full items-start justify-center">
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    className="h-auto max-w-none object-contain"
                    style={{ width: `${lightboxZoom * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {caseStudy.slug === "calendar-keeper" ? (
        <section className={`mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "ideate" ? "" : "hidden"}`}>
          <h2 className="mx-auto mt-3 max-w-[760px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle("How the scheduling service works together")}
          </h2>
          <p className="mx-auto mb-10 mt-5 max-w-[760px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">
            This service blueprint shows a proposed future-state flow that connects the patient and clinic experience to the operational work and systems that keep a resource-aware schedule reliable.
          </p>
          <CalendarKeeperServiceBlueprint />
        </section>
      ) : null}

      {caseStudy.slug === "calendar-keeper" ? (
        <section id="calendar-prototype" className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 py-16 md:px-10 xl:px-20 ${calendarKeeperPhase === "prototype" ? "" : "hidden"}`}>
          <h2 className="mx-auto mt-3 max-w-[720px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
            {renderNayyaEditorialTitle("Resource-aware scheduling")}
          </h2>
          <p className="mx-auto mb-10 mt-5 max-w-[720px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">A shared scheduling core supports a staff console and a light returning-patient path, adapting to practice shape rather than country.</p>
          <CalendarKeeperPrototypeViews />
        </section>
      ) : null}

      {caseStudy.slug === "calendar-keeper" ? (
        <section className={`mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "prototype" ? "" : "hidden"}`}>
          <div className="mx-auto max-w-[1080px]">
            <h2 className="mx-auto mt-3 max-w-[780px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle("How we would know it is working")}
            </h2>
            <p className="mx-auto mt-5 max-w-[780px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">A pilot would establish a baseline, then test whether the service reduces coordination work while protecting patient confidence and clinical capacity.</p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                {
                  metric: "Faster schedule recovery",
                  signal: "Staff can handle changes without lengthy back-and-forth or escalation.",
                  measure: "Median time to schedule or reschedule, plus the share of changes resolved without escalation.",
                },
                {
                  metric: "A more reliable schedule",
                  signal: "The right practitioner, room, equipment, and timing stay aligned more often.",
                  measure: "Scheduling conflicts and manual corrections per 100 appointments.",
                },
                {
                  metric: "More routine requests handled by patients",
                  signal: "Returning patients complete simple booking tasks independently.",
                  measure: "Self-service booking completion rate and scheduling-related inbound calls per week.",
                },
                {
                  metric: "Staff trust the system",
                  signal: "Calendar Keepers use the console as their dependable source of truth.",
                  measure: "Weekly active staff users, task-completion success, and a short post-task confidence score.",
                },
              ].map((criterion, index) => (
                <article key={criterion.metric} className="rounded-[20px] border border-[#d7d2d3] bg-[#faf8f7] p-6">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0E6FB4]">SUCCESS SIGNAL 0{index + 1}</p>
                  <h3 className="mt-3 font-inter text-[20px] font-semibold leading-[1.35] text-[#141114]">{criterion.metric}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#5c5960]">{criterion.signal}</p>
                  <p className="mt-5 border-t border-[#d7d2d3] pt-4 text-[13px] font-medium leading-[1.6] text-[#141114]">Measure: {criterion.measure}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[20px] border border-[#d7d2d3] bg-white px-6 py-5 text-center text-[14px] leading-[1.7] text-[#5c5960]">
              <span className="font-semibold text-[#141114]">Pilot approach:</span> compare a 4, 6 week baseline with a limited clinic rollout, then pair behavioural data with short staff interviews to understand why a metric moved.
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "calendar-keeper" ? (
        <section className={`mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20 ${calendarKeeperPhase === "prototype" ? "" : "hidden"}`}>
          <div className="mx-auto max-w-[1080px]">
            <h2 className="mx-auto mt-3 max-w-[780px] text-center font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {renderNayyaEditorialTitle("A schedule the clinic can keep trusting")}
            </h2>
            <p className="mx-auto mt-5 max-w-[780px] text-center font-inter text-[17px] leading-[1.7] text-[#5c5960]">The prototype establishes reliable core scheduling; these next steps extend that reliability across different practice models.</p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Support lean, doctor-led practices",
                  body: "Test a supervised, consent-aware call agent for lean practices with limited assistant coverage. It can handle routine booking and rebooking requests with EU-hosted processing, then escalate clinical or ambiguous cases to the doctor.",
                },
                {
                  title: "Review backfill with an agent, not autopilot",
                  body: "When a waitlist has enough history, an agent can identify viable openings and prepare a backfill recommendation for staff review before anyone is contacted.",
                },
                {
                  title: "Monitor degraded mode proactively",
                  body: "Add system-health monitoring that detects a sync or eGK failure, explains its impact, and highlights the reconciliation work that needs attention when service returns.",
                },
                {
                  title: "Validate by practice shape",
                  body: "Test delegation-ready team practices and lean, doctor-led practices separately, ensuring roles, handoffs, and automation reduce work without obscuring responsibility.",
                },
              ].map((item, index) => (
                <article key={item.title} className="rounded-[20px] border border-[#d7d2d3] bg-[#faf8f7] p-6">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0E6FB4]">NEXT STEP 0{index + 1}</p>
                  <h3 className="mt-3 font-inter text-[20px] font-semibold leading-[1.35] text-[#141114]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#5c5960]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1200px] px-6 pb-10 pt-1 md:px-10 xl:px-20">
        <p className={`mb-2 text-[13px] font-semibold uppercase ${usesNayyaVisualStyle ? "tracking-[0.16em] text-[#5c5960]" : "tracking-[0.45em] text-[#0E6FB4]"}`}>{translate("caseStudy.moreWork")}</p>
        <h2 className={`mb-8 font-inter ${usesNayyaVisualStyle ? "text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold tracking-[-0.035em] text-[#141114]" : "text-[32px] text-[#0e2951]"}`}>{translate("caseStudy.otherProjects")}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectTeaserCard
              key={project.slug}
              id={project.cardId}
              href={resolveProjectHref(project)}
              dataCardId={project.cardId}
              title={project.title}
              description={project.tagline ?? ""}
              tags={project.tags}
              image={project.previewImage}
              imageAlt={`${project.title} case study preview for ${project.company}`}
              background={project.background}
              ctaLabel={project.external_link ? translate("home.viewProject") : translate("home.viewCaseStudy")}
            />
          ))}
        </div>
      </section>

      <SiteFooter />

      {(caseStudy.client_logos.length && !isNayyaCaseStudy && caseStudy.slug !== "i9-everify-integration" && caseStudy.slug !== "flock-accessibility-system") ? (
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 xl:px-20">
        {caseStudy.client_logos.length && !isNayyaCaseStudy && caseStudy.slug !== "i9-everify-integration" ? (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
            {caseStudy.client_logos.map((logo) => (
              <img
                key={logo.name}
                src={resolveTrustedLogo(logo.name, logo.logo)}
                alt={logo.name}
                className="h-12 w-auto object-contain opacity-80"
              />
            ))}
            <img
              src={withBasePath("/images/SNUZ.svg")}
              alt="ITX"
              className="h-12 w-auto object-contain opacity-80"
            />
          </div>
        ) : null}
      </section>
      ) : null}


    </main>
  );
}
