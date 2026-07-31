alter table public.jorge_exercise_logs
add column if not exists week_number integer not null default 1
check (week_number between 1 and 8);

alter table public.jorge_exercise_logs
drop constraint if exists jorge_exercise_logs_pkey;

alter table public.jorge_exercise_logs
add primary key (user_id, week_number, day_key, exercise_index);
