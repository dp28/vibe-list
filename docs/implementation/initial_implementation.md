# Incremental Build Plan
## Shared Shopping List Web App (Vercel + Supabase)

Each numbered section corresponds to **one git commit**.
Every commit must:
- Build successfully
- Pass tests and linting
- Be safe to deploy
- Improve the production app incrementally

---

## 0. Human Setup (Pre-Code) ⚠️

### Goal
Prepare all external services before writing code.

### Tasks (Human Required)
- Create / verify accounts:
  - GitHub
  - Vercel
  - Supabase
- Use the same Google account for all (recommended)
- Create a new GitHub repository (empty)

_No code yet._

---

## 1. Repository Bootstrap + AI Rules + CI/CD (Foundational)

### Goal
Establish guardrails **before any app code exists**.

---

### 1.1 Cursor / AI Agent Rules (Required)

Create `.cursorrules` at repo root.

#### `.cursorrules`
- Write small, readable functions (target < 40 lines)
- One responsibility per file
- Prefer explicit names over clever abstractions
- No inline magic numbers or strings
- Extract business logic from React components
- Favor composition over deep conditionals
- Comments explain *why*, not *what*
- All non-trivial logic must have tests
- UI that performs network requests must include:
  - Loading state
  - Error state
- Avoid premature optimization
- Prefer boring, well-documented patterns

This file **must exist before writing application code**.

---

### 1.2 Tooling & CI

### Tasks
- Initialize Next.js (App Router) with TypeScript
- Add ESLint + Prettier
- Add testing framework (Vitest or Jest)
- Add GitHub Actions CI:
  - Install dependencies
  - Run lint
  - Run tests
- Protect `main` branch:
  - Require CI to pass before merge

### Deliverables
- `.cursorrules`
- `.github/workflows/ci.yml`
- Lint + test configs
- Minimal homepage

### Verification
- `npm run lint` passes
- `npm test` passes
- CI runs on push

---

## 2. Vercel Deployment Pipeline (Before Features)

### Goal
Every merge to `main` deploys automatically.

### Tasks
- Connect GitHub repo to Vercel
- Configure production + preview deployments
- Add environment variable placeholders
- Verify deploy from `main`

### Deliverables
- Live production URL
- Preview URLs for PRs

### Human Required
- Link repo in Vercel dashboard
- Add env vars (empty placeholders acceptable initially)

---

## 3. Supabase Project Setup (Backend Skeleton)

### Goal
Backend exists, even if app does little.

### Tasks
- Create Supabase project
- Enable:
  - Postgres
  - Auth
- Create Supabase client wrapper
- Add local dev env support

### Deliverables
- Supabase project
- `lib/supabaseClient.ts`
- `.env.local` and Vercel env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Tests
- Client initialization test
- Environment validation test

### Human Required
- Create Supabase project
- Copy keys to local + Vercel envs

---

## 4. Authentication (Google SSO)

### Goal
Users can sign in securely.

### Tasks
- Enable Google OAuth in Supabase
- Implement auth provider
- Add sign-in and sign-out UI
- Protect authenticated routes

### UI Requirements
- Loading state while auth initializes
- Error UI if auth fails

### Deliverables
- Auth hook (`useAuth`)
- Authenticated layout
- Sign-in screen

### Tests
- Auth state logic tests
- Route protection tests (mocked)

### Human Required
- Create Google OAuth credentials
- Configure redirect URLs in Supabase

---

## 5. Minimal List MVP (Single List, Useful App)

### Goal
Ship something genuinely useful fast.

### Tasks
- Create tables:
  - `lists`
  - `items`
- Auto-create a default list for user/household
- Add item (text only)
- Check/uncheck item
- Persist to Supabase

### UI Requirements
- Loading state while fetching list
- Error state if fetch fails

### Deliverables
- List screen
- Add item input
- Checkbox interaction

### Tests
- Item CRUD logic tests
- List fetch tests (mocked Supabase)

---

## 6. Realtime Sync

### Goal
Multiple users see updates instantly.

### Tasks
- Enable Supabase realtime
- Subscribe to item changes
- Update UI on insert/update/delete
- Cleanup subscriptions properly

### UI Requirements
- Sync-safe rendering
- No duplicate items

### Tests
- Subscription handler tests
- Event handling logic tests

---

## 7. Offline Support (Local-First Core)

### Goal
App works without internet.

### Tasks
- Add IndexedDB persistence
- Cache lists and items locally
- Queue offline mutations
- Replay mutations on reconnect

### UI Requirements
- Offline indicator
- Syncing indicator
- Errors surfaced non-destructively

### Tests
- Offline queue tests
- Sync resolution tests

---

## 8. Categories per List

### Goal
Structured shopping.

### Tasks
- Add `categories` table
- Associate items with categories
- Seed default categories per list
- Render grouped items

### UI Requirements
- Loading state while categories load
- Empty category handling

### Tests
- Category ordering logic tests
- Item grouping tests

---

## 9. Category Management UI

### Goal
User controls structure.

### Tasks
- Add category editor:
  - Add
  - Rename
  - Reorder
- Persist category order

### UI Requirements
- Optimistic updates
- Error recovery if save fails

### Tests
- Reordering logic tests
- Rename validation tests

---

## 10. Multiple Lists

### Goal
Support multiple shopping contexts.

### Tasks
- Create multiple lists
- List switcher UI
- Persist last-used list
- Scope categories and items per list

### UI Requirements
- Loading state when switching lists
- Error UI if list fetch fails

### Tests
- List switching logic tests
- State isolation tests

---

## 11. Checked Items & Clearing

### Goal
Clean shopping flow.

### Tasks
- Cross out checked items
- Add "Clear checked items" button
- Move cleared items to history table

### UI Requirements
- Undo feedback (optional toast)
- No accidental destructive actions

### Tests
- Clear logic tests
- History persistence tests

---

## 12. Item History & Suggestions

### Goal
Reduce typing friction.

### Tasks
- Store historical items
- Track frequency + recency
- Suggest items during input

### UI Requirements
- Non-blocking suggestions
- Graceful empty state

### Tests
- Suggestion ranking tests
- History read/write tests

---

## End State 🎯

A production-ready app that:
- Is deployed from day one
- Is guarded by CI and AI rules
- Works offline and online
- Syncs in realtime
- Is calm to read, calm to change, calm to extend

Each commit leaves the app **better than before**, never broken.
