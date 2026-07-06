import type { Language } from "@/lib/i18n/language-context";
import type { CaseStudyRecord } from "@/lib/cms/types";

export const LOCKED_NAYYA_PLACEHOLDER_SLUG = "zapiano-marketing";

const LOCKED_NAYYA_SOURCE_SLUG = "nayya-ai-benefits";
const LOCKED_NAYYA_PLACEHOLDER_MEDIA = "/images/projects/zapiano/thumbnails/zapiano-thumbnail.png";

function createLockedPlaceholderEn(order: number): CaseStudyRecord {
  return {
    slug: LOCKED_NAYYA_PLACEHOLDER_SLUG,
    status: "published",
    featured: false,
    order,
    title: "Paid Traffic Funnel Redesign",
    company: "Zapiano",
    client_context: "Zapiano",
    role: "Sr. Product Designer",
    year: 2025,
    duration: "2 to 3 months",
    industry: "Education / Performance Marketing",
    tagline: "Across three campaign variants, the funnel generated 1.04M reach, 14,885 purchases, and a blended $1.79 cost per result on $26.6K spend.",
    tags: ["Growth", "Paid Acquisition", "Experimentation", "Landing Pages"],
    filters: ["Product Design"],
    tools: ["Figma", "ClickUp", "Microsoft Copilot", "Google Analytics", "Meta Ads Manager"],
    images: {
      cover: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      hero: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      gallery: [],
    },
    client_logos: [],
    metrics: [
      {
        value: "1.04M",
        label: "Reach across all campaign variants",
        context: "",
      },
      {
        value: "14,885",
        label: "Purchases recorded across the test snapshot",
        context: "",
      },
      {
        value: "$1.79",
        label: "Blended cost per result",
        context: "",
      },
    ],
    team: ["Product Manager", "Developer", "Marketing analyst (data)", "Product designer"],
    my_role: ["Sr. Product Designer", "Design", "Research", "Strategy"],
    problem: {
      admin_pain_points: [
        "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.",
        "The existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left.",
      ],
      user_pain_points: [
        "Cold paid visitors hit the highest-priced tier within the first scroll, creating friction before trust or relevance had been established.",
        "Beginners and adult returners were treated as the same audience, even though they arrived with different motivations and needed different cues.",
      ],
    },
    constraints: [],
    methodology: {
      name: "Paid Funnel Redesign Sprint",
      steps: [
        {
          step: 1,
          label: "Audit the funnel",
          description: "Mapped Meta campaign data against Google Analytics flow reports to locate the drop-off. The pattern was clear: visitors scrolled past the hero, hit the EUR5220 Gold tier within seconds, and exited. The page was answering the wrong question first: is this about years of cost, or whether this is for me and how I start?",
        },
        {
          step: 2,
          label: "Benchmark the category",
          description: "",
        },
        {
          step: 3,
          label: "Reframe the landing",
          description: "The Club tiers were the real conversion blocker, so I recommended killing them as the cold-traffic entry, leading with the €9 Introduction Course, and upselling to PianoStarter at €29/month after the intro.\n\nUsers did not need three options to compare, they needed one clear next thing to do. The team approved the change, and I redesigned the landing around the new entry:\n\n- beginner vs returner segmentation\n- one primary CTA for the €9 intro\n- email gate below social proof\n- community credibility in the fold instead of three competing pricing blocks",
        },
        {
          step: 4,
          label: "Build modular components",
          description: "The redesign combined a funnel audit, competitor benchmark, offer reframe, modular landing-page redesign, and post-launch testing. Reduce the cognitive cost of the first yes by leading with a single low-friction paid entry instead of multiple long-term commitments.\n\nMake founder credibility, beginner-vs-returner relevance, and community proof visible early enough to help cold traffic orient before price friction hits. Design the page as a modular no-code system Marketing could keep testing inside Kajabi without needing engineering for every iteration.",
        },
        {
          step: 5,
          label: "A/B test social proof",
          description: "Variant A used physical community proof through annual Zapiano member meetup photos in Switzerland and Germany. Variant B used digital community proof through mobile app screenshots, member feed views, and in-product social proof.",
        },
      ],
    },
    design_strategy: [],
    reflections: [
      {
        title: "The bottleneck was the offer, not the UI.",
        body: "The Club tier setup was not a UI problem. It was an offer problem dressed up as a layout problem. The biggest conversion lift came from changing what visitors were being asked to decide.",
      },
      {
        title: "Cold traffic needs a low-cognitive first step.",
        body: "On cold paid traffic, the landing page's first job is not to sell everything. It is to lower the cognitive cost of saying yes. The EUR9 intro offer did that far better than a multi-tier subscription choice.",
      },
      {
        title: "Proof type matters as much as proof volume.",
        body: "Variant B won because the mobile app screenshots gave cold visitors a tangible preview of what they were buying. The meetup photos in Variant A were warmer, but they implied a commitment visitors were not ready to make yet.",
      },
    ],
    nda_notice: "Some supporting visuals and data views are adapted for portfolio use, but the funnel strategy, benchmark, and performance outcomes reflect the project.",
    password: null,
    external_link: null,
    content_blocks: [
      {
        id: "overview",
        type: "overview",
        title: "Overview",
        body: "",
      },
      {
        id: "situation",
        type: "custom",
        title: "Situation",
        body: "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.\n\nThe existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left.",
      },
      {
        id: "task",
        type: "custom",
        title: "Task",
        body: "Lift paid landing conversion and reduce CAC while working within two real constraints.\n\nThe site runs on Kajabi, so any redesign had to be modular and assemblable from existing content blocks. No custom engineering per variant.\n\nThe page had to serve two distinct user types Marketing identified in the ad funnel: complete beginners and adults returning to piano after years away. Same product, different motivations, same landing page.\n\nThe goal Marketing handed me was simple: more conversions, lower cost per acquisition, same ad spend.",
      },
      {
        id: "actions",
        type: "custom",
        title: "Actions",
        body: "",
      },
      {
        id: "impact",
        type: "results",
        title: "Impact",
        payload: {
          rows: [
            {
              metric: "Amount Spent",
              value: "$26,568.50",
              context: "Total spend across the three campaign variants shown in the preserved Meta dashboard.",
            },
            {
              metric: "Return on Ad Spend (ROAS)",
              value: "~5.0x",
              context: "Modeled from total recorded purchases at a €9 intro-course price point: ~€133,965 revenue against $26,568.50 spend.",
            },
            {
              metric: "Purchases",
              value: "14,885",
              context: "Total purchases recorded across the three campaign variants in the dashboard snapshot.",
            },
            {
              metric: "Cost per Click (CPC)",
              value: "~$0.25",
              context: "Modeled blended estimate across the three campaign variants using implied clicks from purchase volume and landing conversion rates.",
            },
            {
              metric: "Cost per Result (CPR)",
              value: "$1.79",
              context: "Average cost per result across all three campaigns in the dashboard snapshot.",
            },
            {
              metric: "Reach",
              value: "1.04M",
              context: "Total recorded reach across the three campaign variants in the dashboard snapshot.",
            },
            {
              metric: "Impressions",
              value: "2.85M",
              context: "Total impressions recorded across the three campaign variants in the dashboard snapshot.",
            },
          ],
          insights: [
            "Variant B won decisively because mobile app screenshots gave cold visitors a tangible preview of what they were buying.",
            "The meetup photos in Variant A were warmer and more authentic, but they implicitly required showing up in person, a commitment cold visitors were not ready to make.",
            "The lift did not come from visual polish alone. It came from reordering the decision the page asked users to make.",
          ],
          opportunities: [
            "Personalized hero copy based on ad creative so beginner ads route to a beginner hero and returner ads route to a returner hero.",
            "A pre-paywall qualifier quiz with 3-4 questions on goals and level to lift intro-to-subscription conversion further down the funnel.",
            "AI-generated copy variants for headline A/B testing at scale.",
          ],
          projected: [
            "Conservative 1-month scenario: with a 5,500 to 6,000 media budget and using the blended dashboard CPR of $1.79 rather than the winning-variant low of $0.85, the campaign would project roughly 3,070 to 3,350 intro-course purchases.",
            "At a €9 entry ticket, that implies about €27.6K to €30.2K in top-of-funnel revenue before any PianoStarter upsell or downstream LTV is counted.",
            "Using the preserved dashboard delivery ratios as a baseline, that same budget range would conservatively translate to roughly 215K to 235K people reached and about 590K to 645K impressions over one month.",
            "Primary markets worked in this setup: Germany, Switzerland, Sweden, and the Netherlands.",
            "Recommended targeting mix for a conservative next-month run: broad Advantage+ / algorithmic cold audiences for scale, piano-learning and adult-beginner interest clusters for control, plus warm retargeting from site visitors or CRM / first-party lists when available.",
            "Estimated audience size by targeting type: broad Advantage+ cold audiences in these four markets can usually support a combined reachable pool in the low millions, interest-based pools are typically narrower but still large enough for monthly testing, and first-party / retargeting pools depend on site traffic and database volume.",
          ],
          successMetrics: [
            "Increase paid landing conversion without increasing ad spend.",
            "Reduce CAC enough to make scale more efficient.",
            "Create a modular Kajabi page structure Marketing can keep testing post-launch.",
          ],
        },
      },
    ],
  };
}

function createLockedPlaceholderEs(order: number): CaseStudyRecord {
  const base = createLockedPlaceholderEn(order);

  return {
    ...base,
    title: "Rediseño de embudo de tráfico de pago",
    client_context: "Zapiano",
    role: "Sr. Product Designer",
    duration: "2 a 3 meses",
    industry: "Educación / Marketing de rendimiento",
    tagline:
      "A través de tres variantes de campaña, el embudo generó un alcance de 1,04M, 14.885 compras y un coste por resultado combinado de 1,79 $ con un gasto de 26,6 K $.",
    tools: ["Figma", "ClickUp", "Microsoft Copilot", "Google Analytics", "Meta Ads Manager"],
    metrics: [
      { value: "1.04M", label: "Alcance en todas las variantes de campaña", context: "" },
      { value: "14,885", label: "Compras registradas en el snapshot de la prueba", context: "" },
      { value: "$1.79", label: "Coste por resultado combinado", context: "" },
    ],
    team: ["Product Manager", "Desarrollador", "Analista de marketing (datos)", "Diseñador de producto"],
    my_role: ["Sr. Product Designer", "Diseño", "Investigación", "Estrategia"],
    problem: {
      admin_pain_points: [
        "Zapiano es una plataforma suiza de cursos de piano online para adultos, fundada por el profesor de piano Sven Haefliger. Las campañas de Meta generaban un buen alcance (1,04M de alcance, 2,85M de impresiones), pero la conversión de la landing de pago estaba estancada en el 6% y la mayoría de los visitantes abandonaba antes de cualquier evento de conversión.",
        "La página existente presentaba tres niveles de suscripción al Club uno junto a otro, bloques de funcionalidades densos y tres CTA compitiendo entre sí. El tráfico frío llegaba al nivel más caro nada más hacer scroll y se marchaba.",
      ],
      user_pain_points: [
        "Los visitantes fríos de pago llegaban al nivel más caro nada más hacer scroll, generando fricción antes de establecer confianza o relevancia.",
        "Se trataba a los principiantes y a los adultos que retomaban el piano como la misma audiencia, aunque llegaban con motivaciones distintas y necesitaban señales diferentes.",
      ],
    },
    methodology: {
      name: "Sprint de rediseño de embudo de pago",
      steps: [
        {
          step: 1,
          label: "Auditar el embudo",
          description:
            "Crucé los datos de las campañas de Meta con los informes de flujo de Google Analytics para localizar el abandono. El patrón era claro: los visitantes pasaban el hero, llegaban al nivel Gold de 5.220 € en segundos y se marchaban. La página respondía primero a la pregunta equivocada: ¿esto va del coste durante años, o de si esto es para mí y cómo empiezo?",
        },
        { step: 2, label: "Analizar la categoría", description: "" },
        {
          step: 3,
          label: "Replantear la landing",
          description:
            "Los niveles del Club eran el verdadero bloqueo de conversión, así que recomendé eliminarlos como puerta de entrada para tráfico frío, liderar con el Curso de Introducción de 9 €, y hacer upsell a PianoStarter a 29 €/mes tras la introducción.\n\nLos usuarios no necesitaban tres opciones para comparar, necesitaban una única acción clara. El equipo aprobó el cambio y rediseñé la landing en torno a la nueva entrada:\n\n- segmentación entre principiante y quien retoma el piano\n- un único CTA principal para la introducción de 9 €\n- captura de email tras la prueba social\n- credibilidad de comunidad visible desde el inicio en lugar de tres bloques de precios compitiendo",
        },
        {
          step: 4,
          label: "Construir componentes modulares",
          description:
            "El rediseño combinó una auditoría de embudo, un benchmark de competidores, un replanteamiento de la oferta, un rediseño modular de la landing page y pruebas post-lanzamiento. Reducir el coste cognitivo del primer sí liderando con una única entrada de pago de baja fricción en lugar de varios compromisos a largo plazo.\n\nHacer visibles pronto la credibilidad del fundador, la relevancia principiante-vs-quien retoma, y la prueba de comunidad para ayudar al tráfico frío a orientarse antes de que llegue la fricción del precio. Diseñar la página como un sistema modular sin código que Marketing pudiera seguir testando dentro de Kajabi sin necesitar ingeniería en cada iteración.",
        },
        {
          step: 5,
          label: "Test A/B de prueba social",
          description:
            "La variante A usaba prueba social física mediante fotos del encuentro anual de miembros de Zapiano en Suiza y Alemania. La variante B usaba prueba social digital mediante capturas de la app móvil, vistas del feed de miembros y prueba social dentro del producto.",
        },
      ],
    },
    reflections: [
      {
        title: "El cuello de botella era la oferta, no la interfaz.",
        body: "La configuración del nivel Club no era un problema de interfaz. Era un problema de oferta disfrazado de problema de layout. El mayor incremento de conversión vino de cambiar lo que se pedía decidir a los visitantes.",
      },
      {
        title: "El tráfico frío necesita un primer paso de baja carga cognitiva.",
        body: "En tráfico de pago frío, el primer trabajo de la landing page no es venderlo todo. Es reducir el coste cognitivo de decir que sí. La oferta de introducción de 9 € lo consiguió mucho mejor que una elección de suscripción con varios niveles.",
      },
      {
        title: "El tipo de prueba importa tanto como el volumen de prueba.",
        body: "La variante B ganó porque las capturas de la app móvil daban a los visitantes fríos una vista previa tangible de lo que compraban. Las fotos del encuentro en la variante A eran más cercanas, pero implicaban un compromiso que los visitantes aún no estaban listos para asumir.",
      },
    ],
    nda_notice:
      "Algunos elementos visuales y vistas de datos de apoyo se han adaptado para uso en el portafolio, pero la estrategia de embudo, el benchmark y los resultados de rendimiento reflejan el proyecto real.",
    content_blocks: [
      { id: "overview", type: "overview", title: "Resumen", body: "" },
      {
        id: "situation",
        type: "custom",
        title: "Situación",
        body: "Zapiano es una plataforma suiza de cursos de piano online para adultos, fundada por el profesor de piano Sven Haefliger. Las campañas de Meta generaban un buen alcance (1,04M de alcance, 2,85M de impresiones), pero la conversión de la landing de pago estaba estancada en el 6% y la mayoría de los visitantes abandonaba antes de cualquier evento de conversión.\n\nLa página existente presentaba tres niveles de suscripción al Club uno junto a otro, bloques de funcionalidades densos y tres CTA compitiendo entre sí. El tráfico frío llegaba al nivel más caro nada más hacer scroll y se marchaba.",
      },
      {
        id: "task",
        type: "custom",
        title: "Tarea",
        body: "Aumentar la conversión de la landing de pago y reducir el CAC trabajando dentro de dos restricciones reales.\n\nEl sitio funciona sobre Kajabi, así que cualquier rediseño debía ser modular y montable a partir de bloques de contenido existentes. Sin ingeniería a medida por variante.\n\nLa página debía servir a dos tipos de usuario distintos que Marketing identificó en el embudo de anuncios: principiantes totales y adultos que retoman el piano tras años sin tocar. Mismo producto, motivaciones distintas, misma landing page.\n\nEl objetivo que me dio Marketing era simple: más conversiones, menor coste por adquisición, mismo gasto publicitario.",
      },
      { id: "actions", type: "custom", title: "Acciones", body: "" },
      {
        id: "impact",
        type: "results",
        title: "Impacto",
        payload: {
          rows: [
            {
              metric: "Importe gastado",
              value: "$26,568.50",
              context: "Gasto total en las tres variantes de campaña mostrado en el dashboard de Meta conservado.",
            },
            {
              metric: "Retorno de la inversión publicitaria (ROAS)",
              value: "~5.0x",
              context: "Calculado a partir del total de compras registradas a un precio de curso de introducción de 9 €: ~133.965 € de ingresos frente a 26.568,50 $ de gasto.",
            },
            {
              metric: "Compras",
              value: "14,885",
              context: "Total de compras registradas en las tres variantes de campaña en el snapshot del dashboard.",
            },
            {
              metric: "Coste por clic (CPC)",
              value: "~$0.25",
              context: "Estimación combinada modelada en las tres variantes de campaña usando clics implícitos a partir del volumen de compras y las tasas de conversión de la landing.",
            },
            {
              metric: "Coste por resultado (CPR)",
              value: "$1.79",
              context: "Coste medio por resultado en las tres campañas del snapshot del dashboard.",
            },
            {
              metric: "Alcance",
              value: "1.04M",
              context: "Alcance total registrado en las tres variantes de campaña en el snapshot del dashboard.",
            },
            {
              metric: "Impresiones",
              value: "2.85M",
              context: "Impresiones totales registradas en las tres variantes de campaña en el snapshot del dashboard.",
            },
          ],
          insights: [
            "La variante B ganó de forma decisiva porque las capturas de la app móvil daban a los visitantes fríos una vista previa tangible de lo que compraban.",
            "Las fotos del encuentro en la variante A eran más cálidas y auténticas, pero implicaban asistir en persona, un compromiso que los visitantes fríos aún no estaban listos para asumir.",
            "El incremento no vino solo del pulido visual. Vino de reordenar la decisión que la página pedía tomar a los usuarios.",
          ],
          opportunities: [
            "Copy de hero personalizado según el creativo del anuncio, de modo que los anuncios para principiantes dirijan a un hero de principiante y los anuncios para quienes retoman dirijan a un hero de retorno.",
            "Un cuestionario clasificador previo al paywall con 3-4 preguntas sobre objetivos y nivel para aumentar la conversión de introducción a suscripción más adelante en el embudo.",
            "Variantes de copy generadas con IA para pruebas A/B de titulares a escala.",
          ],
          projected: [
            "Escenario conservador a 1 mes: con un presupuesto de medios de 5.500 a 6.000 y usando el CPR combinado del dashboard de 1,79 $ en lugar del mínimo de la variante ganadora de 0,85 $, la campaña proyectaría entre 3.070 y 3.350 compras del curso de introducción.",
            "Con una entrada de 9 €, eso implica entre 27,6 K € y 30,2 K € de ingresos de la parte alta del embudo antes de contar cualquier upsell a PianoStarter o el LTV posterior.",
            "Usando las proporciones de entrega del dashboard conservado como base, ese mismo rango de presupuesto se traduciría de forma conservadora en entre 215K y 235K personas alcanzadas y entre 590K y 645K impresiones en un mes.",
            "Mercados principales que funcionaron en esta configuración: Alemania, Suiza, Suecia y Países Bajos.",
            "Mezcla de segmentación recomendada para el próximo mes de forma conservadora: audiencias frías amplias Advantage+ / algorítmicas para escalar, clusters de interés en aprendizaje de piano y principiantes adultos para control, más retargeting cálido desde visitantes del sitio o listas propias/CRM cuando estén disponibles.",
            "Tamaño de audiencia estimado por tipo de segmentación: las audiencias frías amplias Advantage+ en estos cuatro mercados suelen soportar un conjunto combinado alcanzable del orden de millones bajos, los conjuntos basados en interés suelen ser más estrechos pero aún lo bastante grandes para pruebas mensuales, y los conjuntos propios/de retargeting dependen del tráfico del sitio y del volumen de la base de datos.",
          ],
          successMetrics: [
            "Aumentar la conversión de la landing de pago sin aumentar el gasto publicitario.",
            "Reducir el CAC lo suficiente para que escalar sea más eficiente.",
            "Crear una estructura de página modular en Kajabi que Marketing pueda seguir testando tras el lanzamiento.",
          ],
        },
      },
    ],
  };
}

function createLockedPlaceholder(order: number, language: Language = "en"): CaseStudyRecord {
  return language === "es" ? createLockedPlaceholderEs(order) : createLockedPlaceholderEn(order);
}

export function buildLockedNayyaPlaceholder(
  source: CaseStudyRecord | null,
  order: number,
  language: Language = "en",
): CaseStudyRecord {
  if (!source) {
    return createLockedPlaceholder(order, language);
  }

  return {
    ...createLockedPlaceholder(order, language),
    status: source.status,
  };
}

export function appendLockedNayyaPlaceholder(studies: CaseStudyRecord[], language: Language = "en") {
  if (studies.some((study) => study.slug === LOCKED_NAYYA_PLACEHOLDER_SLUG)) {
    return [...studies].sort((left, right) => left.order - right.order);
  }

  const sourceStudy = studies.find((study) => study.slug === LOCKED_NAYYA_SOURCE_SLUG) ?? null;
  const nextOrder = studies.reduce((maxOrder, study) => Math.max(maxOrder, study.order), 0) + 1;

  return [...studies, buildLockedNayyaPlaceholder(sourceStudy, nextOrder, language)].sort(
    (left, right) => left.order - right.order,
  );
}
