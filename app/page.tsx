import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function Root() {
  const session = await getSessionFromCookies();
  redirect(session ? "/today" : "/login");
}
