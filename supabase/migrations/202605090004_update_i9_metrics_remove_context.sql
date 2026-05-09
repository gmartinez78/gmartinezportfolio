update public.case_studies
set metrics = '[
  {"value":"76%","label":"of Flex clients lacked a compliant I-9 workflow","context":"the compliance gap this project was designed to close"},
  {"value":"26","label":"Rounds of exploration & testing","context":"across 18 participants across employee and admin journeys"},
  {"value":"2,548","label":"Survey responses post first release","context":"confirmed the integrated direction was working"}
]'::jsonb
where slug = 'i9-everify-integration';
