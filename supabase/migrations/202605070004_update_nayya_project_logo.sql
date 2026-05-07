update public.case_studies
set client_logos = '[{"name":"Nayya","logo":"/images/bBw3A.png"},{"name":"Paychex","logo":"/images/c54fy.png"}]'::jsonb
where slug = 'nayya-ai-benefits';
