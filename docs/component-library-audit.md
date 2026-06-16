# Component Library Audit

## Scope

This audit covers the current component system used across the portfolio site and translates it into a practical component-library plan for both code and Figma.

Primary sources reviewed:

- [components/ui/button.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/button.tsx)
- [components/ui/badge.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/badge.tsx)
- [components/ui/card.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/card.tsx)
- [components/ui/input.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/input.tsx)
- [components/ui/textarea.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/textarea.tsx)
- [components/ui/label.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/label.tsx)
- [components/ui/section-heading.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/section-heading.tsx)
- [components/site-header.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/site-header.tsx)
- [components/site-footer.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/site-footer.tsx)
- [portfolio-page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/portfolio-page.tsx)
- [app/contact/page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/contact/page.tsx)
- [app/projects/page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/page.tsx)
- [app/resume/page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/resume/page.tsx)
- [app/projects/[slug]/page-client.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/[slug]/page-client.tsx)

## Executive Summary

The repo already has a valid primitive UI layer, but the public-facing experience is only partially using it. The CMS area is much closer to a system-driven implementation, while the portfolio, project listing, case-study pages, and some marketing sections still rely on page-local styling and repeated visual patterns.

The practical implication is:

- The library exists, but only at the primitive level.
- The screen-level patterns are not yet formalized as reusable components.
- Figma should not start from screens only.
  It should start from foundations, then primitives, then marketing/product patterns, then audited screens.

## Current Library Status

### Stable primitives already in code

- `Button`
- `Badge`
- `Card`
- `Input`
- `Textarea`
- `Label`
- `SectionHeading`
- `Separator`

These are the right starting point for the library, but several of them are still too tightly coupled to a single visual style through hardcoded values.

## Audit by Component Type

### 1. Buttons

Current source:

- [components/ui/button.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/button.tsx)

Current strengths:

- Variant model already exists: `default`, `outline`, `secondary`, `tertiary`, `ghost`, `destructive`, `link`
- Size model already exists
- Good base for code reuse

Current issues:

- The button primitive contains raw colors and radii instead of consuming shared tokens.
- Several circular icon buttons are still hand-built in pages instead of using button variants.
  Examples:
  - [portfolio-page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/portfolio-page.tsx)
  - [app/projects/[slug]/page-client.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/[slug]/page-client.tsx)
- Some CTA buttons in public pages visually diverge from the base button component.

Library action:

- Keep `Button` as a primitive
- Add formal variants for:
  - icon-only
  - carousel/nav controls
  - pill CTA
  - quiet text action

### 2. Badges / Pills / Tags

Current source:

- [components/ui/badge.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/badge.tsx)

Current strengths:

- Variant model exists
- `tag` size is already useful for project tags and filters

Current issues:

- The public site uses both `Badge` and custom pill styles interchangeably.
- Company pills, year pills, locked pills, state labels, and filter pills are visually related but not modeled as one consistent family.

Library action:

- Consolidate all pills under one family in Figma and code:
  - filter pill
  - metadata pill
  - status pill
  - tag pill
  - accent/metric pill

### 3. Cards

Current source:

- [components/ui/card.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/card.tsx)

Current strengths:

- Basic structure is reusable
- Used consistently in CMS

Current issues:

- Public pages override the card primitive heavily with page-local border radius, gradients, shadows, blur, and padding.
- There are multiple visual card families that should be explicit components instead of one base card with ad hoc overrides.

Distinct card families found:

- CMS utility card
- Contact form card
- Contact info card
- Resume experience card
- Resume credential card
- Project list card
- Home project carousel card
- Case-study content card
- Comparison / experiment card

Library action:

- Keep `Card` as a primitive container
- Create pattern-level card components:
  - `FeatureCard`
  - `ProjectCard`
  - `InfoCard`
  - `ExperienceCard`
  - `CredentialCard`
  - `InsightCard`
  - `ComparisonCard`

### 4. Form Fields

Current sources:

- [components/ui/input.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/input.tsx)
- [components/ui/textarea.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/textarea.tsx)
- [components/ui/label.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/label.tsx)

Current strengths:

- Strong shared styling already exists
- CMS already consumes them directly
- Contact page uses these primitives

Current issues:

- The site still lacks a composed `FormField` pattern.
- Error, help, success, and disabled states are not formalized as a reusable component group.
- Home CTA form in [portfolio-page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/portfolio-page.tsx) still has custom field styling instead of fully using the same field system.

Library action:

- Add pattern-level components:
  - `FormField`
  - `FieldGroup`
  - `InlineFieldRow`
  - `FieldMessage`

### 5. Section Headings

Current source:

- [components/ui/section-heading.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/ui/section-heading.tsx)

Current strengths:

- Reusable eyebrow + title structure already exists
- Used in contact, resume, and case-study sections

Current issues:

- The home page and some project sections still use page-local heading compositions instead of the same system.
- Supporting text and alignment patterns are not part of the component contract.

Library action:

- Expand heading family:
  - centered
  - left-aligned
  - inverse
  - with body copy
  - with supporting action

### 6. Navigation

Current source:

- [components/site-header.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/site-header.tsx)

Current issues:

- Header nav items behave like a component family but are not formalized as one.
- Mobile menu trigger, desktop nav pill, and active state are all hand-styled in place.

Library action:

- Add navigation components in Figma:
  - top nav
  - nav item
  - mobile menu button
  - mobile menu sheet/dropdown block

### 7. Footer

Current source:

- [components/site-footer.tsx](/Users/gred/Desktop/gmartinezportfolio-main/components/site-footer.tsx)

Current issues:

- Footer is a reusable site section but not represented as a library pattern.
- Social icon treatments are embedded directly.

Library action:

- Add footer as a pattern-level section:
  - footer brand block
  - footer link column
  - social icon row
  - footer CTA column

### 8. Project Cards and Portfolio Patterns

Current sources:

- [portfolio-page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/portfolio-page.tsx)
- [app/projects/page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/page.tsx)
- [app/projects/[slug]/page-client.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/[slug]/page-client.tsx)

Current issues:

- This is the largest design-system gap in the repo.
- Project-related patterns appear in multiple visual versions:
  - home carousel card
  - projects listing card
  - related project card
  - hero/metric blocks inside case studies
  - source/reference cards
  - comparison experiment cards

Library action:

- Treat these as a dedicated pattern group:
  - `ProjectCard`
  - `ProjectMetaRow`
  - `MetricCard`
  - `ResearchNoteCard`
  - `ExperimentCard`
  - `ComparisonTable`
  - `ImageModalControls`

## Where the System Is Most Aligned

Closest to system-driven implementation:

- CMS screens
- Contact form primitives
- Resume badges and headings

Why:

- Higher reuse of `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Label`, `SectionHeading`
- Fewer custom one-off containers

## Where the System Is Least Aligned

Most divergence from the library:

- [portfolio-page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/portfolio-page.tsx)
- [app/projects/[slug]/page-client.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/[slug]/page-client.tsx)
- [app/projects/page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/projects/page.tsx)
- parts of [app/resume/page.tsx](/Users/gred/Desktop/gmartinezportfolio-main/app/resume/page.tsx)

Why:

- heavy direct use of hex colors
- repeated shadow recipes
- repeated custom radii
- repeated gradient backgrounds
- multiple custom pill and card treatments
- repeated icon-button styling outside the `Button` system

## Repeated Style Debt

These should become tokens or named recipes, not one-off values:

- Blue brand/action color family
- Muted text color family
- Deep heading color family
- Frosted/gradient surface cards
- White translucent overlays
- Repeated radii around 14, 18, 22, 24, 28, 30, 34, 36, 40
- Repeated shadows with similar blue-gray blur signatures

## Missing Components

These are present in the product experience but not yet formalized as library components:

- Project card
- Filter pill group
- Metadata row
- Social/icon info card
- Form field wrapper
- Section intro with heading + body copy
- Empty / locked state pill
- Carousel navigation button
- Modal image viewer controls
- Comparison / experiment card
- Metric tile
- Logo strip / trusted brands row
- CTA panel
- Case-study content section wrapper

## Recommended Figma Library Structure

The Figma file requested at the start should be organized like this:

### 00 Foundations

- Color roles
- Typography scale
- Spacing scale
- Radius scale
- Shadow scale
- Border styles
- Layout grid rules

### 01 Tokens

- Primitive tokens
- Semantic tokens
- Light theme values
- Any future alternate theme values

### 02 Primitives

- Button
- Badge
- Card
- Input
- Textarea
- Label
- Section heading
- Icon button
- Divider

### 03 Patterns

- Header
- Footer
- Contact form
- Info card
- Project card
- Experience card
- Credential card
- Filter group
- Metric card
- Comparison card
- CTA section
- Logo strip

### 04 Screens Audit

- Home
- Projects
- Project detail
- Resume
- Contact

Each screen page should mark:

- uses approved component
- has local override
- should be replaced
- missing from library

### 05 Improvements

- proposed consolidations
- new variants
- accessibility improvements
- simplification opportunities

## Recommended Rollout Order

### Phase 1. Foundations and token cleanup

- Define color, spacing, radius, and shadow tokens
- Replace the most repeated raw values in primitives

### Phase 2. Primitive alignment

- Stabilize `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Label`, `SectionHeading`
- Add missing variants instead of re-styling in pages

### Phase 3. Pattern extraction

- Extract project cards
- Extract contact info cards
- Extract form field wrappers
- Extract metric and CTA patterns

### Phase 4. Screen alignment

- Home
- Projects list
- Project detail
- Resume
- Contact

### Phase 5. Figma parity

- Build the Figma library from the same component map
- Mirror naming between code and Figma
- Add usage notes and state coverage

## Naming Recommendation

To keep Figma and code aligned, use the same names where possible:

- `Button`
- `Badge`
- `Card`
- `FormField`
- `SectionHeading`
- `ProjectCard`
- `InfoCard`
- `ExperienceCard`
- `MetricCard`
- `FilterGroup`
- `SiteHeader`
- `SiteFooter`

## Priority List

Highest-value items to align first:

1. Button family
2. Card family
3. Badge / pill family
4. Form field family
5. Project card family
6. Section heading family
7. Header and footer patterns

## Constraints

An actual Figma file could not be created from this session because the Figma write tools are not currently exposed here. The library specification above is prepared so the Figma file can be created directly with a clean structure once tool access is available.

## Recommended Next Step

Implement the library in code and Figma together, not one after the other:

- define tokens
- normalize primitives
- extract patterns
- mirror the exact same inventory in Figma

That avoids a common failure mode where Figma and code drift again immediately after the audit.
