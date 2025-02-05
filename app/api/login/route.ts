import { createAuthUrl } from "@/lib/oidc";
import { cookies } from "next/headers";

export async function GET() {
  const { url, state } = await createAuthUrl();
  
  // Store state in cookie for verification
  cookies().set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  return Response.redirect(url);
} 