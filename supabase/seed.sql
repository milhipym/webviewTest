-- Run once to bootstrap your first household and baby.
-- Replace the values below with your own share code, baby name, and birthdate.

-- 1) Create a household (returns its uuid):
select create_household('우리집비번123', '우리집') as household_id;

-- 2) Use the uuid above to insert your baby. Example:
-- insert into babies (household_id, name, birthdate, gender)
-- values ('PASTE-HOUSEHOLD-UUID-HERE', '아기', '2026-05-01', 'U');
