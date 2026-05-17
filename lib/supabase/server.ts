import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getHouseholdId } from "@/lib/auth/session";

export async function getServerSupabase() {
  const cookieStore = await cookies();
  const hid = await getHouseholdId();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Read-only on server components; route handlers manage cookies directly.
        },
      },
      global: {
        headers: hid ? { "x-household-id": hid } : {},
      },
    },
  );
}
