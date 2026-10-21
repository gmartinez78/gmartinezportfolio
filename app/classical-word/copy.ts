import type { SupportedLocale } from "@/lib/i18n/locales";

export type ClassicalWordCopy = {
  breadcrumbHome: string;
  breadcrumbProjects: string;
  breadcrumbCurrent: string;
  pill: string;
  titleLead: string;
  titleAccent: string;
  lede: string;
  details: string[];
  printEyebrow: string;
  printTitleLead: string;
  printTitleAccent: string;
  printBody: string;
  printImageAlt: string;
  directionEyebrow: string;
  directionTitleLead: string;
  directionTitleAccent: string;
  directionBody: string;
  principles: { title: string; body: string }[];
  pieceEyebrow: string;
  pieceTitleLead: string;
  pieceTitleAccent: string;
  pieceBody: string;
  coverCaption: string;
  coverAlt: string;
  insideAlt: string;
  viewCaseStudy: string;
};

const copy: Record<SupportedLocale, ClassicalWordCopy> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
    breadcrumbCurrent: "Classical Word Arabic Institute",
    pill: "Print design",
    titleLead: "Classical Word Arabic Institute",
    titleAccent: "brochure.",
    lede: "Classical Word is a six-panel trifold created to introduce an Arabic learning institute through its faculty, values, and an inviting path to enrollment.",
    details: ["2026", "Brand & Print Designer", "Client: Classical Word"],
    printEyebrow: "Print presentation",
    printTitleLead: "The brand, from first fold to the",
    printTitleAccent: "full story.",
    printBody: "A three-part presentation that introduces the visual language, compares both sides of the brochure, then reveals the full interior.",
    printImageAlt: "Classical Word Arabic Institute brochure cover",
    directionEyebrow: "Design direction",
    directionTitleLead: "Designed to feel considered, not",
    directionTitleAccent: "crowded.",
    directionBody: "The visual system leans into the warmth of traditional print materials while giving every message a clear hierarchy and enough room to breathe.",
    principles: [
      {
        title: "A considered reading path",
        body: "The outside introduces the institute, sets the invitation, and makes enrollment tangible. The inside expands the story from purpose to faculty credibility.",
      },
      {
        title: "A visual language with roots",
        body: "Ivory paper tones, a measured gold accent, editorial serif type, and delicate geometric patterning create a calm, heritage-led identity.",
      },
      {
        title: "Clarity at every fold",
        body: "Headlines, pricing, QR actions, testimonials, and faculty profiles are sequenced to make the programme easy to understand and act on.",
      },
    ],
    pieceEyebrow: "The complete piece",
    pieceTitleLead: "An interior that turns information into an",
    pieceTitleAccent: "experience.",
    pieceBody: "The reverse side gives the programme's story more depth: why Classical Arabic matters, what learners can expect, and the faculty credentials that establish trust.",
    coverCaption: "Outside panels · cover, enrollment and contact",
    coverAlt: "Outside panels of the Classical Word Arabic Institute trifold brochure",
    insideAlt: "Inside panels of the Classical Word Arabic Institute trifold brochure",
    viewCaseStudy: "View case study",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbProjects: "Proyectos",
    breadcrumbCurrent: "Classical Word Arabic Institute",
    pill: "Diseño impreso",
    titleLead: "Classical Word Arabic Institute",
    titleAccent: "folleto.",
    lede: "Classical Word es un tríptico de seis paneles creado para presentar un instituto de enseñanza del árabe a través de su profesorado, sus valores y un camino de inscripción invitador.",
    details: ["2026", "Diseñadora de marca e impresión", "Cliente: Classical Word"],
    printEyebrow: "Presentación impresa",
    printTitleLead: "La marca, del primer pliegue al",
    printTitleAccent: "relato completo.",
    printBody: "Una presentación en tres partes que introduce el lenguaje visual, compara ambos lados del folleto y revela por fin el interior completo.",
    printImageAlt: "Portada del folleto de Classical Word Arabic Institute",
    directionEyebrow: "Dirección de diseño",
    directionTitleLead: "Diseñado para sentirse meditado, no",
    directionTitleAccent: "saturado.",
    directionBody: "El sistema visual se apoya en la calidez de los materiales impresos tradicionales, mientras da a cada mensaje una jerarquía clara y espacio suficiente para respirar.",
    principles: [
      {
        title: "Un recorrido de lectura meditado",
        body: "El exterior presenta el instituto, marca la invitación y hace tangible la inscripción. El interior amplía el relato desde el propósito hasta la credibilidad del profesorado.",
      },
      {
        title: "Un lenguaje visual con raíces",
        body: "Tonos de papel marfil, un acento dorado medido, tipografía serif editorial y un delicado patrón geométrico crean una identidad serena con raíces culturales.",
      },
      {
        title: "Claridad en cada pliegue",
        body: "Titulares, precios, llamadas a la acción con QR, testimonios y perfiles del profesorado se ordenan para que el programa sea fácil de entender y de aprovechar.",
      },
    ],
    pieceEyebrow: "La pieza completa",
    pieceTitleLead: "Un interior que convierte la información en",
    pieceTitleAccent: "experiencia.",
    pieceBody: "La cara interior da más profundidad al relato del programa: por qué importa el árabe clásico, qué pueden esperar los estudiantes y las credenciales del profesorado que generan confianza.",
    coverCaption: "Paneles exteriores · portada, inscripción y contacto",
    coverAlt: "Paneles exteriores del tríptico de Classical Word Arabic Institute",
    insideAlt: "Paneles interiores del tríptico de Classical Word Arabic Institute",
    viewCaseStudy: "Ver caso de estudio",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbProjects: "Projekte",
    breadcrumbCurrent: "Classical Word Arabic Institute",
    pill: "Druckdesign",
    titleLead: "Classical Word Arabic Institute",
    titleAccent: "Broschüre.",
    lede: "Classical Word ist ein sechsseitiger Falzflyer, der ein Institut für Arabischlehre über sein Kollegium, seine Werte und einen einladenden Weg zur Anmeldung vorstellt.",
    details: ["2026", "Marken- und Druckdesignerin", "Kunde: Classical Word"],
    printEyebrow: "Druckpräsentation",
    printTitleLead: "Die Marke, vom ersten Falz bis zur",
    printTitleAccent: "vollständigen Geschichte.",
    printBody: "Eine dreiteilige Präsentation, die die visuelle Sprache vorstellt, beide Seiten der Broschüre gegenüberstellt und schließlich das komplette Innenlayout zeigt.",
    printImageAlt: "Titelseite der Broschüre von Classical Word Arabic Institute",
    directionEyebrow: "Designrichtung",
    directionTitleLead: "Durchdacht gestaltet, nicht",
    directionTitleAccent: "überladen.",
    directionBody: "Das visuelle System setzt auf die Wärme traditioneller Druckmaterialien und gibt zugleich jeder Botschaft eine klare Hierarchie und genug Raum zum Atmen.",
    principles: [
      {
        title: "Ein durchdachter Leseweg",
        body: "Die Außenseiten führen das Institut ein, setzen die Einladung und machen die Anmeldung greifbar. Das Innenlayout vertieft die Geschichte von der Mission bis zur Glaubwürdigkeit des Kollegiums.",
      },
      {
        title: "Eine visuelle Sprache mit Wurzeln",
        body: "Elfenbeinton, ein dosierter Goldakzent, redaktionelle Serifenschrift und feine geometrische Muster ergeben eine ruhige, kulturverwurzelte Identität.",
      },
      {
        title: "Klarheit an jeder Falz",
        body: "Schlagzeilen, Preise, QR-Aktionen, Testimonials und Professorenprofile sind so sequenziert, dass das Programm leicht verständlich und nutzbar bleibt.",
      },
    ],
    pieceEyebrow: "Das vollständige Werk",
    pieceTitleLead: "Ein Innenlayout, das Information in",
    pieceTitleAccent: "Erlebnis verwandelt.",
    pieceBody: "Die Rückseite vertieft die Geschichte des Programms: warum klassisches Arabisch zählt, was Lernende erwartet, und welche Qualifikationen des Kollegiums Vertrauen schaffen.",
    coverCaption: "Außenpanele · Titel, Anmeldung und Kontakt",
    coverAlt: "Außenpanele des Falzflyers von Classical Word Arabic Institute",
    insideAlt: "Innenpanele des Falzflyers von Classical Word Arabic Institute",
    viewCaseStudy: "Fallstudie ansehen",
  },
};

export function getClassicalWordCopy(language: SupportedLocale): ClassicalWordCopy {
  return copy[language] ?? copy.en;
}
