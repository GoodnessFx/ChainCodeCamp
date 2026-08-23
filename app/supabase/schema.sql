-- ChainCodeCamp Supabase Schema
-- Run this in your Supabase SQL editor to set up the database.

-- ─── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────
-- Mirrors auth.users. Created automatically via trigger on signup.
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique,
  created_at  timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Progress ────────────────────────────────────────────────
-- One row per user per completed curriculum section.
create table if not exists public.progress (
  id           uuid default uuid_generate_v4() primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  slug         text not null,
  completed_at timestamptz default now() not null,
  unique (user_id, slug)
);

alter table public.progress enable row level security;

create policy "Users can read their own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own progress"
  on public.progress for delete
  using (auth.uid() = user_id);

-- Index for fast per-user queries
create index if not exists progress_user_id_idx on public.progress (user_id);

-- ─── Certificates ─────────────────────────────────────────────
-- Issued when a user completes a full track.
create table if not exists public.certificates (
  id              uuid default uuid_generate_v4() primary key,
  user_id         uuid not null references auth.users(id) on delete cascade,
  track           text not null,           -- 'foundations' | 'security'
  verification_id text not null unique,    -- CCC-XXXXXXXX
  issued_at       timestamptz default now() not null,
  unique (user_id, track)
);

alter table public.certificates enable row level security;

-- Anyone can read certificates (for public verification)
create policy "Certificates are publicly readable"
  on public.certificates for select
  using (true);

create policy "Users can insert their own certificates"
  on public.certificates for insert
  with check (auth.uid() = user_id);

-- Index for verification URL lookups
create index if not exists certificates_verification_id_idx
  on public.certificates (verification_id);

-- ─── Community leaderboard (read-only view) ───────────────────
create or replace view public.leaderboard as
select
  p.username,
  count(pr.slug) as sections_completed,
  max(pr.completed_at) as last_active
from public.profiles p
join public.progress pr on p.id = pr.user_id
group by p.id, p.username
order by sections_completed desc, last_active desc
limit 100;
