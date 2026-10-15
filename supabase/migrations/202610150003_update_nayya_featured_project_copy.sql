-- Keep the featured Nayya card consistent across the primary and localized data sources.
update public.case_studies
set
  company = 'Nayya AI',
  title = 'AI Benefits Integration',
  tagline = 'Designed the integration of Nayya as an AI-powered benefits tool, guiding employees to choose coverage that matched their needs.'
where slug = 'nayya-ai-benefits';

update public.case_study_locales locales
set payload = jsonb_set(
  jsonb_set(
    jsonb_set(locales.payload, '{company}', to_jsonb('Nayya AI'::text)),
    '{title}',
    to_jsonb(
      case locales.locale
        when 'es' then 'Integración de beneficios con IA'
        when 'de' then 'Integration von KI-gestützten Benefits'
      end
    )
  ),
  '{tagline}',
  to_jsonb(
    case locales.locale
      when 'es' then 'Diseñé la integración de Nayya como una herramienta de beneficios impulsada por IA que guía a las personas empleadas a elegir la cobertura que mejor se ajusta a sus necesidades.'
      when 'de' then 'Ich entwickelte die Integration von Nayya als KI-gestütztes Benefit-Tool, das Mitarbeitende bei der Wahl einer zu ihren Bedürfnissen passenden Absicherung unterstützt.'
    end
  )
)
from public.case_studies studies
where locales.case_study_id = studies.id
  and studies.slug = 'nayya-ai-benefits'
  and locales.locale in ('es', 'de');
