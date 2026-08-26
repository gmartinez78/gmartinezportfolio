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
  "caseStudy.task1": { en: "Task 1", es: "Tarea 1" },
  "caseStudy.task2": { en: "Task 2", es: "Tarea 2" },
  "caseStudy.task3": { en: "Task 3", es: "Tarea 3" },
  "caseStudy.task4Optional": { en: "Task 4 — Impact metrics", es: "Tarea 4 — Métricas de impacto" },
  "caseStudy.task5": { en: "Task 5 — AI implementation", es: "Tarea 5 — Implementación con IA" },
  "caseStudy.tasks": { en: "Tasks", es: "Tareas" },
  "caseStudy.funnelDiagnosisFull": { en: "Funnel diagnosis & design improvements", es: "Diagnóstico del embudo y mejoras de diseño" },
  "caseStudy.funnelDiagnosisShort": { en: "Funnel diagnosis", es: "Diagnóstico del embudo" },
  "caseStudy.task1Description": {
    en: "Identify where users drop off across the quiz and email gate, diagnose the root cause of each churn point, and design improvements prioritized by conversion impact.",
    es: "Identificar dónde abandonan los usuarios a lo largo del quiz y el paso de captura de email, diagnosticar la causa raíz de cada punto de abandono, y diseñar mejoras priorizadas por su impacto en la conversión.",
  },
  "caseStudy.paywallExperimentDesign": { en: "Paywall experiment design", es: "Diseño de experimentos de paywall" },
  "caseStudy.task2Description": {
    en: "Design a structured A/B test plan targeting the paywall conversion gap, with hypotheses covering offer framing, value exchange, and pricing presentation.",
    es: "Diseñar un plan de test A/B estructurado dirigido a la brecha de conversión del paywall, con hipótesis que cubran el enfoque de la oferta, el intercambio de valor y la presentación de precios.",
  },
  "caseStudy.competitorPatternExtraction": { en: "Competitor pattern extraction", es: "Extracción de patrones de la competencia" },
  "caseStudy.task3Description": {
    en: "Analyze how competing subscription fitness apps structure their onboarding and paywall flows to surface patterns worth adapting or testing against the current design.",
    es: "Analizar cómo estructuran las apps de fitness por suscripción de la competencia sus flujos de onboarding y paywall, para identificar patrones que valga la pena adaptar o testear frente al diseño actual.",
  },
  "caseStudy.howIUsedTools": { en: "How I used tools while completing this case", es: "Cómo usé las herramientas al completar este caso" },
  "caseStudy.task4Description": {
    en: "A transparent breakdown of how AI-assisted tools supported analysis, exploration, writing, and delivery — with human judgement guiding the problem framing, decisions, and final quality.",
    es: "Un desglose transparente de cómo las herramientas asistidas por IA apoyaron el análisis, la exploración, la redacción y la entrega, con criterio humano guiando el planteamiento del problema, las decisiones y la calidad final.",
  },
  "caseStudy.impactMetrics": { en: "Impact metrics", es: "Métricas de impacto" },
  "caseStudy.impactMetricsDescription": {
    en: "The proposal is designed to be measured against the existing funnel baseline. These are the signals I would use to validate whether the new entry experience improves both conversion efficiency and decision confidence.",
    es: "La propuesta está diseñada para medirse frente a la línea base actual del embudo. Estas son las señales que usaría para validar si la nueva experiencia de entrada mejora tanto la eficiencia de conversión como la confianza en la decisión.",
  },
  "caseStudy.aiImplementation": { en: "AI implementation", es: "Implementación con IA" },
  "caseStudy.discovery": { en: "Discovery", es: "Descubrimiento" },
  "caseStudy.competitorAnalysis": { en: "Competitor analysis", es: "Análisis de la competencia" },
  "caseStudy.dimension": { en: "Dimension", es: "Dimensión" },
  "caseStudy.patternExtractionEyebrow": { en: "Pattern extraction", es: "Extracción de patrones" },
  "caseStudy.whichPatternsWorthTesting": { en: "Which patterns are worth testing?", es: "¿Qué patrones vale la pena testear?" },
  "caseStudy.patternsIntro": {
    en: "The two test patterns sit on opposite philosophies on purpose. Pattern 1 sells the result before value. Pattern 2 proves value and earns trust before the ask. That contrast is what makes them two real patterns, not one idea twice.",
    es: "Los dos patrones de test parten de filosofías opuestas a propósito. El patrón 1 vende el resultado antes que el valor. El patrón 2 demuestra el valor y se gana la confianza antes de pedir algo. Ese contraste es lo que los convierte en dos patrones reales, no en la misma idea repetida.",
  },
  "caseStudy.screenshot": { en: "Screenshot", es: "Captura" },
  "caseStudy.pattern": { en: "Pattern", es: "Patrón" },
  "caseStudy.metricMoved": { en: "Metric Moved", es: "Métrica afectada" },
  "caseStudy.hypothesisWhy": { en: "Hypothesis / Why", es: "Hipótesis / Por qué" },
  "caseStudy.note": { en: "Note:", es: "Nota:" },
  "caseStudy.personalizedFlowVariant": { en: "Personalized Flow Variant", es: "Variante de flujo personalizado" },
  "caseStudy.patternApplication": { en: "Pattern application", es: "Aplicación del patrón" },
  "caseStudy.figmaFlowIntro": {
    en: "The Figma flow below translates some of the strongest findings from the benchmark review and the deeper funnel research into testable interface directions.",
    es: "El flujo de Figma a continuación traduce algunos de los hallazgos más fuertes de la revisión comparativa y de la investigación más profunda del embudo en direcciones de interfaz testeables.",
  },
  "caseStudy.figmaFlowIntro2": {
    en: "Rather than showing one final solution, it packages those findings into a set of flow variations that could be tested to see which combination best reduces friction, strengthens trust, and improves the value exchange before the email step and paywall.",
    es: "En lugar de mostrar una única solución final, empaqueta esos hallazgos en un conjunto de variaciones de flujo que podrían testearse para ver qué combinación reduce mejor la fricción, refuerza la confianza y mejora el intercambio de valor antes del paso de email y el paywall.",
  },
  "caseStudy.prototypePortion": { en: "Prototype Portion", es: "Sección del prototipo" },
  "caseStudy.browseMobileFlow": { en: "Browse the mobile flow portion below.", es: "Explora la sección del flujo móvil a continuación." },
  "caseStudy.toolsDataAnalysis": { en: "Data analysis", es: "Análisis de datos" },
  "caseStudy.toolsDataAnalysisUse": {
    en: "Used Notebook LM to review links, analyze source material, and research the benchmark set. I also used Claude and ChatGPT to structure the findings into comparison tables and clearer content blocks before translating them into testing directions.",
    es: "Usé Notebook LM para revisar enlaces, analizar el material fuente e investigar el conjunto de comparación. También usé Claude y ChatGPT para estructurar los hallazgos en tablas comparativas y bloques de contenido más claros antes de traducirlos en direcciones de test.",
  },
  "caseStudy.toolsDataAnalysisOptimize": {
    en: "Optimized for speed and pattern detection before moving into design decisions.",
    es: "Optimizado para velocidad y detección de patrones antes de pasar a las decisiones de diseño.",
  },
  "caseStudy.toolsIdeation": { en: "Ideation", es: "Ideación" },
  "caseStudy.toolsIdeationUse": {
    en: "I started with paper-and-pencil sketches to shape the first prototype direction. Then I used Open Design and Claude Design to create two versions, selected the stronger one, iterated on it, and moved it into Figma to refine it and prepare the prototype.",
    es: "Empecé con bocetos a lápiz y papel para definir la primera dirección del prototipo. Luego usé Open Design y Claude Design para crear dos versiones, seleccioné la más sólida, iteré sobre ella y la pasé a Figma para refinarla y preparar el prototipo.",
  },
  "caseStudy.toolsIdeationOptimize": {
    en: "Optimized for breadth of options first, then quality through iteration and visual refinement.",
    es: "Optimizado primero para amplitud de opciones, y luego para calidad mediante iteración y refinamiento visual.",
  },
  "caseStudy.toolsWriting": { en: "Writing", es: "Redacción" },
  "caseStudy.toolsWritingUse": {
    en: "Used ChatGPT to help structure and refine written sections, and Grammarly to tighten grammar and shorten some of the copy so the case study read more clearly and directly.",
    es: "Usé ChatGPT para ayudar a estructurar y refinar las secciones escritas, y Grammarly para ajustar la gramática y acortar parte del texto para que el caso de estudio se leyera con más claridad y más directo.",
  },
  "caseStudy.toolsWritingOptimize": {
    en: "Optimized for clarity, cleaner phrasing, and shorter copy.",
    es: "Optimizado para claridad, redacción más limpia y textos más cortos.",
  },
  "caseStudy.toolsPolishDelivery": { en: "Polish and delivery", es: "Pulido y entrega" },
  "caseStudy.toolsPolishDeliveryUse": {
    en: "Used Figma to polish the selected direction and prepare the final prototype, then used coding tools to place the work into the case-study page and iterate on the final presentation.",
    es: "Usé Figma para pulir la dirección seleccionada y preparar el prototipo final, y luego usé herramientas de código para incorporar el trabajo a la página del caso de estudio e iterar sobre la presentación final.",
  },
  "caseStudy.stepAge": { en: "Age", es: "Edad" },
  "caseStudy.stepMainGoal": { en: "Main Goal", es: "Objetivo principal" },
  "caseStudy.stepEnterEmail": { en: "Enter Email", es: "Introducir email" },
  "caseStudy.performanceGood": { en: "Good", es: "Bueno" },
  "caseStudy.performanceModerate": { en: "Moderate", es: "Moderado" },
  "caseStudy.performancePoor": { en: "Poor", es: "Bajo" },
  "caseStudy.analysisReference": { en: "Analysis reference", es: "Referencia de análisis" },
  "caseStudy.funnelChurnSnapshot": { en: "Funnel churn snapshot", es: "Instantánea de abandono del embudo" },
  "caseStudy.funnelChurnSnapshotSubtitle": {
    en: "Highest visible churn points across the quiz entry and progression flow",
    es: "Puntos de abandono más visibles a lo largo del flujo de entrada y progresión del cuestionario",
  },
  "caseStudy.eventStep": { en: "EVENT - STEP", es: "EVENTO - PASO" },
  "caseStudy.performance": { en: "PERFORMANCE", es: "RENDIMIENTO" },
  "caseStudy.churnCount": { en: "CHURN #", es: "N.º ABANDONOS" },
  "caseStudy.churnPercentHeader": { en: "CHURN %", es: "% ABANDONO" },
  "caseStudy.userCount": { en: "USER #", es: "N.º USUARIOS" },
  "caseStudy.remainingPercentHeader": { en: "REMAINING %", es: "% RESTANTE" },
  "caseStudy.churnCountMobile": { en: "Churn #", es: "N.º abandonos" },
  "caseStudy.churnPercentMobile": { en: "Churn %", es: "% abandono" },
  "caseStudy.userCountMobile": { en: "User #", es: "N.º usuarios" },
  "caseStudy.remainingPercentMobile": { en: "Remaining %", es: "% restante" },
  "caseStudy.funnelSnapshotSource": {
    en: "Source: funnel event snapshot focused on the most visible churn points in the quiz path.",
    es: "Fuente: instantánea de eventos del embudo centrada en los puntos de abandono más visibles del recorrido del cuestionario.",
  },
  "caseStudy.aFewNotes": { en: "A few notes", es: "Algunas notas" },
  "caseStudy.hypothesis3Marker": { en: "Hypothesis 3", es: "Hipótesis 3" },
  "caseStudy.designProposal": { en: "Design Proposal", es: "Propuesta de diseño" },
  "caseStudy.extraImprovingEmailCapture": { en: "Extra: Improving email capture upstream", es: "Extra: mejorar la captura de email más arriba en el embudo" },
  "caseStudy.extraImprovingEmailCaptureIntro": {
    en: "Reducing friction before the email step would improve email capture. Three directions were tested across content clarity, CTA framing, and the quiz-to-email flow.",
    es: "Reducir la fricción antes del paso de email mejoraría la captura de email. Se testearon tres direcciones sobre claridad de contenido, enfoque del CTA y el flujo quiz-a-email.",
  },
  "caseStudy.hypothesisHeader": { en: "Hypothesis", es: "Hipótesis" },
  "caseStudy.whatITested": { en: "What I tested", es: "Qué testeé" },
  "caseStudy.whyItMattered": { en: "Why it mattered", es: "Por qué importaba" },
  "caseStudy.hypothesis1": { en: "Hypothesis 1", es: "Hipótesis 1" },
  "caseStudy.hypothesis2": { en: "Hypothesis 2", es: "Hipótesis 2" },
  "caseStudy.hypothesis3Label": { en: "Hypothesis 3", es: "Hipótesis 3" },
  "caseStudy.contentVariant": { en: "Content Variant", es: "Variante de contenido" },
  "caseStudy.ctaVariant": { en: "CTA Variant", es: "Variante de CTA" },
  "caseStudy.exploratoryHypothesis": { en: "Exploratory hypothesis", es: "Hipótesis exploratoria" },
  "caseStudy.hypothesis1Description": {
    en: "Test whether the email step feels more personalized and valuable when the content reflects the user's selected goal.",
    es: "Testear si el paso de email se percibe más personalizado y valioso cuando el contenido refleja el objetivo seleccionado por el usuario.",
  },
  "caseStudy.hypothesis2Description": {
    en: "Test whether outcome-based CTA language reduces the feeling of generic lead capture and makes the reward clearer.",
    es: "Testear si un lenguaje de CTA orientado a resultados reduce la sensación de captura de leads genérica y hace más claro el beneficio.",
  },
  "caseStudy.hypothesis3Description": {
    en: "Check whether age segment, device, source, or step context may be influencing the email drop-off beyond the screen itself.",
    es: "Comprobar si el segmento de edad, el dispositivo, la fuente o el contexto del paso pueden estar influyendo en el abandono del email más allá de la propia pantalla.",
  },
  "caseStudy.variantWireframe": { en: "Variant wireframe", es: "Wireframe de la variante" },
  "caseStudy.tagCmsOnly": { en: "CMS-only", es: "Solo CMS" },
  "caseStudy.tagNoDev": { en: "No dev", es: "Sin desarrollo" },
  "caseStudy.tagFastToTest": { en: "Fast to test", es: "Rápido de testear" },
  "caseStudy.tagCmsEverflow": { en: "CMS + Everflow", es: "CMS + Everflow" },
  "caseStudy.tagAbTestable": { en: "A/B testable", es: "Testeable en A/B" },
  "caseStudy.tagMediumEffort": { en: "Medium effort", es: "Esfuerzo medio" },
  "caseStudy.tagDevRequired": { en: "Dev required", es: "Requiere desarrollo" },
  "caseStudy.tagVariableLogic": { en: "Variable logic", es: "Lógica de variable" },
  "caseStudy.tagHigherLeverage": { en: "Higher leverage", es: "Mayor impacto" },
  "caseStudy.implementationFeasibility": { en: "Implementation Feasibility", es: "Viabilidad de implementación" },
  "caseStudy.implementationFeasibilityIntro": {
    en: "To make the proposal more actionable, I mapped each direction by implementation effort and how easily it could be tested in the current setup.",
    es: "Para hacer la propuesta más accionable, mapeé cada dirección según su esfuerzo de implementación y lo fácil que sería testearla en la configuración actual.",
  },
  "caseStudy.copyOnlyRefinements": { en: "Copy-only refinements", es: "Ajustes solo de copy" },
  "caseStudy.copyOnlyRefinementsBody": {
    en: "Update the CTA, subtitle, trust line, and supporting copy as parameterizable CMS fields. This is the lowest-effort path and the fastest way to validate whether stronger value framing lifts email completion.",
    es: "Actualizar el CTA, el subtítulo, la línea de confianza y el copy de apoyo como campos parametrizables del CMS. Es la ruta de menor esfuerzo y la forma más rápida de validar si un enfoque de valor más fuerte aumenta la finalización del email.",
  },
  "caseStudy.staticGoalBasedVariants": { en: "Static goal-based variants", es: "Variantes estáticas por objetivo" },
  "caseStudy.staticGoalBasedVariantsBody": {
    en: "Create separate landing or email-step variants for different goals and rotate traffic through Everflow. This keeps testing lightweight while validating whether stronger goal specificity improves the value exchange.",
    es: "Crear variantes independientes de landing o del paso de email para distintos objetivos y rotar el tráfico mediante Everflow. Esto mantiene el testeo ligero mientras se valida si una mayor especificidad del objetivo mejora el intercambio de valor.",
  },
  "caseStudy.dynamicPersonalization": { en: "Dynamic personalization", es: "Personalización dinámica" },
  "caseStudy.dynamicPersonalizationBody": {
    en: "Pass the selected main goal into the email step and swap the headline or supporting content conditionally. This requires more setup, but it becomes more justified if static variants show that goal-based personalization materially improves conversion.",
    es: "Pasar el objetivo principal seleccionado al paso de email e intercambiar condicionalmente el titular o el contenido de apoyo. Esto requiere más configuración, pero se justifica más si las variantes estáticas muestran que la personalización por objetivo mejora sustancialmente la conversión.",
  },
  "caseStudy.hypothesis3Heading": { en: "Hypothesis 3", es: "Hipótesis 3" },
  "caseStudy.exploratoryHypothesisHeading": { en: "Exploratory hypothesis", es: "Hipótesis exploratoria" },
  "caseStudy.emailDropoffParagraph1": {
    en: "The email drop-off may not be caused only by the email screen itself; it may also be influenced by user context that is not visible in the current data.",
    es: "El abandono en el paso de email puede no estar causado solo por la propia pantalla; también puede estar influido por contexto del usuario que no es visible en los datos actuales.",
  },
  "caseStudy.emailDropoffParagraph2": {
    en: "For example, we do not know the user's age segment or device type. Younger users may be more active in the acquisition phase, especially from social or ad-driven traffic, but also more sensitive to how their personal data is collected and used. If that is true, the email step may create trust friction before they feel enough value from the product.",
    es: "Por ejemplo, no conocemos el segmento de edad del usuario ni el tipo de dispositivo. Los usuarios más jóvenes pueden estar más activos en la fase de adquisición, especialmente desde tráfico social o publicitario, pero también más sensibles a cómo se recopilan y usan sus datos personales. Si eso es cierto, el paso de email podría generar fricción de confianza antes de que perciban suficiente valor del producto.",
  },
  "caseStudy.emailDropoffParagraph3": {
    en: "Device may also play a role. If a large share of users reach this step on mobile, the drop-off could be affected by smaller screen space, form fatigue, typing effort, or weaker visibility of reassurance copy. On desktop, the issue may be less about input friction and more about value clarity or trust.",
    es: "El dispositivo también podría influir. Si una gran parte de los usuarios llega a este paso desde móvil, el abandono podría estar afectado por el espacio de pantalla reducido, la fatiga de formularios, el esfuerzo de escribir o una menor visibilidad del copy de reafirmación. En escritorio, el problema podría estar menos relacionado con la fricción de entrada y más con la claridad de valor o la confianza.",
  },
  "caseStudy.emailDropoffParagraph4": {
    en: "Because we do not have age, device, traffic source, or interaction data, I would treat this as an exploratory hypothesis and validate it by segmenting email-step completion by age group, mobile vs. desktop, source, and time spent on the step.",
    es: "Dado que no disponemos de datos de edad, dispositivo, fuente de tráfico o interacción, trataría esto como una hipótesis exploratoria y la validaría segmentando la finalización del paso de email por grupo de edad, móvil frente a escritorio, fuente y tiempo dedicado al paso.",
  },
  "caseStudy.experimentsFramingIntro": {
    en: "The experiments were framed around one conversion objective, one revenue objective, and one constraint that kept the proposed changes grounded in the existing offer structure.",
    es: "Los experimentos se enmarcaron en torno a un objetivo de conversión, un objetivo de ingresos y una restricción que mantuvo los cambios propuestos anclados a la estructura de oferta existente.",
  },
  "caseStudy.control": { en: "Control", es: "Control" },
  "caseStudy.controlDescription": {
    en: "What ships now. The existing paywall presents a plan ladder with two urgency timers, no pre-selection, and daily pricing as the dominant framing.",
    es: "Lo que está en producción ahora. El paywall actual presenta una escalera de planes con dos temporizadores de urgencia, sin preselección, y con el precio diario como enfoque dominante.",
  },
  "caseStudy.currentStructure": { en: "Current structure", es: "Estructura actual" },
  "caseStudy.currentStructureItem1": { en: "Three plan choices compete at once", es: "Tres opciones de plan compiten a la vez" },
  "caseStudy.currentStructureItem2": { en: "Urgency timers carry most of the persuasion", es: "Los temporizadores de urgencia cargan con la mayor parte de la persuasión" },
  "caseStudy.currentStructureItem3": { en: "Value is framed more around price than outcome", es: "El valor se enmarca más en torno al precio que al resultado" },
  "caseStudy.goalA": { en: "Goal A", es: "Objetivo A" },
  "caseStudy.goalADescription": {
    en: "Improve overall paywall conversion rate so more users purchase any plan.",
    es: "Mejorar la tasa de conversión general del paywall para que más usuarios compren cualquier plan.",
  },
  "caseStudy.experimentA": { en: "Experiment A", es: "Experimento A" },
  "caseStudy.experimentAText": {
    en: "This version highlights plan discounts based on a personal goal the user may have, creating a more guided flow. It opens with a personalized before-and-after recap, surfaces a personalized limited-time promo code, narrows the decision to three clearer plan options, and moves the primary CTA, trust signals, and guarantee closer to the point of commitment.",
    es: "Esta versión destaca descuentos de plan basados en un objetivo personal que pueda tener el usuario, creando un flujo más guiado. Se abre con un resumen personalizado de antes y después, muestra un código promocional personalizado por tiempo limitado, reduce la decisión a tres opciones de plan más claras, y acerca el CTA principal, las señales de confianza y la garantía al momento de compromiso.",
  },
  "caseStudy.deltaVsControl": { en: "Δ vs control", es: "Δ frente a control" },
  "caseStudy.experimentAItem1": { en: "The “Get my plan” button reminds users how much they save.", es: "El botón “Obtener mi plan” recuerda a los usuarios cuánto ahorran." },
  "caseStudy.experimentAItem2": { en: "Personalized recap above the plan", es: "Resumen personalizado encima del plan" },
  "caseStudy.experimentAItem3": {
    en: "Three plans are presented, with the 12-wk option recommended and pre-selected.",
    es: "Se presentan tres planes, con la opción de 12 semanas recomendada y preseleccionada.",
  },
  "caseStudy.experimentAItem4": {
    en: "Featured-in logos and a video testimonial reinforce trust before purchase.",
    es: "Logos de “visto en” y un testimonio en vídeo refuerzan la confianza antes de la compra.",
  },
  "caseStudy.goalB": { en: "Goal B", es: "Objetivo B" },
  "caseStudy.goalBDescription": {
    en: "Shift plan mix toward the 12-week plan to lift AOV (average order value / average revenue per user).",
    es: "Desplazar la mezcla de planes hacia el plan de 12 semanas para aumentar el AOV (valor medio de pedido / ingreso medio por usuario).",
  },
  "caseStudy.experimentB": { en: "Experiment B", es: "Experimento B" },
  "caseStudy.experimentBText": {
    en: "This version reframes the paywall around progress toward the user's target weight loss. The 12-week option is positioned as the plan most likely to help the user reach that goal through time framing, app-value previews, trust signals, and repeated commitment points. Connecting the user's goal to the price helps maintain engagement.",
    es: "Esta versión replantea el paywall en torno al progreso hacia el objetivo de pérdida de peso del usuario. La opción de 12 semanas se posiciona como el plan con más probabilidades de ayudar al usuario a alcanzar ese objetivo mediante el enfoque temporal, vistas previas del valor de la app, señales de confianza y puntos de compromiso repetidos. Conectar el objetivo del usuario con el precio ayuda a mantener el engagement.",
  },
  "caseStudy.experimentBItem1": {
    en: "“See my personalized plan” is used as the CTA to reduce friction and activate the payment step.",
    es: "“Ver mi plan personalizado” se usa como CTA para reducir la fricción y activar el paso de pago.",
  },
  "caseStudy.experimentBItem2": {
    en: "The 12-wk plan is pre-selected and reinforced with a motivational tag.",
    es: "El plan de 12 semanas está preseleccionado y reforzado con una etiqueta motivacional.",
  },
  "caseStudy.experimentBItem3": {
    en: "An app preview is added to connect the paywall more directly to the product value.",
    es: "Se añade una vista previa de la app para conectar el paywall más directamente con el valor del producto.",
  },
  "caseStudy.experimentBItem4": {
    en: "The content order is changed to keep the scroll active and maintain momentum.",
    es: "Se cambia el orden del contenido para mantener el scroll activo y conservar el impulso.",
  },
  "caseStudy.experimentBItem5": {
    en: "A 30-day guarantee is added to strengthen trust before purchase.",
    es: "Se añade una garantía de 30 días para reforzar la confianza antes de la compra.",
  },
  "caseStudy.controlLabel": { en: "control", es: "control" },
  "caseStudy.whatShipsNow": { en: "What ships now.", es: "Lo que está en producción ahora." },
  "caseStudy.controlCaption": {
    en: "Plan ladder with two urgency timers, no pre-selection, /day pricing dominant.",
    es: "Escalera de planes con dos temporizadores de urgencia, sin preselección, con precio /día dominante.",
  },
  "caseStudy.currentReversetechPaywallAlt": { en: "Current Reversetech paywall design", es: "Diseño actual del paywall de Reversetech" },
  "caseStudy.close": { en: "Close", es: "Cerrar" },
  "caseStudy.expand": { en: "Expand", es: "Expandir" },
  "caseStudy.experimentALabel": { en: "experiment a", es: "experimento a" },
  "caseStudy.hypothesisCaptionLabel": { en: "Hypothesis.", es: "Hipótesis." },
  "caseStudy.experimentAHypothesis": {
    en: "If we collapse the page into one focused decision, with a pre-selected plan, personalized recap, and guarantee adjacent to the CTA, overall conversion rises.",
    es: "Si reducimos la página a una única decisión enfocada, con un plan preseleccionado, un resumen personalizado y la garantía junto al CTA, la conversión general aumenta.",
  },
  "caseStudy.primaryMetricLabel": { en: "Primary metric:", es: "Métrica principal:" },
  "caseStudy.experimentAPrimaryMetric": { en: "paywall → purchase rate.", es: "paywall → tasa de compra." },
  "caseStudy.experimentBHypothesis": {
    en: "Reframing the comparison to time to reach your target weight makes 1-wk and 4-wk look insufficient and pulls mix toward 12-wk.",
    es: "Replantear la comparación en términos de tiempo para alcanzar tu peso objetivo hace que las opciones de 1 y 4 semanas parezcan insuficientes y desplaza la mezcla hacia las 12 semanas.",
  },
  "caseStudy.experimentBPrimaryMetric": { en: "% of purchasers picking 12-wk · AOV.", es: "% de compradores que eligen 12 semanas · AOV." },
  "caseStudy.tensionHeading": { en: "What is the tension between these two experiments?", es: "¿Cuál es la tensión entre estos dos experimentos?" },
  "caseStudy.experimentAOptimizedFor": {
    en: "Experiment A is optimized to reduce friction and increase the number of users who complete a purchase.",
    es: "El experimento A está optimizado para reducir la fricción y aumentar el número de usuarios que completan una compra.",
  },
  "caseStudy.risk": { en: "Risk", es: "Riesgo" },
  "caseStudy.experimentARisk": {
    en: "By emphasizing a personalized discount and a smoother path, it may improve conversion without pushing enough users toward the higher-value 12-week plan.",
    es: "Al enfatizar un descuento personalizado y un camino más fluido, puede mejorar la conversión sin empujar a suficientes usuarios hacia el plan de 12 semanas de mayor valor.",
  },
  "caseStudy.experimentBOptimizedFor": {
    en: "Experiment B is optimized to shift plan mix toward the 12-week option and increase AOV.",
    es: "El experimento B está optimizado para desplazar la mezcla de planes hacia la opción de 12 semanas y aumentar el AOV.",
  },
  "caseStudy.sources": { en: "Sources", es: "Fuentes" },
  "caseStudy.zoomOut": { en: "Zoom out", es: "Alejar" },
  "caseStudy.zoomIn": { en: "Zoom in", es: "Acercar" },
  "caseStudy.closeExperimentPreview": { en: "Close experiment preview", es: "Cerrar vista previa del experimento" },
  "caseStudy.closeImagePreview": { en: "Close image preview", es: "Cerrar vista previa de la imagen" },
  "caseStudy.experimentBRisk": {
    en: "The stronger push toward one plan may create more friction for users who are not ready for that commitment, which could hurt overall conversion.",
    es: "El impulso más fuerte hacia un solo plan puede crear más fricción para los usuarios que no están listos para ese compromiso, lo que podría perjudicar la conversión general.",
  },
  "caseStudy.before": { en: "Before", es: "Antes" },
  "caseStudy.after": { en: "After", es: "Después" },
  "caseStudy.enterEmailBefore": { en: "Enter Email before", es: "Introducir email, antes" },
  "caseStudy.enterEmailAfter": { en: "Enter Email after", es: "Introducir email, después" },
  "caseStudy.designDirection": { en: "Design direction", es: "Dirección de diseño" },
  "caseStudy.designDirectionBullet1": {
    en: "The design fix focuses on strengthening the value exchange before asking for the user's email.",
    es: "La solución de diseño se centra en reforzar el intercambio de valor antes de pedir el email del usuario.",
  },
  "caseStudy.designDirectionBullet2": {
    en: "Research shows users are more likely to complete a form when the request is tied to a clear reward.",
    es: "La investigación muestra que los usuarios tienen más probabilidad de completar un formulario cuando la petición está vinculada a una recompensa clara.",
  },
  "caseStudy.designDirectionBullet3Pre": {
    en: "This version reframes the page around the user's selected main goal, such as weight loss, and uses outcome-based copy like",
    es: "Esta versión replantea la página en torno al objetivo principal seleccionado por el usuario, como perder peso, y usa un copy orientado a resultados como",
  },
  "caseStudy.seeMyPlan": { en: "See my plan", es: "Ver mi plan" },
  "caseStudy.designDirectionBullet3Post": { en: "instead of a generic", es: "en lugar de un genérico" },
  "caseStudy.continue": { en: "Continue.", es: "Continuar." },
  "caseStudy.lowEffortTestPath": { en: "Low-effort test path", es: "Ruta de test de bajo esfuerzo" },
  "caseStudy.cmsReady": { en: "CMS-ready", es: "Listo en el CMS" },
  "caseStudy.lowEffortBullet1": {
    en: "Because the funnel is built in a templated CMS, I would treat the CTA, subtitle, trust message, and static page copy as parameterizable changes that can be tested without engineering.",
    es: "Dado que el embudo está construido en un CMS con plantillas, trataría el CTA, el subtítulo, el mensaje de confianza y el copy estático de la página como cambios parametrizables que se pueden testear sin ingeniería.",
  },
  "caseStudy.lowEffortBullet2": {
    en: "Based on that, I explored both a CTA variant and a content variant.",
    es: "A partir de ahí, exploré tanto una variante de CTA como una variante de contenido.",
  },
  "caseStudy.lowEffortBullet3": {
    en: "The main exception is dynamically changing the headline across three different goals, which would likely require conditional logic or a new CMS variable.",
    es: "La principal excepción es cambiar dinámicamente el titular según tres objetivos distintos, lo que probablemente requeriría lógica condicional o una nueva variable de CMS.",
  },
  "caseStudy.higherEffortVersion": { en: "Higher-effort version", es: "Versión de mayor esfuerzo" },
  "caseStudy.needsDev": { en: "Needs dev", es: "Requiere desarrollo" },
  "caseStudy.conditionalLogic": { en: "Conditional logic", es: "Lógica condicional" },
  "caseStudy.higherEffortBullet1": {
    en: "If the CMS supports duplicated pages or static page variants, I would first test one goal-based version per segment without new development and route traffic to each version.",
    es: "Si el CMS admite páginas duplicadas o variantes estáticas de página, primero testearía una versión por objetivo y segmento sin desarrollo nuevo, dirigiendo tráfico a cada versión.",
  },
  "caseStudy.higherEffortBullet2": {
    en: "If those variants improve email completion, then investing in a reusable dynamic personalization component would be easier to justify.",
    es: "Si esas variantes mejoran la finalización del paso de email, sería más fácil justificar la inversión en un componente de personalización dinámica reutilizable.",
  },

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
