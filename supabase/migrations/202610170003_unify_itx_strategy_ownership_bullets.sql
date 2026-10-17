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
                case
                  when bullet.ordinality = 4 then to_jsonb(
                    'Define design strategy, vision, and roadmap for major, ambiguous products using Jira and Confluence while owning multiple initiatives simultaneously. Make clear design decisions, present enhancements to senior stakeholders with a clear rationale, incorporate feedback, and push back when needed.'
                  )
                  else bullet.value
                end
                order by bullet.ordinality
              )
              from jsonb_array_elements(job.value -> 'bullets')
                with ordinality as bullet(value, ordinality)
              where bullet.ordinality <> 5
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
                case
                  when bullet.ordinality = 4 then to_jsonb(
                    case site.locale
                      when 'es' then
                        'Defino la estrategia, visión y hoja de ruta de diseño para productos complejos y ambiguos usando Jira y Confluence, mientras lidero varias iniciativas simultáneamente. Tomo decisiones de diseño claras, presento mejoras a stakeholders senior con una justificación sólida, incorporo sus comentarios y defiendo mi criterio cuando es necesario.'
                      when 'de' then
                        'Definieren Sie Designstrategie, Vision und Roadmap für komplexe, mehrdeutige Produkte mit Jira und Confluence und verantworten Sie gleichzeitig mehrere Initiativen. Treffen Sie klare Designentscheidungen, präsentieren Sie Verbesserungen mit überzeugender Begründung vor leitenden Stakeholdern, berücksichtigen Sie Feedback und vertreten Sie bei Bedarf Ihren Standpunkt.'
                      else
                        'Define design strategy, vision, and roadmap for major, ambiguous products using Jira and Confluence while owning multiple initiatives simultaneously. Make clear design decisions, present enhancements to senior stakeholders with a clear rationale, incorporate feedback, and push back when needed.'
                    end
                  )
                  else bullet.value
                end
                order by bullet.ordinality
              )
              from jsonb_array_elements(job.value -> 'bullets')
                with ordinality as bullet(value, ordinality)
              where bullet.ordinality <> 5
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
