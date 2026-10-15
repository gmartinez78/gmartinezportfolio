# UI Library

## Purpose

This is the portfolio's single visual language. Shared tokens and primitives live here so a deliberate change to a button, heading, card, or container can be applied consistently instead of being copied into individual pages.

## Source of truth

- **Tokens:** [`app/globals.css`](../app/globals.css) under `:root`
- **Figma token handoff:** [`design/figma/portfolio-ui-tokens.json`](../design/figma/portfolio-ui-tokens.json)
- **Primitives:** [`components/ui`](../components/ui)
- **Live component reference:** [`/design-system`](../app/design-system/page.tsx)

The CSS token file is the runtime source of truth. Keep the Figma token file in sync whenever a global token changes.

The `/design-system` route is the Storybook-style preview for these same live tokens and primitives; it does not create a second set of values to maintain.

## Use these primitives

| Need | Use |
| --- | --- |
| Primary, secondary, editorial, destructive, filter, or icon action | `Button` |
| Page, section, card, or hero title | `Heading` |
| Page-level eyebrow, title, and supporting copy | `PageIntro` |
| Eyebrow + section title combination | `SectionHeading` |
| Standard reading-width layout | `Container` |
| General UI surface | `Card` |
| Label, status, metadata, or filter pill | `Badge` |
| Form input, text area, and label | `Input`, `Textarea`, `Label` |

## What updates globally now

- Changes to `--ui-color-brand-primary`, radius, focus, surface, or text tokens update all existing token-based UI primitives.
- Changes to `Button` update every current `Button` usage, including CMS actions and the home-page CTAs.
- Changes to `Heading` update the home H1, public page titles, card titles, and every section title rendered through `SectionHeading`.
- Changes to `Container` update the home, contact, projects, and resume page sections intentionally migrated to it.
- Changes to a `Card` variant update the public project, contact, resume, and informational card families that consume it.

## Visual roles

- **Core UI:** blue (`brand-primary`) for navigation, forms, and product-style UI.
- **Editorial accents:** pink, cyan, and amber only for intentional marketing moments such as the homepage hero.
- **Surfaces:** white base with blue-tinted borders and quiet shadows.

## Title hierarchy

- `page`: public-page H1s such as Projects and Contact.
- `profile`: the Resume name only.
- `section`: standard H2s; always Inter semibold.
- `display`: editorial, serif-led section statements such as project group names.
- `hero`: large marketing moments only.
- `feature` and `card`: article and card titles; always Inter semibold.

Do not introduce a page-local title family. A branded case study may use its own title treatment only when it is part of the case-study narrative itself.

Separating core UI from editorial accents is important: the previous mix of page-local color values made the site feel like several visual systems at once.

## Migration rule

Before adding a new page-local `bg-[#...]`, `text-[#...]`, or arbitrary radius, check whether a token or primitive already exists. If not, add it to the library first, then consume it from the page.

## Current migration coverage

- The home hero, public page introductions, resume profile title, and section headings use the heading system.
- The home, contact, projects, and resume pages use the shared layout container for their primary content widths.
- The public project, contact, experience, resume detail, metric, and content-panel cards now use named `Card` variants.

## Next migration batch

1. Replace remaining bespoke button links in older case-study pages with `Button` variants.
2. Bring case-study-specific visualizations onto tokenized colors where that does not weaken their narrative.
3. Add visual regression coverage for each primitive before changing its default styles.
