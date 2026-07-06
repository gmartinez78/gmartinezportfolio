import type { Language } from "@/lib/i18n/language-context";

export const dictionary = {
  // Header / nav
  "header.openMenu": { en: "Open menu", es: "Abrir menú" },
  "header.closeMenu": { en: "Close menu", es: "Cerrar menú" },
  "header.homeAria": { en: "Greddys Martinez home", es: "Inicio de Greddys Martinez" },
  "header.languageToggleAria": { en: "Switch language", es: "Cambiar idioma" },

  // Footer
  "footer.home": { en: "Home", es: "Inicio" },
  "footer.siteMap": { en: "Site Map", es: "Mapa del sitio" },
  "footer.connect": { en: "Connect", es: "Conecta" },

  // Contact form
  "contactForm.name": { en: "Name", es: "Nombre" },
  "contactForm.namePlaceholder": { en: "Your name", es: "Tu nombre" },
  "contactForm.email": { en: "Email", es: "Correo electrónico" },
  "contactForm.emailPlaceholder": { en: "your@email.com", es: "tucorreo@email.com" },
  "contactForm.subject": { en: "Subject", es: "Asunto" },
  "contactForm.subjectPlaceholder": { en: "What's this about?", es: "¿De qué se trata?" },
  "contactForm.message": { en: "Message", es: "Mensaje" },
  "contactForm.messagePlaceholder": { en: "Tell me about your project...", es: "Cuéntame sobre tu proyecto..." },
  "contactForm.sending": { en: "Sending...", es: "Enviando..." },
  "contactForm.sendMessage": { en: "Send Message", es: "Enviar mensaje" },
  "contactForm.errorName": { en: "Please add your name.", es: "Por favor, añade tu nombre." },
  "contactForm.errorEmail": { en: "Please add your email.", es: "Por favor, añade tu correo electrónico." },
  "contactForm.errorEmailInvalid": { en: "Please enter a valid email.", es: "Introduce un correo electrónico válido." },
  "contactForm.errorMessage": { en: "Please add a message.", es: "Por favor, añade un mensaje." },
  "contactForm.errorMessageDetail": { en: "Please add a bit more detail.", es: "Añade un poco más de detalle." },
  "contactForm.errorSendFailed": {
    en: "I couldn't send the email right now. Please try again.",
    es: "No he podido enviar el correo ahora mismo. Inténtalo de nuevo.",
  },
  "contactForm.sentSuccess": {
    en: "Email sent. I'll get back to you soon.",
    es: "Correo enviado. Te responderé pronto.",
  },

  // Contact page
  "contactPage.sendAMessage": { en: "Send a message", es: "Envía un mensaje" },

  // Projects listing page
  "projectsPage.title": { en: "Projects", es: "Proyectos" },
  "projectsPage.intro": {
    en: "Case studies and highlights from 10+ years designing enterprise SaaS, healthtech, and nonprofit digital experiences.",
    es: "Casos de estudio y momentos destacados de más de 10 años diseñando experiencias digitales para SaaS empresarial, salud digital y organizaciones sin ánimo de lucro.",
  },
  "projectsPage.showingRelatedTo": { en: "Showing projects related to", es: "Mostrando proyectos relacionados con" },
  "projectsPage.companiesWorkedWith": { en: "Companies I've worked with", es: "Empresas con las que he trabajado" },
  "projectsPage.passwordRequired": { en: "Password required ↗", es: "Requiere contraseña ↗" },
  "projectsPage.comingSoon": { en: "Coming soon", es: "Próximamente" },
  "projectsPage.viewCaseStudy": { en: "View case study ↗", es: "Ver caso de estudio ↗" },

  // Filter pill labels (display only — matching logic still uses the English identifiers)
  "filter.All": { en: "All", es: "Todos" },
  "filter.UX Research": { en: "UX Research", es: "Investigación UX" },
  "filter.Product Design": { en: "Product Design", es: "Diseño de producto" },
  "filter.Design Systems": { en: "Design Systems", es: "Sistemas de diseño" },
  "filter.AI Product": { en: "AI Product", es: "Producto de IA" },
  "filter.Compliance": { en: "Compliance", es: "Cumplimiento normativo" },
  "filter.Accessibility": { en: "Accessibility", es: "Accesibilidad" },

  // Tag labels (display only)
  "tag.Axe": { en: "Axe", es: "Axe" },
  "tag.BENEFITS / ENSURANCE SAAS": { en: "BENEFITS / ENSURANCE SAAS", es: "BENEFICIOS / SAAS DE SEGUROS" },
  "tag.Brand Strategy": { en: "Brand Strategy", es: "Estrategia de marca" },
  "tag.Content Design": { en: "Content Design", es: "Diseño de contenido" },
  "tag.Design system": { en: "Design system", es: "Sistema de diseño" },
  "tag.Funnel Optimization": { en: "Funnel Optimization", es: "Optimización de embudo" },
  "tag.Growth": { en: "Growth", es: "Crecimiento" },
  "tag.IA": { en: "IA", es: "AI" },
  "tag.Interaction Design": { en: "Interaction Design", es: "Diseño de interacción" },
  "tag.Localization": { en: "Localization", es: "Localización" },
  "tag.Paid Acquisition": { en: "Paid Acquisition", es: "Adquisición de pago" },
  "tag.Voice Over": { en: "Voice Over", es: "Locución" },
  "tag.Workflow Design": { en: "Workflow Design", es: "Diseño de flujos de trabajo" },
  "tag.Experimentation": { en: "Experimentation", es: "Experimentación" },
  "tag.Landing Pages": { en: "Landing Pages", es: "Landing pages" },

  // Resume page
  "resume.backToHome": { en: "Back to Home", es: "Volver al inicio" },
  "resume.downloadResume": { en: "Download Resume", es: "Descargar currículum" },
  "resume.eyebrow": { en: "Resume", es: "Currículum" },
  "resume.upworkCertified": { en: "Upwork Skill Certification", es: "Certificación de Upwork" },
  "resume.nngCertified": { en: "NN Group UX Certified Interaction Design", es: "Certificación NN Group en Diseño de Interacción UX" },
  "resume.uxCertifiedProfessional": { en: "UX Certified Professional", es: "Profesional certificado en UX" },
  "resume.careerEyebrow": { en: "Career", es: "Trayectoria" },
  "resume.experienceHeading": { en: "Experience", es: "Experiencia" },
  "resume.capabilitiesEyebrow": { en: "Capabilities", es: "Capacidades" },
  "resume.skillsHeading": { en: "Skills", es: "Habilidades" },
  "resume.educationEyebrow": { en: "Education", es: "Educación" },
  "resume.trainingHeading": { en: "Training", es: "Formación" },
  "resume.stackEyebrow": { en: "Stack", es: "Tecnologías" },
  "resume.toolsHeading": { en: "Tools", es: "Herramientas" },
  "resume.certificationsEyebrow": { en: "Certifications", es: "Certificaciones" },
  "resume.recognitionHeading": { en: "Recognition", es: "Reconocimientos" },
  "resume.clientLabel": { en: "Client", es: "Cliente" },

  // Project card
  "projectCard.locked": { en: "Locked", es: "Bloqueado" },

  // Case study page chrome (shared across all case studies)
  "caseStudy.loading": { en: "Loading case study...", es: "Cargando caso de estudio..." },
  "caseStudy.backToProjects": { en: "Back to Projects", es: "Volver a proyectos" },
  "caseStudy.home": { en: "Home", es: "Inicio" },
  "caseStudy.projects": { en: "Projects", es: "Proyectos" },
  "caseStudy.year": { en: "Year", es: "Año" },
  "caseStudy.role": { en: "Role", es: "Rol" },
  "caseStudy.client": { en: "Client", es: "Cliente" },
  "caseStudy.myRole": { en: "My Role", es: "Mi rol" },
  "caseStudy.toolsUsed": { en: "Tools Used", es: "Herramientas utilizadas" },
  "caseStudy.timeline": { en: "Timeline", es: "Cronología" },
  "caseStudy.successMetrics": { en: "Success Metrics", es: "Métricas de éxito" },
  "caseStudy.unlockCaseStudy": { en: "Unlock case study", es: "Desbloquear caso de estudio" },
  "caseStudy.passwordProtected": { en: "Password Protected", es: "Protegido con contraseña" },
  "caseStudy.lockedPlaceholderNotice": {
    en: "This placeholder is locked for now while the final case study data is being prepared.",
    es: "Este marcador de posición está bloqueado por ahora mientras se prepara el contenido final del caso de estudio.",
  },
  "caseStudy.enterPassword": { en: "Enter password", es: "Introduce la contraseña" },
  "caseStudy.incorrectPassword": { en: "Incorrect password.", es: "Contraseña incorrecta." },
  "caseStudy.reversetechDuration": { en: "5 to 7 days", es: "5 a 7 días" },

  // Home page — hero / assistant / sections
  "home.viewCaseStudy": { en: "View case study", es: "Ver caso de estudio" },
  "home.viewProject": { en: "View project", es: "Ver proyecto" },
  "home.githubActivity": { en: "GitHub Activity", es: "Actividad en GitHub" },
  "home.githubActivityDescription": {
    en: "Recent public GitHub work and repository activity.",
    es: "Actividad reciente y pública en repositorios de GitHub.",
  },
  "home.githubProfile": { en: "GitHub profile", es: "Perfil de GitHub" },
  "home.githubEmptyState": {
    en: "Recent public coding activity appears here when the feed is available.",
    es: "La actividad reciente de código público aparece aquí cuando el feed está disponible.",
  },
  "home.commits": { en: "Commits", es: "Commits" },
  "home.pullRequests": { en: "PRs", es: "PRs" },
  "home.issues": { en: "Issues", es: "Issues" },
  "home.repos": { en: "Repos", es: "Repos" },
  "home.scrollProjectsLeft": { en: "Scroll projects left", es: "Desplazar proyectos a la izquierda" },
  "home.scrollProjectsRight": { en: "Scroll projects right", es: "Desplazar proyectos a la derecha" },
  "home.assistantSuggestion1": { en: "Show me AI projects", es: "Muéstrame proyectos de IA" },
  "home.assistantSuggestion2": {
    en: "Which case studies include UX research?",
    es: "¿Qué casos de estudio incluyen investigación UX?",
  },
  "home.assistantSuggestion3": {
    en: "What design systems work is on this site?",
    es: "¿Qué trabajo de sistemas de diseño hay en este sitio?",
  },
  "home.assistantSuggestion4": {
    en: "Where can I see resume details?",
    es: "¿Dónde puedo ver los detalles del currículum?",
  },
  "home.assistantDefaultResponse": {
    en: "Ask about projects, case studies, skills, resume, contact details, or GitHub activity on this website.",
    es: "Pregunta sobre proyectos, casos de estudio, habilidades, currículum, datos de contacto o actividad en GitHub de este sitio.",
  },
  "home.assistantNoMatch": {
    en: "I can only provide information already available on this website. I couldn't find that here.",
    es: "Solo puedo ofrecer información que ya está disponible en este sitio web. No he encontrado eso aquí.",
  },
  "home.assistantOneProjectMatch": {
    en: "I found 1 matching project on this website and a few relevant places to continue.",
    es: "He encontrado 1 proyecto que coincide en este sitio web y algunos lugares relevantes para continuar.",
  },
  "home.assistantMultipleMatches": {
    en: "I found {count} matching projects and a few related sections on this website.",
    es: "He encontrado {count} proyectos que coinciden y algunas secciones relacionadas en este sitio web.",
  },
  "home.assistantGenericMatch": {
    en: 'I found relevant information on this website for "{query}".',
    es: 'He encontrado información relevante en este sitio web sobre "{query}".',
  },
  "home.assistantSearchError": {
    en: "I couldn't search the website right now.",
    es: "No he podido buscar en el sitio web ahora mismo.",
  },
  "home.assistantResumeTitle": { en: "Resume", es: "Currículum" },
  "home.assistantContactTitle": { en: "Contact", es: "Contacto" },
  "home.assistantGithubTitle": { en: "GitHub Activity", es: "Actividad en GitHub" },
  "home.assistantGithubSnippet": {
    en: "Recent public GitHub work and repository activity.",
    es: "Actividad reciente y pública en repositorios de GitHub.",
  },

  // Home page — skills showcase cards
  "home.a11yValidationEyebrow": { en: "A11y validation", es: "Validación de accesibilidad" },
  "home.a11yValidationBadge": { en: "in review", es: "en revisión" },
  "home.focusOrder": { en: "Focus order", es: "Orden de foco" },
  "home.pass": { en: "Pass", es: "Correcto" },
  "home.colorContrast": { en: "Color contrast", es: "Contraste de color" },
  "home.check": { en: "Check", es: "Revisar" },
  "home.labelsAndRoles": { en: "Labels and roles", es: "Etiquetas y roles" },
  "home.keyboardStates": { en: "Keyboard states", es: "Estados de teclado" },
  "home.audit": { en: "Audit", es: "Auditar" },
  "home.a11yCardTitle": {
    en: "Accessibility documentation and UX validation",
    es: "Documentación de accesibilidad y validación UX",
  },
  "home.a11yCardDescription": {
    en: "Brings accessibility thinking to product work through documentation, UX audits, and well-structured design systems that support clearer, more consistent decisions.",
    es: "Aporta una mentalidad de accesibilidad al trabajo de producto mediante documentación, auditorías UX y sistemas de diseño bien estructurados que favorecen decisiones más claras y consistentes.",
  },
  "home.designSystemsCardTitle": {
    en: "Design systems and cross-functional support.",
    es: "Sistemas de diseño y apoyo multidisciplinar.",
  },
  "home.designSystemsCardDescription": {
    en: "A reliable partner for quick design feedback, design systems consultation, and practical IT-related problem solving across the product workflow.",
    es: "Un socio de confianza para feedback de diseño ágil, consultoría de sistemas de diseño y resolución práctica de problemas técnicos a lo largo del flujo de producto.",
  },
  "home.quickDesignFeedback": { en: "Quick design feedback", es: "Feedback de diseño ágil" },
  "home.quickDesignFeedbackDescription": {
    en: "fast reviews, clear notes, actionable product decisions",
    es: "revisiones rápidas, notas claras, decisiones de producto accionables",
  },
  "home.reviews": { en: "Reviews", es: "Revisiones" },
  "home.iteration": { en: "Iteration", es: "Iteración" },
  "home.alignment": { en: "Alignment", es: "Alineación" },
  "home.sharedInputsNote": {
    en: "Shared inputs translated into product direction",
    es: "Aportes compartidos traducidos en dirección de producto",
  },
  "home.collaborationNote": {
    en: "Collaboration helps connect user needs, business goals, and implementation tradeoffs into clearer product decisions.",
    es: "La colaboración ayuda a conectar necesidades de usuario, objetivos de negocio y compromisos de implementación en decisiones de producto más claras.",
  },

  // Home hero pills
  "home.heroPill.aiProductTitle": { en: "AI Product Design", es: "Diseño de producto con IA" },
  "home.heroPill.aiProductSubtitle": { en: "from prompt to shipped UX", es: "del prompt a la UX en producción" },
  "home.heroPill.designSystemsTitle": { en: "Design Systems", es: "Sistemas de diseño" },
  "home.heroPill.designSystemsSubtitle": { en: "patterns built to scale", es: "patrones construidos para escalar" },
  "home.heroPill.uxResearchTitle": { en: "UX Research", es: "Investigación UX" },
  "home.heroPill.uxResearchSubtitle": { en: "insight that shapes delivery", es: "insights que dan forma a la entrega" },
  "home.heroPill.enterpriseSaasTitle": { en: "Enterprise SaaS", es: "SaaS empresarial" },
  "home.heroPill.enterpriseSaasSubtitle": { en: "clear flows for complex products", es: "flujos claros para productos complejos" },

  // Home hero rotating roles
  "home.heroRole1": { en: "designing with AI.", es: "diseñando con IA." },
  "home.heroRole2": { en: "a senior designer.", es: "un diseñador senior." },
  "home.heroRole3": { en: "research that ships.", es: "investigación que se lanza." },
  "home.heroRole4": { en: "enterprise UX.", es: "UX empresarial." },
  "home.heroRole5": { en: "your next UX hire.", es: "tu próxima contratación de UX." },
  "home.caseStudiesLink": { en: "Case studies", es: "Casos de estudio" },
} as const;

export type DictionaryKey = keyof typeof dictionary;

export function translate(key: DictionaryKey, language: Language): string {
  return dictionary[key][language];
}

// Case-study tags/filters are display labels layered over English identifiers used for
// filter matching; fall back to the raw value when a label hasn't been added yet.
export function translateTagLabel(rawValue: string, language: Language): string {
  const tagKey = `tag.${rawValue}` as DictionaryKey;
  const filterKey = `filter.${rawValue}` as DictionaryKey;

  if (dictionary[tagKey]) {
    return dictionary[tagKey][language];
  }

  if (dictionary[filterKey]) {
    return dictionary[filterKey][language];
  }

  return rawValue;
}
