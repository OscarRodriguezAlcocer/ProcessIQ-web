-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Auth schema references
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  org_id uuid references public.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

-- Core data
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  tags text[],
  created_at timestamptz not null default now()
);

create type public.channel as enum ('facebook', 'instagram', 'google', 'tiktok', 'linkedin', 'organic', 'referral', 'email', 'other');

create table if not exists public.campaigns (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  objective text,
  budget numeric,
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  channel public.channel not null,
  event_type text not null, -- impression | click | lead | purchase | custom
  amount numeric, -- optional value to sum (e.g., revenue)
  metadata jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.clients enable row level security;
alter table public.campaigns enable row level security;
alter table public.events enable row level security;

create policy "members can see their org" on public.organizations
  for select using (exists (
    select 1 from public.memberships m
    where m.org_id = organizations.id and m.user_id = auth.uid()
  ));

create policy "members manage clients in org" on public.clients
  for all using (exists (
    select 1 from public.memberships m
    where m.org_id = clients.org_id and m.user_id = auth.uid()
  ));

create policy "members manage campaigns in org" on public.campaigns
  for all using (exists (
    select 1 from public.memberships m
    where m.org_id = campaigns.org_id and m.user_id = auth.uid()
  ));

create policy "members manage events in org" on public.events
  for all using (exists (
    select 1 from public.memberships m
    where m.org_id = events.org_id and m.user_id = auth.uid()
  ));

create policy "members manage memberships in org" on public.memberships
  for all using (auth.uid() = user_id);

-- helper view: current user's orgs
create or replace view public.my_orgs as
  select o.* from public.organizations o
  join public.memberships m on m.org_id = o.id
  where m.user_id = auth.uid();