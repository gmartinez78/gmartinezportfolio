update public.site_content
set payload = jsonb_set(
  payload,
  '{home,trusted_by,clients}',
  '[
    {"name":"IBX","logo":"/images/SNUZw.png"},
    {"name":"Skill","logo":"/images/IbuV3.png"},
    {"name":"Hakuna","logo":"/images/hakuna.avif"},
    {"name":"Elevation","logo":"/images/elevation.png"},
    {"name":"Nayya","logo":"/images/bBw3A.png"},
    {"name":"Paychex","logo":"/images/c54fy.png"},
    {"name":"Paramount+","logo":"/images/paramount-plus.svg"}
  ]'::jsonb
)
where key = 'site';
