create extension if not exists pgcrypto;

create table if not exists households (
  id              uuid primary key default gen_random_uuid(),
  share_code_hash text not null,
  display_name    text,
  created_at      timestamptz not null default now()
);
create unique index if not exists households_share_code_hash_idx on households(share_code_hash);

create table if not exists babies (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name         text not null,
  birthdate    date not null,
  gender       text check (gender in ('M','F','U')) default 'U',
  photo_url    text,
  created_at   timestamptz not null default now()
);
create index if not exists babies_household_idx on babies(household_id);

do $$
begin
  if not exists (select 1 from pg_type where typname = 'record_type') then
    create type record_type as enum (
      'feeding_breast','feeding_bottle','feeding_pumped',
      'diaper','sleep','baby_food','snack',
      'medicine','temperature','health','photo'
    );
  end if;
end $$;

create table if not exists records (
  id                uuid primary key default gen_random_uuid(),
  baby_id           uuid not null references babies(id) on delete cascade,
  household_id      uuid not null references households(id) on delete cascade,
  type              record_type not null,
  started_at        timestamptz not null,
  ended_at          timestamptz,
  data              jsonb not null default '{}'::jsonb,
  note              text,
  created_by_device text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists records_baby_started_idx on records(baby_id, started_at desc);
create index if not exists records_active_idx on records(baby_id, type) where ended_at is null;
create index if not exists records_household_started_idx on records(household_id, started_at desc);

create table if not exists photos (
  id           uuid primary key default gen_random_uuid(),
  baby_id      uuid not null references babies(id) on delete cascade,
  household_id uuid not null references households(id) on delete cascade,
  taken_at     timestamptz not null default now(),
  storage_path text not null,
  note         text,
  created_at   timestamptz not null default now()
);
create index if not exists photos_baby_taken_idx on photos(baby_id, taken_at desc);

create table if not exists growth_measurements (
  id           uuid primary key default gen_random_uuid(),
  baby_id      uuid not null references babies(id) on delete cascade,
  household_id uuid not null references households(id) on delete cascade,
  measured_at  timestamptz not null,
  height_cm    numeric(5,2),
  weight_kg    numeric(5,3),
  head_cm      numeric(5,2),
  note         text,
  created_at   timestamptz not null default now()
);
create index if not exists growth_baby_measured_idx on growth_measurements(baby_id, measured_at);

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_records_updated on records;
create trigger trg_records_updated before update on records
  for each row execute function set_updated_at();
