create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  "order" integer not null default 0,
  title text not null,
  company text not null,
  client_context text,
  role text,
  year integer,
  duration text,
  industry text,
  tagline text,
  tags text[] not null default '{}'::text[],
  filters text[] not null default '{}'::text[],
  tools text[] not null default '{}'::text[],
  images jsonb not null default '{}'::jsonb,
  client_logos jsonb not null default '[]'::jsonb,
  metrics jsonb not null default '[]'::jsonb,
  team text[] not null default '{}'::text[],
  my_role text[] not null default '{}'::text[],
  problem jsonb not null default '{}'::jsonb,
  constraints text[] not null default '{}'::text[],
  methodology jsonb not null default '{}'::jsonb,
  design_strategy text[] not null default '{}'::text[],
  reflections jsonb not null default '[]'::jsonb,
  content_blocks jsonb not null default '[]'::jsonb,
  nda_notice text,
  password text,
  external_link text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists case_studies_status_idx on public.case_studies (status);
create index if not exists case_studies_featured_idx on public.case_studies (featured);
create index if not exists case_studies_order_idx on public.case_studies ("order");

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

drop trigger if exists set_case_studies_updated_at on public.case_studies;
create trigger set_case_studies_updated_at
before update on public.case_studies
for each row
execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.case_studies enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
using (true);

drop policy if exists "Authenticated users can manage site content" on public.site_content;
create policy "Authenticated users can manage site content"
on public.site_content
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Public can read published case studies" on public.case_studies;
create policy "Public can read published case studies"
on public.case_studies
for select
using (status = 'published');

drop policy if exists "Authenticated users can manage case studies" on public.case_studies;
create policy "Authenticated users can manage case studies"
on public.case_studies
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
