"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Globe2, Mail, Phone, Sparkles } from "lucide-react";

import { FormField, FormFieldMessage } from "@/components/form-field";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

type Locale = "es" | "en";

type FormState = {
  companyName: string;
  role: string;
  contactName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  website: string;
  businessDescription: string;
  differentiator: string;
  primaryObjective: string;
  primaryObjectiveOther: string;
  idealClient: string;
  clientProblem: string;
  decisionDriver: string;
  socialPain: string;
  representativeContent: string;
  inspiration: string;
  marketingActions: string[];
  marketingActionsOther: string;
  marketingResults: string;
  salesProcess: string;
  socialResponder: string;
  sixMonthSuccess: string;
  successMetrics: string[];
  successMetricsOther: string;
  brandConstraints: string;
  resourceWebsite: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  brandManual: string;
  brochure: string;
  otherResources: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type Option = {
  id: string;
  es: string;
  en: string;
};

const OBJECTIVE_OPTIONS: Option[] = [
  { id: "visibility", es: "Mayor visibilidad", en: "More visibility" },
  { id: "leads", es: "Generar leads", en: "Generate leads" },
  { id: "meetings", es: "Conseguir reuniones", en: "Book meetings" },
  { id: "sales", es: "Aumentar ventas", en: "Increase sales" },
  { id: "brand", es: "Posicionamiento de marca", en: "Brand positioning" },
  { id: "other", es: "Otro", en: "Other" },
];

const MARKETING_OPTIONS: Option[] = [
  { id: "seo", es: "SEO", en: "SEO" },
  { id: "google-ads", es: "Google Ads", en: "Google Ads" },
  { id: "meta-ads", es: "Meta Ads", en: "Meta Ads" },
  { id: "email-marketing", es: "Email Marketing", en: "Email Marketing" },
  { id: "linkedin", es: "LinkedIn", en: "LinkedIn" },
  { id: "instagram", es: "Instagram", en: "Instagram" },
  { id: "tiktok", es: "TikTok", en: "TikTok" },
  { id: "other", es: "Otro", en: "Other" },
];

const SUCCESS_METRICS: Option[] = [
  { id: "reach", es: "Alcance", en: "Reach" },
  { id: "engagement", es: "Engagement", en: "Engagement" },
  { id: "leads", es: "Leads", en: "Leads" },
  { id: "meetings", es: "Reuniones", en: "Meetings" },
  { id: "sales", es: "Ventas", en: "Sales" },
  { id: "website-traffic", es: "Tráfico al sitio web", en: "Website traffic" },
  { id: "community-growth", es: "Crecimiento de la comunidad", en: "Community growth" },
  { id: "other", es: "Otro", en: "Other" },
];

const CONTACT_METHODS: Option[] = [
  { id: "email", es: "Email", en: "Email" },
  { id: "phone", es: "Llamada", en: "Phone call" },
  { id: "whatsapp", es: "WhatsApp", en: "WhatsApp" },
  { id: "linkedin", es: "LinkedIn", en: "LinkedIn" },
];

const INITIAL_FORM: FormState = {
  companyName: "",
  role: "",
  contactName: "",
  email: "",
  phone: "",
  preferredContactMethod: "email",
  website: "",
  businessDescription: "",
  differentiator: "",
  primaryObjective: "",
  primaryObjectiveOther: "",
  idealClient: "",
  clientProblem: "",
  decisionDriver: "",
  socialPain: "",
  representativeContent: "",
  inspiration: "",
  marketingActions: [],
  marketingActionsOther: "",
  marketingResults: "",
  salesProcess: "",
  socialResponder: "",
  sixMonthSuccess: "",
  successMetrics: [],
  successMetricsOther: "",
  brandConstraints: "",
  resourceWebsite: "",
  instagram: "",
  tiktok: "",
  linkedin: "",
  brandManual: "",
  brochure: "",
  otherResources: "",
};

const COPY = {
  es: {
    back: "Volver al sitio",
    eyebrow: "Diagnóstico Inicial de Redes Sociales",
    title: "Comparte el contexto de tu negocio y te preparo una propuesta estratégica alineada a tus objetivos.",
    intro:
      "Gracias por dedicar unos minutos a completar este cuestionario. El objetivo es comprender mejor su negocio, sus clientes y sus metas para diseñar una estrategia de redes sociales alineada con sus necesidades.",
    timing: "Tiempo estimado: 5 - 8 minutos",
    langEs: "Español",
    langEn: "English",
    formTitle: "Completa el diagnóstico",
    submit: "Enviar diagnóstico",
    submitting: "Enviando...",
    success:
      "Gracias. Recibí tu diagnóstico y usaré esta información para preparar una propuesta personalizada.",
    contactTitle: "Información de contacto",
    companyTitle: "Información de la empresa",
    businessTitle: "Sobre el negocio",
    clientTitle: "Cliente ideal",
    digitalTitle: "Presencia digital",
    marketingTitle: "Marketing",
    salesTitle: "Proceso comercial",
    goalsTitle: "Objetivos",
    resourcesTitle: "Recursos de apoyo",
    classificationTitle: "Clasificación automática",
    classificationBody:
      "Este resumen se genera automáticamente para ayudarte a ordenar el lead antes de preparar la propuesta.",
    leadPriority: "Prioridad del lead",
    primaryGoal: "Objetivo principal",
    maturity: "Madurez de marketing",
    recommendation: "Foco sugerido",
    preferredFollowup: "Canal sugerido",
    helper:
      "También puedes usar este link como intake form con clientes nuevos. La data llega ordenada y con una clasificación inicial.",
    companyName: "Nombre de la empresa",
    role: "Cargo",
    contactName: "Nombre y apellido",
    email: "Correo electrónico",
    phone: "Número de contacto",
    preferredContactMethod: "Forma preferida de contacto",
    website: "Sitio web",
    businessDescription: "¿A qué se dedica la empresa y qué servicios o productos desea impulsar actualmente?",
    differentiator: "¿Cuál consideran que es su principal diferenciador frente a la competencia?",
    primaryObjective: "¿Cuál es el principal objetivo de fortalecer su presencia en redes sociales?",
    idealClient: "¿Quién es su cliente ideal?",
    idealClientHint: "Empresa, cargo, industria, ubicación o cualquier característica relevante.",
    clientProblem: "¿Qué problema principal ayudan a resolver a sus clientes?",
    decisionDriver: "¿Qué suele hacer que un cliente decida trabajar con ustedes?",
    socialPain: "¿Qué sienten que hoy no está funcionando en sus redes sociales?",
    representativeContent: "¿Qué tipo de contenido creen que mejor representa a su empresa?",
    inspiration: "¿Hay alguna marca o empresa cuyo contenido les inspire? ¿Por qué?",
    marketingActions: "¿Qué acciones de marketing están realizando actualmente?",
    marketingResults: "¿Qué resultados les están generando actualmente estas acciones?",
    salesProcess: "Cuando alguien los contacta, ¿cómo es el proceso hasta convertirlo en cliente?",
    socialResponder: "¿Quién responde actualmente los mensajes o consultas que llegan desde redes sociales?",
    sixMonthSuccess: "Si dentro de seis meses este proyecto fuera un éxito, ¿qué resultados les gustaría haber alcanzado?",
    successMetrics: "¿Qué indicadores consideran más importantes para medir ese éxito?",
    brandConstraints: "¿Hay alguna restricción de marca, comunicación o lineamientos que debamos conocer?",
    resourcesIntro: "Compártenos, si es posible:",
    resourceWebsite: "Sitio web adicional o landing relevante",
    instagram: "Instagram",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    brandManual: "Manual de marca",
    brochure: "Presentación comercial o brochure",
    otherResources: "Otros recursos relevantes",
    otherPlaceholder: "Agrega contexto adicional",
    required: "Este campo es obligatorio.",
    invalidEmail: "Ingresa un correo válido.",
    invalidPhone: "Ingresa un número o medio de contacto válido.",
    chooseOne: "Selecciona al menos una opción.",
    priorityHigh: "Alta",
    priorityMedium: "Media",
    priorityLow: "Inicial",
    maturityHigh: "Activa",
    maturityMedium: "En crecimiento",
    maturityLow: "Temprana",
    recommendationVisibility: "Construir autoridad, consistencia y contenido base.",
    recommendationLeads: "Optimizar la conversión y clarificar la oferta.",
    recommendationMeetings: "Diseñar contenido con CTA directo a discovery call.",
    recommendationSales: "Alinear contenido, seguimiento comercial y prueba social.",
    recommendationBrand: "Fortalecer narrativa, diferenciación y posicionamiento.",
    recommendationOther: "Revisar objetivos y priorizar quick wins estratégicos.",
    resourcesNote: "Puedes pegar links, carpetas de Drive o una nota breve indicando dónde compartirlos.",
    socialMediaCta: "Compartir este link con clientes",
  },
  en: {
    back: "Back to website",
    eyebrow: "Social Media Initial Diagnostic",
    title: "Share your business context and I will prepare a strategy proposal aligned with your goals.",
    intro:
      "Thanks for taking a few minutes to complete this questionnaire. The goal is to understand your business, customers, and objectives so I can shape a social media strategy that matches your needs.",
    timing: "Estimated time: 5 - 8 minutes",
    langEs: "Español",
    langEn: "English",
    formTitle: "Complete the diagnostic",
    submit: "Send diagnostic",
    submitting: "Sending...",
    success:
      "Thank you. I received your diagnostic and will use it to prepare a tailored strategic proposal.",
    contactTitle: "Contact information",
    companyTitle: "Company information",
    businessTitle: "About the business",
    clientTitle: "Ideal client",
    digitalTitle: "Digital presence",
    marketingTitle: "Marketing",
    salesTitle: "Sales process",
    goalsTitle: "Goals",
    resourcesTitle: "Supporting resources",
    classificationTitle: "Automatic classification",
    classificationBody:
      "This summary is generated automatically so the lead can be sorted before the proposal is prepared.",
    leadPriority: "Lead priority",
    primaryGoal: "Primary goal",
    maturity: "Marketing maturity",
    recommendation: "Suggested focus",
    preferredFollowup: "Suggested follow-up",
    helper:
      "You can also use this link as an intake form for new clients. The data arrives structured and pre-classified.",
    companyName: "Company name",
    role: "Role",
    contactName: "Full name",
    email: "Email",
    phone: "Phone or contact number",
    preferredContactMethod: "Preferred contact method",
    website: "Website",
    businessDescription: "What does the company do and which services or products do you want to push right now?",
    differentiator: "What do you consider your main differentiator versus competitors?",
    primaryObjective: "What is the main objective of strengthening your social media presence?",
    idealClient: "Who is your ideal client?",
    idealClientHint: "Company, title, industry, location, or any relevant characteristic.",
    clientProblem: "What main problem do you solve for your clients?",
    decisionDriver: "What usually makes a client decide to work with you?",
    socialPain: "What do you feel is not working in your social media right now?",
    representativeContent: "What type of content do you believe best represents your company?",
    inspiration: "Is there any brand or company whose content inspires you? Why?",
    marketingActions: "Which marketing actions are you currently running?",
    marketingResults: "What results are those actions generating today?",
    salesProcess: "When someone contacts you, what does the process look like until they become a client?",
    socialResponder: "Who currently replies to messages or inquiries coming from social media?",
    sixMonthSuccess: "If this project were successful in six months, what results would you want to have achieved?",
    successMetrics: "Which indicators matter most when measuring success?",
    brandConstraints: "Are there any brand, communication, or compliance constraints I should know?",
    resourcesIntro: "If possible, share:",
    resourceWebsite: "Additional website or relevant landing page",
    instagram: "Instagram",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    brandManual: "Brand manual",
    brochure: "Sales deck or brochure",
    otherResources: "Other relevant resources",
    otherPlaceholder: "Add additional context",
    required: "This field is required.",
    invalidEmail: "Enter a valid email.",
    invalidPhone: "Enter a valid phone number or contact method.",
    chooseOne: "Choose at least one option.",
    priorityHigh: "High",
    priorityMedium: "Medium",
    priorityLow: "Early",
    maturityHigh: "Active",
    maturityMedium: "Growing",
    maturityLow: "Early-stage",
    recommendationVisibility: "Build authority, consistency, and foundational content.",
    recommendationLeads: "Improve conversion and sharpen the offer.",
    recommendationMeetings: "Design content with direct discovery-call CTAs.",
    recommendationSales: "Align content, sales follow-up, and proof points.",
    recommendationBrand: "Strengthen narrative, differentiation, and positioning.",
    recommendationOther: "Review goals and prioritize strategic quick wins.",
    resourcesNote: "You can paste links, Drive folders, or a short note explaining where to find them.",
    socialMediaCta: "Share this link with clients",
  },
} as const;

function getOptionLabel(option: Option, locale: Locale) {
  return locale === "es" ? option.es : option.en;
}

function toggleSelection(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function classifyLead(values: FormState, locale: Locale) {
  const score =
    Number(Boolean(values.website.trim())) +
    Number(Boolean(values.phone.trim())) +
    Number(Boolean(values.salesProcess.trim())) +
    Number(Boolean(values.sixMonthSuccess.trim())) +
    Number(Boolean(values.marketingResults.trim()));

  const leadPriority =
    score >= 4
      ? locale === "es"
        ? COPY.es.priorityHigh
        : COPY.en.priorityHigh
      : score >= 2
        ? locale === "es"
          ? COPY.es.priorityMedium
          : COPY.en.priorityMedium
        : locale === "es"
          ? COPY.es.priorityLow
          : COPY.en.priorityLow;

  const actionCount = values.marketingActions.filter((item) => item !== "other").length;
  const marketingMaturity =
    actionCount >= 4
      ? locale === "es"
        ? COPY.es.maturityHigh
        : COPY.en.maturityHigh
      : actionCount >= 2
        ? locale === "es"
          ? COPY.es.maturityMedium
          : COPY.en.maturityMedium
        : locale === "es"
          ? COPY.es.maturityLow
          : COPY.en.maturityLow;

  const primaryGoalOption = OBJECTIVE_OPTIONS.find((option) => option.id === values.primaryObjective);
  const primaryGoal = primaryGoalOption
    ? getOptionLabel(primaryGoalOption, locale)
    : values.primaryObjectiveOther.trim() || (locale === "es" ? "Sin definir" : "Not defined");

  const recommendationKey =
    values.primaryObjective === "visibility"
      ? "recommendationVisibility"
      : values.primaryObjective === "leads"
        ? "recommendationLeads"
        : values.primaryObjective === "meetings"
          ? "recommendationMeetings"
          : values.primaryObjective === "sales"
            ? "recommendationSales"
            : values.primaryObjective === "brand"
              ? "recommendationBrand"
              : "recommendationOther";

  const copy = COPY[locale];

  return {
    leadPriority,
    marketingMaturity,
    primaryGoal,
    recommendedFocus: copy[recommendationKey],
    preferredFollowup:
      getOptionLabel(
        CONTACT_METHODS.find((option) => option.id === values.preferredContactMethod) ?? CONTACT_METHODS[0],
        locale,
      ),
  };
}

function buildSubmissionMessage(values: FormState, locale: Locale) {
  const copy = COPY[locale];
  const classification = classifyLead(values, locale);

  const objectiveLabel =
    getOptionLabel(
      OBJECTIVE_OPTIONS.find((option) => option.id === values.primaryObjective) ?? OBJECTIVE_OPTIONS[0],
      locale,
    ) + (values.primaryObjective === "other" && values.primaryObjectiveOther ? `: ${values.primaryObjectiveOther}` : "");

  const marketingActions = values.marketingActions
    .map((id) => getOptionLabel(MARKETING_OPTIONS.find((option) => option.id === id) ?? MARKETING_OPTIONS[0], locale))
    .join(", ");

  const successMetrics = values.successMetrics
    .map((id) => getOptionLabel(SUCCESS_METRICS.find((option) => option.id === id) ?? SUCCESS_METRICS[0], locale))
    .join(", ");

  return [
    `${copy.classificationTitle}`,
    `${copy.leadPriority}: ${classification.leadPriority}`,
    `${copy.primaryGoal}: ${classification.primaryGoal}`,
    `${copy.maturity}: ${classification.marketingMaturity}`,
    `${copy.recommendation}: ${classification.recommendedFocus}`,
    `${copy.preferredFollowup}: ${classification.preferredFollowup}`,
    "",
    `${copy.companyTitle}`,
    `${copy.companyName}: ${values.companyName}`,
    `${copy.role}: ${values.role}`,
    `${copy.contactName}: ${values.contactName}`,
    `${copy.email}: ${values.email}`,
    `${copy.phone}: ${values.phone}`,
    `${copy.preferredContactMethod}: ${classification.preferredFollowup}`,
    `${copy.website}: ${values.website}`,
    "",
    `${copy.businessTitle}`,
    `${copy.businessDescription}: ${values.businessDescription}`,
    `${copy.differentiator}: ${values.differentiator}`,
    `${copy.primaryObjective}: ${objectiveLabel}`,
    "",
    `${copy.clientTitle}`,
    `${copy.idealClient}: ${values.idealClient}`,
    `${copy.clientProblem}: ${values.clientProblem}`,
    `${copy.decisionDriver}: ${values.decisionDriver}`,
    "",
    `${copy.digitalTitle}`,
    `${copy.socialPain}: ${values.socialPain}`,
    `${copy.representativeContent}: ${values.representativeContent}`,
    `${copy.inspiration}: ${values.inspiration}`,
    "",
    `${copy.marketingTitle}`,
    `${copy.marketingActions}: ${marketingActions}${values.marketingActions.includes("other") && values.marketingActionsOther ? ` | ${values.marketingActionsOther}` : ""}`,
    `${copy.marketingResults}: ${values.marketingResults}`,
    "",
    `${copy.salesTitle}`,
    `${copy.salesProcess}: ${values.salesProcess}`,
    `${copy.socialResponder}: ${values.socialResponder}`,
    "",
    `${copy.goalsTitle}`,
    `${copy.sixMonthSuccess}: ${values.sixMonthSuccess}`,
    `${copy.successMetrics}: ${successMetrics}${values.successMetrics.includes("other") && values.successMetricsOther ? ` | ${values.successMetricsOther}` : ""}`,
    `${copy.brandConstraints}: ${values.brandConstraints}`,
    "",
    `${copy.resourcesTitle}`,
    `${copy.resourceWebsite}: ${values.resourceWebsite}`,
    `${copy.instagram}: ${values.instagram}`,
    `${copy.tiktok}: ${values.tiktok}`,
    `${copy.linkedin}: ${values.linkedin}`,
    `${copy.brandManual}: ${values.brandManual}`,
    `${copy.brochure}: ${values.brochure}`,
    `${copy.otherResources}: ${values.otherResources}`,
  ].join("\n");
}

function DiagnosticChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-[#1183D0] bg-[#E0EEFB] text-[#1183D0] shadow-[0_10px_24px_rgba(17,131,208,0.12)]"
          : "border-[#d6e4f3] bg-white text-[#5c7792] hover:border-[#1183D0] hover:text-[#1183D0]",
      )}
    >
      {children}
    </button>
  );
}

function DiagnosticSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(246,250,255,0.84)_100%)] shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl">
      <CardContent className="p-7 md:p-8">
        <h2 className="mb-6 font-inter text-[24px] leading-tight text-[#0e2951]">{title}</h2>
        <div className="space-y-5">{children}</div>
      </CardContent>
    </Card>
  );
}

export default function SocialMediaDiagnosticPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [values, setValues] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const copy = COPY[locale];
  const classification = useMemo(() => classifyLead(values, locale), [locale, values]);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!values.companyName.trim()) nextErrors.companyName = copy.required;
    if (!values.contactName.trim()) nextErrors.contactName = copy.required;
    if (!values.email.trim()) nextErrors.email = copy.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = copy.invalidEmail;

    if (!values.phone.trim()) nextErrors.phone = copy.required;
    else if (values.phone.trim().length < 6) nextErrors.phone = copy.invalidPhone;

    if (!values.businessDescription.trim()) nextErrors.businessDescription = copy.required;
    if (!values.primaryObjective.trim()) nextErrors.primaryObjective = copy.chooseOne;
    if (values.primaryObjective === "other" && !values.primaryObjectiveOther.trim()) nextErrors.primaryObjectiveOther = copy.required;
    if (!values.idealClient.trim()) nextErrors.idealClient = copy.required;
    if (!values.socialPain.trim()) nextErrors.socialPain = copy.required;
    if (!values.sixMonthSuccess.trim()) nextErrors.sixMonthSuccess = copy.required;
    if (!values.successMetrics.length) nextErrors.successMetrics = copy.chooseOne;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: values.contactName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.companyName.trim(),
        preferred_contact_method: classification.preferredFollowup,
        lead_priority: classification.leadPriority,
        primary_goal: classification.primaryGoal,
        marketing_maturity: classification.marketingMaturity,
        recommended_focus: classification.recommendedFocus,
        message: buildSubmissionMessage(values, locale),
        _subject:
          locale === "es"
            ? `Nuevo diagnóstico de redes sociales - ${values.companyName.trim()}`
            : `New social media diagnostic - ${values.companyName.trim()}`,
        _template: "table",
        _captcha: "false",
        _next: "https://www.greddys.com/social-media-diagnostic",
      };

      const response = await fetch("https://formsubmit.co/ajax/greddysmartinez5@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccessMessage(copy.success);
      setValues(INITIAL_FORM);
      setErrors({});
    } catch {
      setSuccessMessage(locale === "es" ? "No se pudo enviar el formulario. Inténtalo de nuevo." : "The form could not be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F0F7FF] text-[#3c3e3f]">
      <SiteHeader active="Contact" />

      {successMessage ? (
        <div className="fixed right-4 top-24 z-[80] max-w-[360px] rounded-[18px] border border-white/60 bg-[linear-gradient(135deg,rgba(247,241,249,0.96)_0%,rgba(243,247,255,0.94)_45%,rgba(255,247,239,0.92)_100%)] px-4 py-3 text-sm font-medium text-[#0e2951] shadow-[0_18px_40px_rgba(31,53,94,0.16)] backdrop-blur-xl">
          {successMessage}
        </div>
      ) : null}

      <section className="bg-white">
        <div
          className="relative overflow-hidden px-6 pb-12 pt-24 sm:px-10 lg:px-16"
          style={{
            background:
              "linear-gradient(90deg, #e6f1fb 0%, #eee7fb 37%, #f9e5ee 68%, #fcf0e2 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(171,160,246,0.16),transparent_42%),radial-gradient(circle_at_72%_26%,rgba(255,174,202,0.18),transparent_32%),radial-gradient(circle_at_92%_50%,rgba(255,224,189,0.2),transparent_24%)]" />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button asChild variant="ghost" size="sm" className="gap-2 rounded-full border border-white/45 bg-white/55 px-5 text-[#0e2951] hover:bg-white/80 hover:text-[#0e2951]">
                <Link href={withBasePath("/contact")}>
                  <ArrowLeft className="h-4 w-4" />
                  {copy.back}
                </Link>
              </Button>
              <div className="inline-flex rounded-full border border-white/50 bg-white/65 p-1 shadow-[0_12px_30px_rgba(14,41,81,0.08)]">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    locale === "es" ? "bg-[#1183D0] text-white" : "text-[#5c7792]",
                  )}
                >
                  {copy.langEs}
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    locale === "en" ? "bg-[#1183D0] text-white" : "text-[#5c7792]",
                  )}
                >
                  {copy.langEn}
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="max-w-[720px]">
                <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="items-start text-left" />
                <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-[#5c7792]">{copy.intro}</p>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/55 bg-white/60 px-5 py-3 text-sm font-medium text-[#0e2951] shadow-[0_12px_32px_rgba(14,41,81,0.08)]">
                  <Sparkles className="h-4 w-4 text-[#1183D0]" />
                  {copy.timing}
                </div>
              </div>

              <Card className="overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(248,251,255,0.82)_100%)] shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl">
                <CardContent className="space-y-5 p-8">
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.35em] text-[#1183D0]">
                      {copy.classificationTitle}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#5c7792]">{copy.classificationBody}</p>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[22px] border border-[#d8e6f4] bg-white px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a8faa]">{copy.leadPriority}</p>
                      <p className="mt-2 text-[20px] font-semibold text-[#0e2951]">{classification.leadPriority}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#d8e6f4] bg-white px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a8faa]">{copy.primaryGoal}</p>
                      <p className="mt-2 text-[16px] font-semibold text-[#0e2951]">{classification.primaryGoal}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#d8e6f4] bg-white px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a8faa]">{copy.maturity}</p>
                      <p className="mt-2 text-[16px] font-semibold text-[#0e2951]">{classification.marketingMaturity}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#d8e6f4] bg-white px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a8faa]">{copy.recommendation}</p>
                      <p className="mt-2 text-sm leading-7 text-[#5c7792]">{classification.recommendedFocus}</p>
                    </div>
                    <div className="rounded-[22px] border border-[#d8e6f4] bg-white px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a8faa]">{copy.preferredFollowup}</p>
                      <p className="mt-2 text-[16px] font-semibold text-[#0e2951]">{classification.preferredFollowup}</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#dce7f4] bg-white px-5 py-5 text-[13px] leading-7 text-[#5c7792]">
                    {copy.helper}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-10">
        <form className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]" onSubmit={handleSubmit}>
          <div className="space-y-8">
            <DiagnosticSection title={copy.contactTitle}>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField>
                  <Label htmlFor="contactName">{copy.contactName}</Label>
                  <Input id="contactName" value={values.contactName} onChange={(event) => updateField("contactName", event.target.value)} placeholder={copy.contactName} />
                  {errors.contactName ? <FormFieldMessage className="text-[#c25b67]">{errors.contactName}</FormFieldMessage> : null}
                </FormField>
                <FormField>
                  <Label htmlFor="email">{copy.email}</Label>
                  <Input id="email" type="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} placeholder="name@company.com" />
                  {errors.email ? <FormFieldMessage className="text-[#c25b67]">{errors.email}</FormFieldMessage> : null}
                </FormField>
                <FormField>
                  <Label htmlFor="phone">{copy.phone}</Label>
                  <Input id="phone" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+34 600 000 000" />
                  {errors.phone ? <FormFieldMessage className="text-[#c25b67]">{errors.phone}</FormFieldMessage> : null}
                </FormField>
                <FormField>
                  <Label>{copy.preferredContactMethod}</Label>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_METHODS.map((option) => (
                      <DiagnosticChip
                        key={option.id}
                        active={values.preferredContactMethod === option.id}
                        onClick={() => updateField("preferredContactMethod", option.id)}
                      >
                        {getOptionLabel(option, locale)}
                      </DiagnosticChip>
                    ))}
                  </div>
                </FormField>
              </div>
            </DiagnosticSection>

            <DiagnosticSection title={copy.companyTitle}>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField>
                  <Label htmlFor="companyName">{copy.companyName}</Label>
                  <Input id="companyName" value={values.companyName} onChange={(event) => updateField("companyName", event.target.value)} placeholder={copy.companyName} />
                  {errors.companyName ? <FormFieldMessage className="text-[#c25b67]">{errors.companyName}</FormFieldMessage> : null}
                </FormField>
                <FormField>
                  <Label htmlFor="role">{copy.role}</Label>
                  <Input id="role" value={values.role} onChange={(event) => updateField("role", event.target.value)} placeholder={copy.role} />
                </FormField>
              </div>
              <FormField>
                <Label htmlFor="website">{copy.website}</Label>
                <Input id="website" value={values.website} onChange={(event) => updateField("website", event.target.value)} placeholder="https://example.com" />
              </FormField>
            </DiagnosticSection>

            <DiagnosticSection title={copy.businessTitle}>
              <FormField>
                <Label htmlFor="businessDescription">{copy.businessDescription}</Label>
                <Textarea id="businessDescription" value={values.businessDescription} onChange={(event) => updateField("businessDescription", event.target.value)} className="min-h-[150px]" />
                {errors.businessDescription ? <FormFieldMessage className="text-[#c25b67]">{errors.businessDescription}</FormFieldMessage> : null}
              </FormField>
              <FormField>
                <Label htmlFor="differentiator">{copy.differentiator}</Label>
                <Textarea id="differentiator" value={values.differentiator} onChange={(event) => updateField("differentiator", event.target.value)} className="min-h-[130px]" />
              </FormField>
              <FormField>
                <Label>{copy.primaryObjective}</Label>
                <div className="flex flex-wrap gap-2">
                  {OBJECTIVE_OPTIONS.map((option) => (
                    <DiagnosticChip
                      key={option.id}
                      active={values.primaryObjective === option.id}
                      onClick={() => updateField("primaryObjective", option.id)}
                    >
                      {getOptionLabel(option, locale)}
                    </DiagnosticChip>
                  ))}
                </div>
                {errors.primaryObjective ? <FormFieldMessage className="text-[#c25b67]">{errors.primaryObjective}</FormFieldMessage> : null}
              </FormField>
              {values.primaryObjective === "other" ? (
                <FormField>
                  <Label htmlFor="primaryObjectiveOther">{copy.otherPlaceholder}</Label>
                  <Input id="primaryObjectiveOther" value={values.primaryObjectiveOther} onChange={(event) => updateField("primaryObjectiveOther", event.target.value)} placeholder={copy.otherPlaceholder} />
                  {errors.primaryObjectiveOther ? <FormFieldMessage className="text-[#c25b67]">{errors.primaryObjectiveOther}</FormFieldMessage> : null}
                </FormField>
              ) : null}
            </DiagnosticSection>

            <DiagnosticSection title={copy.clientTitle}>
              <FormField>
                <Label htmlFor="idealClient">{copy.idealClient}</Label>
                <Textarea id="idealClient" value={values.idealClient} onChange={(event) => updateField("idealClient", event.target.value)} className="min-h-[140px]" />
                <FormFieldMessage>{copy.idealClientHint}</FormFieldMessage>
                {errors.idealClient ? <FormFieldMessage className="text-[#c25b67]">{errors.idealClient}</FormFieldMessage> : null}
              </FormField>
              <FormField>
                <Label htmlFor="clientProblem">{copy.clientProblem}</Label>
                <Textarea id="clientProblem" value={values.clientProblem} onChange={(event) => updateField("clientProblem", event.target.value)} className="min-h-[130px]" />
              </FormField>
              <FormField>
                <Label htmlFor="decisionDriver">{copy.decisionDriver}</Label>
                <Textarea id="decisionDriver" value={values.decisionDriver} onChange={(event) => updateField("decisionDriver", event.target.value)} className="min-h-[130px]" />
              </FormField>
            </DiagnosticSection>

            <DiagnosticSection title={copy.digitalTitle}>
              <FormField>
                <Label htmlFor="socialPain">{copy.socialPain}</Label>
                <Textarea id="socialPain" value={values.socialPain} onChange={(event) => updateField("socialPain", event.target.value)} className="min-h-[130px]" />
                {errors.socialPain ? <FormFieldMessage className="text-[#c25b67]">{errors.socialPain}</FormFieldMessage> : null}
              </FormField>
              <FormField>
                <Label htmlFor="representativeContent">{copy.representativeContent}</Label>
                <Textarea id="representativeContent" value={values.representativeContent} onChange={(event) => updateField("representativeContent", event.target.value)} className="min-h-[130px]" />
              </FormField>
              <FormField>
                <Label htmlFor="inspiration">{copy.inspiration}</Label>
                <Textarea id="inspiration" value={values.inspiration} onChange={(event) => updateField("inspiration", event.target.value)} className="min-h-[130px]" />
              </FormField>
            </DiagnosticSection>

            <DiagnosticSection title={copy.marketingTitle}>
              <FormField>
                <Label>{copy.marketingActions}</Label>
                <div className="flex flex-wrap gap-2">
                  {MARKETING_OPTIONS.map((option) => (
                    <DiagnosticChip
                      key={option.id}
                      active={values.marketingActions.includes(option.id)}
                      onClick={() => updateField("marketingActions", toggleSelection(values.marketingActions, option.id))}
                    >
                      {values.marketingActions.includes(option.id) ? <Check className="mr-2 inline h-4 w-4" /> : null}
                      {getOptionLabel(option, locale)}
                    </DiagnosticChip>
                  ))}
                </div>
              </FormField>
              {values.marketingActions.includes("other") ? (
                <FormField>
                  <Label htmlFor="marketingActionsOther">{copy.otherPlaceholder}</Label>
                  <Input id="marketingActionsOther" value={values.marketingActionsOther} onChange={(event) => updateField("marketingActionsOther", event.target.value)} placeholder={copy.otherPlaceholder} />
                </FormField>
              ) : null}
              <FormField>
                <Label htmlFor="marketingResults">{copy.marketingResults}</Label>
                <Textarea id="marketingResults" value={values.marketingResults} onChange={(event) => updateField("marketingResults", event.target.value)} className="min-h-[130px]" />
              </FormField>
            </DiagnosticSection>

            <DiagnosticSection title={copy.salesTitle}>
              <FormField>
                <Label htmlFor="salesProcess">{copy.salesProcess}</Label>
                <Textarea id="salesProcess" value={values.salesProcess} onChange={(event) => updateField("salesProcess", event.target.value)} className="min-h-[140px]" />
              </FormField>
              <FormField>
                <Label htmlFor="socialResponder">{copy.socialResponder}</Label>
                <Textarea id="socialResponder" value={values.socialResponder} onChange={(event) => updateField("socialResponder", event.target.value)} className="min-h-[120px]" />
              </FormField>
            </DiagnosticSection>

            <DiagnosticSection title={copy.goalsTitle}>
              <FormField>
                <Label htmlFor="sixMonthSuccess">{copy.sixMonthSuccess}</Label>
                <Textarea id="sixMonthSuccess" value={values.sixMonthSuccess} onChange={(event) => updateField("sixMonthSuccess", event.target.value)} className="min-h-[140px]" />
                {errors.sixMonthSuccess ? <FormFieldMessage className="text-[#c25b67]">{errors.sixMonthSuccess}</FormFieldMessage> : null}
              </FormField>
              <FormField>
                <Label>{copy.successMetrics}</Label>
                <div className="flex flex-wrap gap-2">
                  {SUCCESS_METRICS.map((option) => (
                    <DiagnosticChip
                      key={option.id}
                      active={values.successMetrics.includes(option.id)}
                      onClick={() => updateField("successMetrics", toggleSelection(values.successMetrics, option.id))}
                    >
                      {values.successMetrics.includes(option.id) ? <Check className="mr-2 inline h-4 w-4" /> : null}
                      {getOptionLabel(option, locale)}
                    </DiagnosticChip>
                  ))}
                </div>
                {errors.successMetrics ? <FormFieldMessage className="text-[#c25b67]">{errors.successMetrics}</FormFieldMessage> : null}
              </FormField>
              {values.successMetrics.includes("other") ? (
                <FormField>
                  <Label htmlFor="successMetricsOther">{copy.otherPlaceholder}</Label>
                  <Input id="successMetricsOther" value={values.successMetricsOther} onChange={(event) => updateField("successMetricsOther", event.target.value)} placeholder={copy.otherPlaceholder} />
                </FormField>
              ) : null}
              <FormField>
                <Label htmlFor="brandConstraints">{copy.brandConstraints}</Label>
                <Textarea id="brandConstraints" value={values.brandConstraints} onChange={(event) => updateField("brandConstraints", event.target.value)} className="min-h-[130px]" />
              </FormField>
            </DiagnosticSection>
          </div>

          <div className="space-y-8">
            <DiagnosticSection title={copy.resourcesTitle}>
              <div className="rounded-[22px] border border-[#dce7f4] bg-white px-4 py-4 text-sm leading-7 text-[#5c7792]">
                <p className="font-medium text-[#0e2951]">{copy.resourcesIntro}</p>
                <p className="mt-2">{copy.resourcesNote}</p>
              </div>
              <FormField>
                <Label htmlFor="resourceWebsite">{copy.resourceWebsite}</Label>
                <Input id="resourceWebsite" value={values.resourceWebsite} onChange={(event) => updateField("resourceWebsite", event.target.value)} placeholder="https://example.com/landing" />
              </FormField>
              <FormField>
                <Label htmlFor="instagram">{copy.instagram}</Label>
                <Input id="instagram" value={values.instagram} onChange={(event) => updateField("instagram", event.target.value)} placeholder="https://instagram.com/..." />
              </FormField>
              <FormField>
                <Label htmlFor="tiktok">{copy.tiktok}</Label>
                <Input id="tiktok" value={values.tiktok} onChange={(event) => updateField("tiktok", event.target.value)} placeholder="https://tiktok.com/..." />
              </FormField>
              <FormField>
                <Label htmlFor="linkedin">{copy.linkedin}</Label>
                <Input id="linkedin" value={values.linkedin} onChange={(event) => updateField("linkedin", event.target.value)} placeholder="https://linkedin.com/company/..." />
              </FormField>
              <FormField>
                <Label htmlFor="brandManual">{copy.brandManual}</Label>
                <Input id="brandManual" value={values.brandManual} onChange={(event) => updateField("brandManual", event.target.value)} placeholder="Drive, Notion o URL" />
              </FormField>
              <FormField>
                <Label htmlFor="brochure">{copy.brochure}</Label>
                <Input id="brochure" value={values.brochure} onChange={(event) => updateField("brochure", event.target.value)} placeholder="Drive, PDF o URL" />
              </FormField>
              <FormField>
                <Label htmlFor="otherResources">{copy.otherResources}</Label>
                <Textarea id="otherResources" value={values.otherResources} onChange={(event) => updateField("otherResources", event.target.value)} className="min-h-[140px]" />
              </FormField>
            </DiagnosticSection>

            <Card className="overflow-hidden rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(247,251,255,0.84)_100%)] shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl">
              <CardContent className="p-7 md:p-8">
                <div className="mb-6 flex items-center gap-3 text-[#0e2951]">
                  <Mail className="h-5 w-5 text-[#1183D0]" />
                  <span className="font-semibold">{copy.formTitle}</span>
                </div>
                <div className="space-y-4 rounded-[22px] border border-[#dce7f4] bg-white px-5 py-5">
                  <div className="flex items-start gap-3">
                    <Globe2 className="mt-1 h-4 w-4 text-[#1183D0]" />
                    <p className="text-sm leading-7 text-[#5c7792]">{copy.helper}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-[#1183D0]" />
                    <p className="text-sm leading-7 text-[#5c7792]">
                      {locale === "es"
                        ? "El formulario pide nombre, email, teléfono y método preferido de contacto para facilitar el seguimiento."
                        : "The form requests name, email, phone, and preferred contact method to make follow-up easier."}
                    </p>
                  </div>
                </div>
                <Button type="submit" disabled={submitting} className="mt-6 h-14 w-full rounded-full text-base">
                  {submitting ? copy.submitting : copy.submit}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
