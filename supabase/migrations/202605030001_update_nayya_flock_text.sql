update public.case_studies
set content_blocks = jsonb_set(
  content_blocks,
  '{2,body}',
  '"Employees needed more support when selecting benefits, and Nayya Choose offered a strong recommendation engine to guide them toward more relevant coverage.\n\nThe project moved on an aggressive timeline and came with significant technical limitations. A seamless embedded integration between Flex and Nayya Choose was not feasible."'::jsonb
)
where slug = 'nayya-ai-benefits';

update public.case_studies
set content_blocks = jsonb_set(
  content_blocks,
  '{3,body}',
  '"I was responsible for helping define the best integration path between the two platforms while protecting the user experience as much as possible.\n\nThis meant balancing business value, technical constraints, and user confidence during a sensitive decision-making process."'::jsonb
)
where slug = 'nayya-ai-benefits';

update public.case_studies
set content_blocks = jsonb_set(
  content_blocks,
  '{4,body}',
  '"Because a seamless integration was not possible, we identified that users would need to leave Flex and access Nayya Choose in a separate experience.\n\nTo reduce friction, I helped recommend user testing to better understand concerns before finalizing the experience.\n\nThe research showed users needed clearer communication about where they were going, why the transition mattered, and visual cues that made the handoff feel intentional and trustworthy."'::jsonb
)
where slug = 'nayya-ai-benefits';

update public.case_studies
set content_blocks = jsonb_set(
  content_blocks,
  '{0,body}',
  '""'::jsonb
)
where slug = 'flock-accessibility-system';
