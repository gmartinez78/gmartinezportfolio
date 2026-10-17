update public.site_content as site
set payload = jsonb_set(
  site.payload,
  '{resume,experience}',
  (
    select jsonb_agg(
      case
        when job.value ->> 'company' = 'ITX Corp' then
          jsonb_set(
            job.value,
            '{bullets}',
            (
              select jsonb_agg(
                to_jsonb(
                  replace(
                    bullet.value #>> '{}',
                    '. Identify and reduce design debt by consolidating duplicate components, improving system consistency and scalability across products and platforms.',
                    '.'
                  )
                )
                order by bullet.ordinality
              )
              from jsonb_array_elements(job.value -> 'bullets')
                with ordinality as bullet(value, ordinality)
              where bullet.value #>> '{}' <>
                'Identify and reduce design debt, consolidating duplicate components and improving system consistency.'
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
where site.key = 'site'
  and jsonb_typeof(site.payload #> '{resume,experience}') = 'array'
  and exists (
    select 1
    from jsonb_array_elements(site.payload #> '{resume,experience}') as job(value)
    where job.value ->> 'company' = 'ITX Corp'
  );

update public.site_content_locales as site
set payload = jsonb_set(
  site.payload,
  '{resume,experience}',
  (
    select jsonb_agg(
      case
        when job.value ->> 'company' = 'ITX Corp' then
          jsonb_set(
            job.value,
            '{bullets}',
            (
              select jsonb_agg(
                to_jsonb(
                  replace(
                    bullet.value #>> '{}',
                    case site.locale
                      when 'es' then '. Identifico y reduzco la deuda de diseño al consolidar componentes duplicados, mejorando la consistencia y escalabilidad del sistema en productos y plataformas.'
                      when 'de' then '. Identifizieren und reduzieren Sie Designschulden durch die Zusammenführung doppelter Komponenten und verbessern Sie so Systemkonsistenz und Skalierbarkeit über Produkte und Plattformen hinweg.'
                      else '. Identify and reduce design debt by consolidating duplicate components, improving system consistency and scalability across products and platforms.'
                    end,
                    '.'
                  )
                )
                order by bullet.ordinality
              )
              from jsonb_array_elements(job.value -> 'bullets')
                with ordinality as bullet(value, ordinality)
              where bullet.value #>> '{}' <> case site.locale
                when 'es' then 'Identifico y reduzco la deuda de diseño, consolidando componentes duplicados y mejorando la consistencia del sistema.'
                when 'de' then 'Identifizieren und reduzieren Sie Designschulden, konsolidieren Sie doppelte Komponenten und verbessern Sie die Systemkonsistenz.'
                else 'Identify and reduce design debt, consolidating duplicate components and improving system consistency.'
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
    where job.value ->> 'company' = 'ITX Corp'
  );
