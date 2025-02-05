import * as arctic from "arctic";
import { env } from "@/env";

// Initialize OAuth client
export const client = new arctic.OAuth2Client(
  env.OIDC_CLIENT_ID!,
  env.OIDC_CLIENT_SECRET!,
  `${env.BASE_URL}/api/callback`
);

// Create authorization URL
export async function createAuthUrl() {
  const state = arctic.generateState();
  const url = client.createAuthorizationURL(
    env.OIDC_AUTH_URI!,
    state,
    env.OIDC_SCOPES!.split(" ")
  );
  return { url, state };
}

// Get user info
export async function getUserInfo(accessToken: string) {
  const response = await fetch(env.OIDC_USERINFO_URI!, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
} 