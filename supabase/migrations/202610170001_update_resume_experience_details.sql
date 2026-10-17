update public.site_content
set payload = jsonb_set(
  jsonb_set(
    payload,
    '{resume,experience,0,client}',
    '"Paychex"'::jsonb
  ),
  '{resume,experience,0,bullets}',
  (
    select jsonb_agg(
      case
        when bullet.ordinality = 6 then to_jsonb(
          'Build and implement a scalable React-based design system with reusable UX patterns and components. Identify and reduce design debt by consolidating duplicate components, improving system consistency and scalability across products and platforms.'
        )
        else bullet.value
      end
      order by bullet.ordinality
    )
    from jsonb_array_elements(payload #> '{resume,experience,0,bullets}')
      with ordinality as bullet(value, ordinality)
    where bullet.ordinality not in (7, 8)
  ),
  false
)
where key = 'site'
  and payload #> '{resume,experience,0,bullets}' is not null;

update public.site_content_locales as site
set payload = jsonb_set(
  jsonb_set(
    site.payload,
    '{resume,experience,0,client}',
    '"Paychex"'::jsonb
  ),
  '{resume,experience,0,bullets}',
  (
    select jsonb_agg(
      case
        when bullet.ordinality = 6 then to_jsonb(
          case site.locale
            when 'es' then
              'Construyo e implemento un sistema de diseño escalable basado en React con patrones y componentes UX reutilizables. Identifico y reduzco la deuda de diseño al consolidar componentes duplicados, mejorando la consistencia y escalabilidad del sistema en productos y plataformas.'
            when 'de' then
              'Erstellen und implementieren Sie ein skalierbares React-basiertes Designsystem mit wiederverwendbaren UX-Mustern und Komponenten. Identifizieren und reduzieren Sie Designschulden durch die Zusammenführung doppelter Komponenten und verbessern Sie so Systemkonsistenz und Skalierbarkeit über Produkte und Plattformen hinweg.'
            else
              'Build and implement a scalable React-based design system with reusable UX patterns and components. Identify and reduce design debt by consolidating duplicate components, improving system consistency and scalability across products and platforms.'
          end
        )
        else bullet.value
      end
      order by bullet.ordinality
    )
    from jsonb_array_elements(site.payload #> '{resume,experience,0,bullets}')
      with ordinality as bullet(value, ordinality)
    where bullet.ordinality not in (7, 8)
  ),
  false
)
where site.content_key = 'site'
  and site.locale in ('en', 'es', 'de')
  and site.payload #> '{resume,experience,0,bullets}' is not null;
