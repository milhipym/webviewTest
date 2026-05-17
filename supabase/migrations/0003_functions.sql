create or replace function create_household(p_code text, p_name text)
returns uuid language plpgsql security definer as $$
declare hid uuid;
begin
  insert into households(share_code_hash, display_name)
    values (crypt(p_code, gen_salt('bf', 10)), p_name)
    returning id into hid;
  return hid;
end $$;

create or replace function verify_share_code(p_code text)
returns uuid language plpgsql security definer as $$
declare hid uuid;
begin
  select id into hid from households
    where share_code_hash = crypt(p_code, share_code_hash)
    limit 1;
  return hid;
end $$;

revoke all on function verify_share_code(text) from public, anon, authenticated;
revoke all on function create_household(text, text) from public, anon, authenticated;
-- service_role bypasses RLS and can call these via rpc().
