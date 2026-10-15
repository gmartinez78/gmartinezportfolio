-- Keep persisted copy aligned with the site's editorial style.
-- The character is expressed with chr(8212) so it does not re-enter source content.

update public.site_content
set
  title = regexp_replace(title, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  payload = regexp_replace(payload::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb
where title like '%' || chr(8212) || '%'
   or payload::text like '%' || chr(8212) || '%';

update public.site_content_locales
set
  title = regexp_replace(title, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  payload = regexp_replace(payload::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb
where title like '%' || chr(8212) || '%'
   or payload::text like '%' || chr(8212) || '%';

update public.case_study_locales
set payload = regexp_replace(payload::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb
where payload::text like '%' || chr(8212) || '%';

update public.case_studies
set
  title = regexp_replace(title, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  company = regexp_replace(company, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  client_context = regexp_replace(client_context, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  role = regexp_replace(role, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  duration = regexp_replace(duration, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  industry = regexp_replace(industry, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  tagline = regexp_replace(tagline, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  nda_notice = regexp_replace(nda_notice, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  external_link = regexp_replace(external_link, '\s*' || chr(8212) || '\s*', ', ', 'g'),
  tags = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(tags) as item),
  filters = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(filters) as item),
  tools = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(tools) as item),
  team = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(team) as item),
  my_role = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(my_role) as item),
  constraints = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(constraints) as item),
  design_strategy = array(select regexp_replace(item, '\s*' || chr(8212) || '\s*', ', ', 'g') from unnest(design_strategy) as item),
  images = regexp_replace(images::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb,
  client_logos = regexp_replace(client_logos::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb,
  metrics = regexp_replace(metrics::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb,
  problem = regexp_replace(problem::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb,
  methodology = regexp_replace(methodology::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb,
  reflections = regexp_replace(reflections::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb,
  content_blocks = regexp_replace(content_blocks::text, '\s*' || chr(8212) || '\s*', ', ', 'g')::jsonb
where to_jsonb(public.case_studies)::text like '%' || chr(8212) || '%';
