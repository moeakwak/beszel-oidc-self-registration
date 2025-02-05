import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const booleanEnv = z.preprocess((val) => {
  val = String(val).toLowerCase().trim();
  if (val === "true" || val === "1") return true;
  if (val === "false" || val === "0") return false;
  return undefined;
}, z.boolean().optional());

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    BESZEL_URL: z.string(),
    BESZEL_SUPERUSER_EMAIL: z.string(),
    BESZEL_SUPERUSER_PASSWORD: z.string(),

    BASE_URL: z.string(),

    OIDC_CLIENT_ID: z.string(),
    OIDC_CLIENT_SECRET: z.string(),
    OIDC_AUTH_URI: z.string(),
    OIDC_TOKEN_URI: z.string(),
    OIDC_USERINFO_URI: z.string(),
    OIDC_LOGOUT_URI: z.string(),
    OIDC_USERNAME_CLAIM: z.string().optional().default("preferred_username"),
    OIDC_DISPLAY_NAME: z.string().optional().default("OIDC Login"),
    OIDC_SCOPES: z.string().optional().default("openid profile email"),

    // develop
    TRPC_TIME_LOGGING: booleanEnv.default(false),
    SITE_NAME: z.string().optional().default("Beszel OIDC Self Registration"),

    USER_CREATION_ROLE: z.enum(['user', 'readonly']).optional().default('readonly'),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    BESZEL_URL: process.env.BESZEL_URL,
    BESZEL_SUPERUSER_EMAIL: process.env.BESZEL_SUPERUSER_EMAIL,
    BESZEL_SUPERUSER_PASSWORD: process.env.BESZEL_SUPERUSER_PASSWORD,

    BASE_URL: process.env.BASE_URL,

    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET,
    OIDC_AUTH_URI: process.env.OIDC_AUTH_URI,
    OIDC_TOKEN_URI: process.env.OIDC_TOKEN_URI,
    OIDC_USERINFO_URI: process.env.OIDC_USERINFO_URI,
    OIDC_LOGOUT_URI: process.env.OIDC_LOGOUT_URI,
    OIDC_USERNAME_CLAIM: process.env.OIDC_USERNAME_CLAIM,
    OIDC_DISPLAY_NAME: process.env.OIDC_DISPLAY_NAME,
    OIDC_SCOPES: process.env.OIDC_SCOPES,

    SITE_NAME: process.env.SITE_NAME,

    TRPC_TIME_LOGGING: process.env.TRPC_TIME_LOGGING,

    USER_CREATION_ROLE: process.env.USER_CREATION_ROLE,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
