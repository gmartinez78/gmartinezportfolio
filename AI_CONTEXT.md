<!-- AI_CONTEXT_TRACKER_START -->
## Mantenimiento automático

- Regla: revisar y actualizar este archivo cada 20 tareas/commits.
- Tareas desde la última revisión: 15 / 20
- Total de tareas rastreadas: 15
- Último commit rastreado: 43bdb2e
- Última revisión marcada: 2026-05-03
- Estado: Al día
<!-- AI_CONTEXT_TRACKER_END -->

# Contexto IA del Portfolio

## Propósito del sitio

Este repositorio es el portfolio personal de **Greddys Martinez**, una **Senior Product Designer** enfocada en:

- UX/UI
- AI-driven UX
- enterprise SaaS
- beneficios y HR tech
- accesibilidad
- design systems

El sitio no es una plantilla genérica. Ya está construido para comunicar:

- seniority real
- experiencia enterprise
- pensamiento estratégico
- impacto de negocio
- capacidad de ejecución en producto

La intención principal del sitio es posicionar a Greddys como una diseñadora senior con experiencia sólida en producto, investigación, sistemas y colaboración con equipos técnicos.

## Stack actual

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Supabase`

## Arquitectura general

### Dos fuentes de contenido

El contenido público funciona en dos modos:

1. **Fallback local**
   - `content/site.json`
   - `content/case-studies.json`

2. **Contenido live desde Supabase**
   - Se carga con hooks en `lib/cms/public.ts`
   - Si Supabase no está disponible, la UI usa el fallback local

Esto es importante: el sitio está pensado para seguir funcionando aunque el CMS no responda.

### Modelos principales

- `SiteContent` en `lib/cms/types.ts`
  - navegación
  - home
  - footer
  - contact
  - resume

- `CaseStudyRecord` en `lib/cms/types.ts`
  - datos resumen
  - métricas
  - equipo
  - rol
  - pains
  - constraints
  - methodology
  - design strategy
  - reflections
  - `content_blocks` flexibles

### Manejo de rutas y assets

- `lib/site.ts` expone `withBasePath()`
- Debe usarse cuando una ruta interna o asset necesite respetar `NEXT_PUBLIC_BASE_PATH`

## Rutas importantes

### Home

- `app/page.tsx`
- delega en `portfolio-page.tsx`

Es la landing principal del portfolio. Ya contiene:

- hero fuerte y editorial
- certificaciones
- social proof
- proyectos destacados
- framing profesional de herramientas y experiencia

### Índice de proyectos

- `app/projects/page.tsx`

Esta página:

- lista los case studies dinámicamente
- usa filtros como `UX Research`, `Product Design`, `Design Systems`, `AI Product`, `Accessibility`
- consume contenido desde los hooks públicos del CMS

### Detalle genérico de proyecto

- `app/projects/[slug]/page.tsx`
- `app/projects/[slug]/page-client.tsx`

Estas rutas renderizan los case studies dinámicos y ya soportan:

- manejo de `published` / `unpublished`
- hero
- overview
- team / role / tools
- métricas
- bloques flexibles
- related projects

Importante:

- `nayya-ai-benefits` tiene lógica especial dentro de `page-client.tsx`
- no todo ese case study vive puramente en CMS; parte de su storytelling está codificado a mano
- actualmente también tiene métricas y secciones específicas hardcodeadas para evitar depender solo del contenido remoto de Supabase

### Benefits case study

- `app/benefits/page.tsx`

Esta página es **custom/bespoke** para `benefits-enrollment`.

No es una variante menor del template general. Tiene:

- layout propio
- assets propios
- narrativa propia
- secciones personalizadas

La relación slug/ruta se resuelve en `lib/cms/public.ts`:

- `benefits-enrollment` apunta a `/benefits`

### Resume

- `app/resume/page.tsx`

Se alimenta desde `resume` en `content/site.json` o desde Supabase.

### Contact

- `app/contact/page.tsx`

Se alimenta desde `content/site.json` o desde Supabase.

### CMS

- `app/cms/page.tsx`
- `app/cms/site/page.tsx`
- `app/cms/case-studies/page.tsx`
- `app/cms/case-studies/[slug]/page.tsx`

El CMS ya existe para administrar:

- contenido global del sitio
- colección de case studies

## Dirección editorial actual

Este portfolio está posicionado alrededor de:

- senior product design
- enterprise UX
- resultados de negocio
- investigación + estrategia + ejecución
- AI product thinking
- accesibilidad y systems thinking

El tono debería seguir siendo:

- profesional
- claro
- senior
- específico
- orientado a resultados

Evitar convertir el contenido en:

- lenguaje genérico de agencia
- fluff de startup
- frases vacías de diseño
- auto-promoción sin sustancia

## Dirección visual actual

La UI ya tiene una dirección bastante clara:

- paleta liderada por azules
- fondos claros
- mezcla de serif editorial y sans limpia
- cards redondeadas
- sensación premium pero sobria
- lectura cómoda para case studies

Referencias clave:

- `app/globals.css`
- `app/layout.tsx`
- `lib/fonts.ts`

Patrón tipográfico actual:

- sans para estructura y cuerpo
- serif display para énfasis y titulares

Si se modifica la UI, preservar:

- look premium y confiable
- legibilidad
- jerarquía fuerte
- bastante aire/espaciado
- credibilidad enterprise

## Convenciones de contenido y datos

### Case studies

Un `CaseStudyRecord` puede incluir:

- `slug`
- `status`
- `featured`
- `order`
- `title`
- `company`
- `client_context`
- `role`
- `year`
- `duration`
- `industry`
- `tagline`
- `tags`
- `filters`
- `tools`
- `images`
- `client_logos`
- `metrics`
- `team`
- `my_role`
- `problem`
- `constraints`
- `methodology`
- `design_strategy`
- `reflections`
- `nda_notice`
- `external_link`
- `content_blocks`

Detalle importante:

- `filters` puede venir explícito
- si no existe, `lib/cms/fallback.ts` lo deriva a partir de `tags`

### Resolución de assets

`lib/cms/public.ts` concentra la lógica de mapping para:

- logos de compañías
- logos de certificaciones
- iconos de herramientas
- imágenes preview de proyectos
- rutas especiales de proyectos

Antes de duplicar lógica, revisar ese archivo.

## Casos especiales conocidos

### 1. `benefits-enrollment`

- ruta pública: `/benefits`
- no usa el template genérico de `[slug]`
- tiene página totalmente personalizada

### 2. `nayya-ai-benefits`

- sí usa la ruta genérica
- pero tiene constantes, métricas y bloques especiales en `app/projects/[slug]/page-client.tsx`
- es un híbrido entre CMS y storytelling manual
- hoy incluye contenido hardcodeado para:
  - métricas superiores del hero
  - métricas del bloque de problema
  - alternativas exploradas
  - tabla de `Key Insights from Testing`
  - bloque `Design Process`
  - imagen específica del design process

### 3. Arquitectura fallback-first

- el sitio debe seguir funcionando sin Supabase
- no eliminar el comportamiento fallback salvo que exista una migración deliberada

## Reglas prácticas para futuras IAs

### Si vas a editar contenido

Primero verifica si la fuente real está en:

- JSON local
- Supabase/CMS
- lógica hardcodeada dentro de una página específica

No asumir que todo el texto sale del mismo lugar.

### Si vas a editar páginas de proyecto

Primero confirma si el slug usa:

- render dinámico genérico
- route mapping especial
- página bespoke

### Si vas a editar estilos

- mantener el look actual del portfolio
- no reemplazarlo por estética genérica de template
- no introducir una dirección visual ajena a la marca existente

### Si vas a añadir un nuevo case study

- seguir la forma de `CaseStudyRecord`
- decidir bien `filters`
- revisar imágenes, route resolution y preview
- decidir si cabe en el template genérico o necesita una página propia

### Si vas a tocar lógica CMS

- preservar el fallback local
- evitar romper el render público cuando Supabase no esté disponible

## Archivos clave

- `portfolio-page.tsx`
- `app/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page-client.tsx`
- `app/benefits/page.tsx`
- `app/resume/page.tsx`
- `app/contact/page.tsx`
- `content/site.json`
- `content/case-studies.json`
- `lib/cms/public.ts`
- `lib/cms/fallback.ts`
- `lib/cms/types.ts`
- `app/cms/page.tsx`

## Flujo sugerido para cualquier IA futura

1. Leer este archivo primero
2. Revisar la ruta concreta que se va a tocar
3. Confirmar si el contenido viene de JSON, Supabase o lógica manual
4. Mantener el posicionamiento senior/enterprise del portfolio
5. Mantener la dirección visual editorial y profesional actual

## Resumen del estado actual

En este momento el sitio ya no es solo un portfolio estático:

- tiene modelo de contenido real
- tiene modo fallback y modo CMS
- tiene case studies con storytelling custom
- tiene una intención clara de posicionamiento profesional

Cualquier cambio futuro debería extender esta estructura, no simplificarla hasta convertirla en un portfolio genérico.
