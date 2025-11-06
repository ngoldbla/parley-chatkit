# Password Protection Setup

This site is protected with HTTP Basic Authentication.

## Configuration

Set the `SITE_PASSWORD` environment variable in your deployment:

### Local Development
Create a `.env.local` file:
```
SITE_PASSWORD=your-secure-password
```

### Vercel Deployment
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - Name: `SITE_PASSWORD`
   - Value: Your desired password
4. Redeploy the site

## Default Password

If `SITE_PASSWORD` is not set, the default password is `changeme` (not recommended for production).

## Accessing the Site

When you visit the site, your browser will prompt for credentials:
- Username: (any value works)
- Password: The value you set in `SITE_PASSWORD`

## Removing Password Protection

To remove password protection, delete the following files:
- `middleware.ts`
- `app/api/auth/route.ts`

Then redeploy your site.
