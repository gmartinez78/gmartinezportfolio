alter table public.case_studies
alter column design_strategy
drop default;

alter table public.case_studies
alter column design_strategy
type text[]
using '{}'::text[];

alter table public.case_studies
alter column design_strategy
set default '{}'::text[];
