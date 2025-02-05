# Beszel OIDC Self Registration

A self-service portal that complements Beszel's built-in OIDC integration. It allows users to register with their OIDC credentials and automatically gain access to all available systems.

## Motivation

While Beszel supports OIDC authentication through environment variables, the built-in integration has some limitations:
- Users created via OIDC don't have their email addresses set
- New users don't automatically get access to existing systems
- No control over the default user role

This project addresses these limitations by providing:
- Proper user creation with email addresses from OIDC claims
- Automatic synchronization of system access permissions
- Configurable default role (read-only/user) for new registrations

## Use Case

This portal is ideal for organizations that:
- Use OIDC (e.g., Keycloak, Auth0) for authentication
- Want to allow self-service registration for Beszel
- Prefer to give all users read-only access by default
- Want new users to automatically see all available systems

## Features

- Seamless OIDC authentication integration
- Self-service account creation with proper email mapping
- Automatic system access synchronization for all available systems
- Configurable role-based access control (regular user/read-only)
- Modern, responsive UI with dark mode support

## Prerequisites

- Node.js 18+
- A running Beszel instance
- An OIDC provider (e.g., Keycloak, Auth0, etc.)
- A Beszel superuser account

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

This application is optimized for deployment on Vercel. To deploy:

1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Configure environment variables in Vercel's dashboard
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fbeszel-oidc-registration)

### Other Platforms

You can also deploy this application to any platform that supports Next.js applications:

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## User Flow

1. User visits the application
2. Authenticates with your organization's OIDC provider
3. After successful authentication:
   - For new users: Creates a Beszel account with:
     - Username and email from OIDC claims
     - Configurable default role (typically read-only)
     - Access to all available systems
   - For existing users: Shows current system access status
4. Users can sync their system access if new systems are available

## Security Considerations

- All sensitive operations are performed server-side
- OIDC tokens are stored in HTTP-only cookies
- Superuser credentials are only used server-side
- Role-based access control is enforced at the Beszel level
- Default read-only access prevents accidental modifications

## Comparison with Built-in OIDC

| Feature | Built-in OIDC | This Portal |
|---------|--------------|-------------|
| User Creation | Automatic | Automatic |
| Email Setting | No | Yes |
| System Access | None | All Systems |
| Role Control | No | Yes |
| Access Sync | No | Yes |

## Notes

- This portal is designed to work alongside Beszel's built-in OIDC integration
- It's particularly useful for organizations that want to provide immediate system access to new users
- The default read-only role helps maintain system security while allowing broad access

