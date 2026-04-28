alter table public.case_studies
alter column constraints
drop default;

alter table public.case_studies
alter column constraints
type text[]
using '{}'::text[];

alter table public.case_studies
alter column constraints
set default '{}'::text[];
