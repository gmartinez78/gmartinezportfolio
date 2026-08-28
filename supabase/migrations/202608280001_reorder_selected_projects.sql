-- Keep the Selected Projects sequence consistent across the published CMS data.
update public.case_studies
set "order" = case slug
  when 'nayya-ai-benefits' then 1
  when 'flock-accessibility-system' then 2
  when 'i9-everify-integration' then 3
  when 'benefits-enrollment' then 4
  else "order"
end
where slug in (
  'nayya-ai-benefits',
  'flock-accessibility-system',
  'i9-everify-integration',
  'benefits-enrollment'
);
