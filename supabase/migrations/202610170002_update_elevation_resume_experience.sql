update public.site_content as site
set payload = jsonb_set(
  site.payload,
  '{resume,experience}',
  (
    select jsonb_agg(
      case
        when job.value ->> 'company' in ('Elevation', 'Höhe') then
          jsonb_set(
            jsonb_set(
              jsonb_set(job.value, '{company}', '"Elevation"'::jsonb),
              '{period}',
              to_jsonb('01/2017 – 02/2019'::text)
            ),
            '{bullets}',
            to_jsonb(array[
              'Delivered UX/UI solutions for multiple nonprofit clients (B2B & B2C).',
              'Improved usability and accessibility across digital platforms.',
              'Designed e-commerce and donation flows, improving conversion rates.',
              'Collaborated with developers and strategists to align user needs with business goals, and partnered with marketing teams to implement SEO-informed UX and growth-focused web experiences, enhancing content structure and usability.',
              'Contributed to brand identity work for multiple clients, applying branding principles to enhance overall product identity and visual consistency across digital touchpoints.'
            ]::text[])
          )
        else job.value
      end
      order by job.ordinality
    )
    from jsonb_array_elements(site.payload #> '{resume,experience}')
      with ordinality as job(value, ordinality)
  )
)
where site.key = 'site'
  and jsonb_typeof(site.payload #> '{resume,experience}') = 'array'
  and exists (
    select 1
    from jsonb_array_elements(site.payload #> '{resume,experience}') as job(value)
    where job.value ->> 'company' in ('Elevation', 'Höhe')
  );

update public.site_content_locales as site
set payload = jsonb_set(
  site.payload,
  '{resume,experience}',
  (
    select jsonb_agg(
      case
        when job.value ->> 'company' in ('Elevation', 'Höhe') then
          jsonb_set(
            jsonb_set(
              jsonb_set(job.value, '{company}', '"Elevation"'::jsonb),
              '{period}',
              to_jsonb('01/2017 – 02/2019'::text)
            ),
            '{bullets}',
            to_jsonb(
              case site.locale
                when 'es' then array[
                  'Entregué soluciones UX/UI para múltiples organizaciones sin ánimo de lucro (B2B y B2C).',
                  'Mejoré la usabilidad y accesibilidad en plataformas digitales.',
                  'Diseñé flujos de e-commerce y donaciones, mejorando las tasas de conversión.',
                  'Colaboré con desarrolladores y estrategas para alinear las necesidades de los usuarios con los objetivos de negocio, y trabajé con equipos de marketing en experiencias web enfocadas en crecimiento e informadas por SEO, mejorando la estructura y usabilidad del contenido.',
                  'Contribuí a la identidad de marca de varios clientes, aplicando principios de branding para fortalecer la identidad de producto y la consistencia visual en los distintos puntos de contacto digitales.'
                ]::text[]
                when 'de' then array[
                  'Lieferte UX/UI-Lösungen für mehrere gemeinnützige Kunden (B2B und B2C).',
                  'Verbesserte Benutzerfreundlichkeit und Barrierefreiheit auf digitalen Plattformen.',
                  'Entwarf E-Commerce- und Spendenabläufe und verbesserte die Conversion-Raten.',
                  'Arbeitete mit Entwicklern und Strategen zusammen, um Nutzerbedürfnisse mit Geschäftszielen abzustimmen, und kooperierte mit Marketingteams an SEO-informierten, wachstumsorientierten Web-Erlebnissen, die Inhaltsstruktur und Benutzerfreundlichkeit verbesserten.',
                  'Wirkte an der Markenidentität mehrerer Kunden mit und stärkte durch Branding-Prinzipien die Produktidentität und visuelle Konsistenz über digitale Kontaktpunkte hinweg.'
                ]::text[]
                else array[
                  'Delivered UX/UI solutions for multiple nonprofit clients (B2B & B2C).',
                  'Improved usability and accessibility across digital platforms.',
                  'Designed e-commerce and donation flows, improving conversion rates.',
                  'Collaborated with developers and strategists to align user needs with business goals, and partnered with marketing teams to implement SEO-informed UX and growth-focused web experiences, enhancing content structure and usability.',
                  'Contributed to brand identity work for multiple clients, applying branding principles to enhance overall product identity and visual consistency across digital touchpoints.'
                ]::text[]
              end
            )
          )
        else job.value
      end
      order by job.ordinality
    )
    from jsonb_array_elements(site.payload #> '{resume,experience}')
      with ordinality as job(value, ordinality)
  )
)
where site.content_key = 'site'
  and site.locale in ('en', 'es', 'de')
  and jsonb_typeof(site.payload #> '{resume,experience}') = 'array'
  and exists (
    select 1
    from jsonb_array_elements(site.payload #> '{resume,experience}') as job(value)
    where job.value ->> 'company' in ('Elevation', 'Höhe')
  );
