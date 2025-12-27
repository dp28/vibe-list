# Vibe List

Shared shopping list web app built with Next.js, TypeScript, and Supabase.

## Development

### Prerequisites

- Node.js 24.2.0 (see `.tool-versions`)
- npm
- Docker (for local Supabase)
- Supabase CLI (for local development)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Supabase CLI (if not already installed):

   ```bash
   npm install -g supabase
   ```

   Or using Homebrew (macOS):

   ```bash
   brew install supabase/tap/supabase
   ```

3. Start local Supabase:

   ```bash
   npm run supabase:start
   ```

   This will start a local Supabase instance with default credentials. The app is configured to use these automatically in development mode.

4. (Optional) Copy environment variables for production:

   ```bash
   cp .env.example .env.local
   ```

   For local development, you don't need to set these - the app uses default local Supabase values automatically.

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Local Supabase

The app is configured to use local Supabase by default in development mode. This means you can develop without connecting to a production database.

**Local Supabase URLs:**

- API URL: `http://127.0.0.1:54321`
- Studio (Database UI): `http://127.0.0.1:54323`
- Anon Key: (automatically configured)

**Supabase Commands:**

- `npm run supabase:start` - Start local Supabase
- `npm run supabase:stop` - Stop local Supabase
- `npm run supabase:reset` - Reset local database
- `npm run supabase:status` - Check Supabase status

**Accessing Local Supabase Studio:**
After starting Supabase, visit [http://127.0.0.1:54323](http://127.0.0.1:54323) to access the Supabase Studio where you can:

- View and edit database tables
- Run SQL queries
- Manage authentication
- View API documentation

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run supabase:start` - Start local Supabase
- `npm run supabase:stop` - Stop local Supabase
- `npm run supabase:reset` - Reset local database
- `npm run supabase:status` - Check Supabase status

## Deployment

This project is configured for automatic deployment on Vercel.

### Vercel Setup

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Deployment Behaviour

- **Production**: Automatically deploys on merge to `main` branch
- **Preview**: Automatically creates preview deployments for pull requests

## Environment Variables

See `.env.example` for required environment variables.

## Testing

Tests are written with Vitest and React Testing Library:

```bash
npm test
```

## Code Quality

- ESLint for linting
- Prettier for code formatting
- TypeScript for type safety
- CI/CD via GitHub Actions
