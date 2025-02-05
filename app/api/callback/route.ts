import { client, getUserInfo } from "@/lib/oidc";
import { cookies } from "next/headers";
import { env } from "@/env";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return Response.redirect(`${env.BASE_URL}?error=invalid_state`);
  }

  try {
    const tokens = await client.validateAuthorizationCode(
      env.OIDC_TOKEN_URI!,
      code,
      null
    );

    const userInfo = await getUserInfo(tokens.accessToken());
    
    // Store user info in session cookie
    cookies().set("user", JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return Response.redirect(env.BASE_URL);
  } catch (error) {
    console.error("Auth error:", error);
    return Response.redirect(`${env.BASE_URL}?error=auth_error`);
  }
} 