update public.case_studies
set images = jsonb_set(
  jsonb_set(images, '{cover}', '"/images/projects/EB.png"'::jsonb),
  '{hero}',
  '"/images/projects/benefits-cover.png"'::jsonb
)
where slug = 'benefits-enrollment';
