# Beszel OIDC Self Registration

A self-service portal that addresses issues with Beszel's PocketBase-based OIDC user creation. It provides a reliable way for users to register Beszel accounts using their organizational OIDC credentials.

## Motivation

Beszel, which is built on PocketBase, has some limitations with its OIDC user creation:
- The built-in OIDC authentication in PocketBase may have stability issues
- Manual user creation and OIDC linking can be cumbersome
- Organizations need a reliable self-service solution

This project provides:
- A stable and reliable OIDC user registration process
- Proper user creation through Beszel's PocketBase API
- Automatic OIDC account linking after user creation
- Configurable default role (read-only/user) for new registrations

## Use Case

This portal is ideal for organizations that:
- Use Beszel with OIDC authentication
- Need a reliable self-service registration process
- Want to ensure proper user creation and OIDC linking
- Prefer to give new users a read-only default role

## Features

- Seamless OIDC authentication integration
- Proper user creation via PocketBase API
- Automatic OIDC account linking
- Configurable role-based access control

## How to use

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```env
# Beszel Configuration
BESZEL_URL=            # Your Beszel instance URL
BESZEL_SUPERUSER_EMAIL=    # Superuser email for system operations
BESZEL_SUPERUSER_PASSWORD= # Superuser password

# Application Configuration
BASE_URL=              # Your application URL (e.g., http://localhost:3000)
SITE_NAME=             # Site display name

# OIDC Configuration
OIDC_CLIENT_ID=        # OIDC client ID
OIDC_CLIENT_SECRET=    # OIDC client secret
OIDC_AUTH_URI=         # Authorization endpoint
OIDC_TOKEN_URI=        # Token endpoint
OIDC_USERINFO_URI=     # UserInfo endpoint
OIDC_LOGOUT_URI=       # Logout endpoint
OIDC_USERNAME_CLAIM=   # Claim to use as username (default: preferred_username)
OIDC_DISPLAY_NAME=     # Login button text (default: "OIDC Login")
OIDC_SCOPES=           # Required scopes (default: "openid profile email")

# User Configuration
USER_CREATION_ROLE=    # Default role for new users (user/readonly, default: readonly)
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

To deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoeakwak%2Fbeszel-oidc-self-registration&env=BESZEL_URL&env=BESZEL_SUPERUSER_EMAIL&env=BESZEL_SUPERUSER_PASSWORD&env=BASE_URL&env=OIDC_CLIENT_ID&env=OIDC_CLIENT_SECRET&env=OIDC_AUTH_URI&env=OIDC_TOKEN_URI&env=OIDC_USERINFO_URI&env=OIDC_LOGOUT_URI&env=OIDC_USERNAME_CLAIM&env=OIDC_DISPLAY_NAME&env=SITE_NAME)

### Other Platforms

You can also deploy this application to any platform that supports Next.js applications:

## User Flow

1. User visits the application
2. Authenticates with the organization's OIDC provider
3. After successful authentication:
   - For new users:
     - Creates a Beszel account through PocketBase API
     - Links the OIDC account to the created user
     - Sets the configured default role
   - For existing users: Shows account status and OIDC link status
4. Users can manually link their OIDC account if needed

## Security Considerations

- All sensitive operations are performed server-side
- OIDC tokens are stored in HTTP-only cookies
- Superuser credentials are only used server-side
- Role-based access control is enforced at the Beszel level
- Default read-only access prevents accidental modifications

## How It Works

1. **OIDC Authentication**
   - Uses the Arctic library for OIDC authentication
   - Handles the OAuth2 flow securely
   - Retrieves user information from the OIDC provider

2. **User Creation**
   - Creates users through Beszel's PocketBase API
   - Sets email and username from OIDC claims
   - Assigns the configured default role

3. **OIDC Linking**
   - Automatically links OIDC account after user creation
   - Provides manual linking option if needed
   - Uses PocketBase's OAuth2 linking mechanism

## Notes

- This portal focuses on providing a reliable OIDC registration process
- It's designed to work with Beszel's PocketBase backend
- The implementation ensures proper user creation and OIDC linking
- Default read-only role option helps maintain system security

