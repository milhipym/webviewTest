create or replace function current_household() returns uuid language sql stable as $$
  select nullif(current_setting('request.headers', true)::json->>'x-household-id', '')::uuid
$$;

alter table households enable row level security;
alter table babies enable row level security;
alter table records enable row level security;
alter table photos enable row level security;
alter table growth_measurements enable row level security;

drop policy if exists households_select on households;
create policy households_select on households
  for select using (id = current_household());

drop policy if exists babies_rw on babies;
create policy babies_rw on babies for all
  using (household_id = current_household())
  with check (household_id = current_household());

drop policy if exists records_rw on records;
create policy records_rw on records for all
  using (household_id = current_household())
  with check (household_id = current_household());

drop policy if exists photos_rw on photos;
create policy photos_rw on photos for all
  using (household_id = current_household())
  with check (household_id = current_household());

drop policy if exists growth_rw on growth_measurements;
create policy growth_rw on growth_measurements for all
  using (household_id = current_household())
  with check (household_id = current_household());

-- Storage policies: assumes a bucket named 'baby-photos'.
-- (Bucket must be created separately via the Supabase dashboard or SQL below.)
-- Path convention enforces first segment is the household id.

insert into storage.buckets (id, name, public)
values ('baby-photos', 'baby-photos', false)
on conflict (id) do nothing;

drop policy if exists "baby photos r" on storage.objects;
create policy "baby photos r" on storage.objects
  for select using (
    bucket_id = 'baby-photos'
    and (storage.foldername(name))[1] = current_household()::text
  );

drop policy if exists "baby photos w" on storage.objects;
create policy "baby photos w" on storage.objects
  for insert with check (
    bucket_id = 'baby-photos'
    and (storage.foldername(name))[1] = current_household()::text
  );

drop policy if exists "baby photos d" on storage.objects;
create policy "baby photos d" on storage.objects
  for delete using (
    bucket_id = 'baby-photos'
    and (storage.foldername(name))[1] = current_household()::text
  );
