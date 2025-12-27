# Vibe List

Shared shopping list web app built with Next.js, TypeScript, and Supabase.

## Development

### Prerequisites

- Node.js 24.2.0 (see `.tool-versions`)
- npm

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Add your environment variables to `.env.local` (see section 3 for Supabase setup)

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

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
