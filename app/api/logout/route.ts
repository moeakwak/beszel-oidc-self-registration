import { cookies } from "next/headers";
import { env } from "@/env";

export async function GET() {
  cookies().delete("user");
  cookies().delete("oauth_state");
  return Response.redirect(env.BASE_URL);
} 