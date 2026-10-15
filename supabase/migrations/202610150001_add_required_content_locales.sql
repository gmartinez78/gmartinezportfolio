-- Every public content item is authored in English, Spanish, and German.
-- Base tables keep the stable identifiers and publishing metadata; locale tables
-- carry the complete language-specific payload consumed by the public site.

create table if not exists public.site_content_locales (
  id uuid primary key default gen_random_uuid(),
  content_key text not null,
  locale text not null check (locale in ('en', 'es', 'de')),
  title text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (content_key, locale)
);

create table if not exists public.case_study_locales (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references public.case_studies(id) on delete cascade,
  locale text not null check (locale in ('en', 'es', 'de')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (case_study_id, locale)
);

create index if not exists site_content_locales_lookup_idx
  on public.site_content_locales (content_key, locale);

create index if not exists case_study_locales_lookup_idx
  on public.case_study_locales (case_study_id, locale);

drop trigger if exists set_site_content_locales_updated_at on public.site_content_locales;
create trigger set_site_content_locales_updated_at
before update on public.site_content_locales
for each row
execute function public.set_updated_at();

drop trigger if exists set_case_study_locales_updated_at on public.case_study_locales;
create trigger set_case_study_locales_updated_at
before update on public.case_study_locales
for each row
execute function public.set_updated_at();

-- Preserve the current English records during the migration. Spanish and German
-- are seeded through the locale-aware CMS / seed data and are required before a
-- case study can be published or republished.
insert into public.site_content_locales (content_key, locale, title, payload)
select key, 'en', title, payload
from public.site_content
on conflict (content_key, locale) do update
set title = excluded.title,
    payload = excluded.payload;

insert into public.case_study_locales (case_study_id, locale, payload)
select
  study.id,
  'en',
  to_jsonb(study) - array['id', 'created_at', 'updated_at']
from public.case_studies as study
on conflict (case_study_id, locale) do update
set payload = excluded.payload;

alter table public.site_content_locales enable row level security;
alter table public.case_study_locales enable row level security;

drop policy if exists "Public can read localized site content" on public.site_content_locales;
create policy "Public can read localized site content"
on public.site_content_locales
for select
using (true);

drop policy if exists "Authenticated users can read localized site content" on public.site_content_locales;
create policy "Authenticated users can read localized site content"
on public.site_content_locales
for select
to authenticated
using (true);

drop policy if exists "Public can read localized published case studies" on public.case_study_locales;
create policy "Public can read localized published case studies"
on public.case_study_locales
for select
using (
  exists (
    select 1
    from public.case_studies as study
    where study.id = case_study_id
      and study.status = 'published'
  )
);

drop policy if exists "Authenticated users can read all localized case studies" on public.case_study_locales;
create policy "Authenticated users can read all localized case studies"
on public.case_study_locales
for select
to authenticated
using (true);

-- CMS writes go through these functions, so a save is all-or-nothing across
-- the three required locales instead of allowing a one-language update.
create or replace function public.upsert_site_content_locales(
  p_content_key text,
  p_title text,
  p_payloads jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  required_locale text;
begin
  if auth.role() <> 'authenticated' then
    raise exception 'Authentication is required to update localized site content';
  end if;

  if jsonb_typeof(p_payloads) <> 'object'
    or not (p_payloads ?& array['en', 'es', 'de']) then
    raise exception 'English, Spanish, and German payloads are required';
  end if;

  foreach required_locale in array array['en', 'es', 'de'] loop
    if jsonb_typeof(p_payloads -> required_locale) <> 'object'
      or p_payloads -> required_locale = '{}'::jsonb then
      raise exception 'A non-empty % payload is required', required_locale;
    end if;

    insert into public.site_content_locales (content_key, locale, title, payload)
    values (p_content_key, required_locale, p_title, p_payloads -> required_locale)
    on conflict (content_key, locale) do update
    set title = excluded.title,
        payload = excluded.payload;
  end loop;
end;
$$;

create or replace function public.upsert_case_study_locales(
  p_case_study_id uuid,
  p_payloads jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  required_locale text;
  expected_slug text;
begin
  if auth.role() <> 'authenticated' then
    raise exception 'Authentication is required to update localized case studies';
  end if;

  select slug into expected_slug
  from public.case_studies
  where id = p_case_study_id;

  if expected_slug is null then
    raise exception 'The case study does not exist';
  end if;

  if jsonb_typeof(p_payloads) <> 'object'
    or not (p_payloads ?& array['en', 'es', 'de']) then
    raise exception 'English, Spanish, and German payloads are required';
  end if;

  foreach required_locale in array array['en', 'es', 'de'] loop
    if jsonb_typeof(p_payloads -> required_locale) <> 'object'
      or p_payloads -> required_locale = '{}'::jsonb
      or p_payloads -> required_locale ->> 'slug' <> expected_slug then
      raise exception 'A complete % payload for slug % is required', required_locale, expected_slug;
    end if;

    insert into public.case_study_locales (case_study_id, locale, payload)
    values (p_case_study_id, required_locale, p_payloads -> required_locale)
    on conflict (case_study_id, locale) do update
    set payload = excluded.payload;
  end loop;
end;
$$;

create or replace function public.require_published_case_study_locales()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published'
    and (
      select count(*)
      from public.case_study_locales
      where case_study_id = new.id
        and locale in ('en', 'es', 'de')
    ) <> 3 then
    raise exception 'Case studies must include English, Spanish, and German content before publishing';
  end if;

  return new;
end;
$$;

drop trigger if exists require_published_case_study_locales on public.case_studies;
create constraint trigger require_published_case_study_locales
after insert or update of status on public.case_studies
deferrable initially deferred
for each row
execute function public.require_published_case_study_locales();

grant select on public.site_content_locales to anon, authenticated;
grant select on public.case_study_locales to anon, authenticated;
grant execute on function public.upsert_site_content_locales(text, text, jsonb) to authenticated;
grant execute on function public.upsert_case_study_locales(uuid, jsonb) to authenticated;
