create table if not exists public.jorge_exercise_logs (
  user_id uuid not null references auth.users(id) on delete cascade,
  day_key text not null,
  exercise_index integer not null check (exercise_index >= 0),
  completed boolean not null default false,
  weight_kg text not null default '',
  repetitions text not null default '',
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, day_key, exercise_index)
);

create table if not exists public.jorge_weekly_notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  week_number integer not null check (week_number between 1 and 8),
  notes text not null default '',
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, week_number)
);

alter table public.jorge_exercise_logs enable row level security;
alter table public.jorge_weekly_notes enable row level security;

create policy "Jorge users manage their own exercise logs"
on public.jorge_exercise_logs
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Jorge users manage their own weekly notes"
on public.jorge_weekly_notes
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create trigger set_jorge_exercise_logs_updated_at
before update on public.jorge_exercise_logs
for each row
execute function public.set_updated_at();

create trigger set_jorge_weekly_notes_updated_at
before update on public.jorge_weekly_notes
for each row
execute function public.set_updated_at();
