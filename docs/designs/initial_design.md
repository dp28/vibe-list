# Product Requirements Document (PRD)
## Shared Shopping List Web App

---

## 1. Overview

This product is a shared, web-based shopping list application designed for a small, trusted group of users (e.g. a household). It supports multiple lists, offline-first usage, real-time collaboration, and lightweight authentication. The app prioritizes simplicity, reliability, and ease of iteration using widely adopted, well-documented technologies suitable for AI-assisted development.

---

## 2. Goals

### Primary Goals
- Enable multiple users to share and edit shopping lists via the web
- Support offline usage with automatic syncing when connectivity returns
- Organize items using customizable categories
- Support multiple lists (e.g. Groceries, Special Items, Big Purchases)
- Be buildable and maintainable with AI assistance
- Be deployed and hosted entirely on free tiers

### Secondary Goals
- Provide real-time updates when multiple users are active
- Reduce repetitive input by suggesting previously added items
- Maintain a low-friction, mobile-first user experience

### Non-Goals
- Grocery pricing, store integrations, or delivery
- Complex inventory or quantity management
- Advanced analytics or recommendation engines

---

## 3. Users

### Primary Users
- Small, trusted group (e.g. two partners in a household)

### Assumptions
- All users are authenticated
- All users have access to the same shared lists
- No public or anonymous access

---

## 4. Core Features (MVP)

### 4.1 Authentication
- Google SSO
- No app-managed passwords
- Users automatically re-authenticated on return

---

### 4.2 Multiple Lists
- Users can create, rename, and delete lists
- One list is active at a time
- Last-used list opens by default on app load
- Lists are switchable via a lightweight list switcher UI

Examples:
- Groceries
- Specialised Items
- Big Purchases

---

### 4.3 Shared List Editing
- Items can be added, checked, and removed
- Changes persist across sessions
- All users see the same list state

---

### 4.4 Offline Support
- App functions fully while offline
- Users can:
  - Add items
  - Check/uncheck items
  - Manage categories
- Offline actions are stored locally
- Changes sync automatically when connectivity is restored
- Conflict resolution favors the latest timestamped action

---

### 4.5 Categories
- Each list has its own set of categories
- Each item belongs to exactly one category
- Users can:
  - Add categories
  - Rename categories
  - Reorder categories
  - Delete categories (with reassignment of items)
- Items are displayed grouped and sorted by category order

---

### 4.6 Item States
- Items can be checked off
- Checked items:
  - Remain visible
  - Are visually crossed out
- A single action allows clearing all checked items
- Cleared items are moved to history (not permanently deleted)

---

### 4.7 Item History & Suggestions
- The app records previously added items
- When adding a new item:
  - Previously used items are suggested as the user types
  - Suggestions are ranked by frequency and recency
- Selecting a suggestion re-adds the item instantly

---

## 5. User Experience Requirements

- Mobile-first, responsive design
- Large tap targets for item interaction
- Fast initial load
- Minimal UI chrome
- Clear visual hierarchy:
  - Lists → Categories → Items
- Subtle offline and syncing indicators
- One primary action: add item

---

## 6. UI Flows (Summary)

### App Entry
- First-time users sign in and are dropped into a default list
- Returning users open directly to the last-used list

### List Switching
- Tapping the list name opens a list switcher
- Users can select an existing list or create a new one

### List View
- Items grouped by category
- Inline add item input
- Checked items crossed out
- Button to clear checked items

### Category Management
- Per-list category editor
- Drag-and-drop reordering
- Inline rename and add

---

## 7. Functional Requirements

- CRUD operations for:
  - Lists
  - Categories
  - Items
- Offline persistence using browser storage
- Real-time syncing when online
- History tracking for cleared items
- Suggestions based on historical data

---

## 8. Non-Functional Requirements

### Technology Constraints
- Use widely adopted, well-documented technologies
- Avoid experimental or niche frameworks
- Strong community and example coverage

### Performance
- Initial load under 2 seconds on mobile
- Local interactions feel instant
- Sync operations do not block UI

### Security
- Authenticated access only
- Data scoped to a shared household context
- No public write access

---

## 9. Testing & Quality Requirements

### Automated Testing
- Unit tests for core logic (items, categories, syncing)
- Integration tests for key user flows
- Frontend component tests where appropriate

### Test Coverage Expectations
- Core business logic covered
- Offline-to-online sync behavior tested
- List and category operations tested

---

## 10. CI / CD Requirements

### Source Control
- GitHub repository as the single source of truth

### Continuous Integration
- GitHub Actions used for CI
- On every pull request:
  - Run automated tests
  - Lint code
  - Fail builds on test or lint errors

### Deployment
- Automated deployment triggered via GitHub
- Deploy on merge to main branch
- Use free-tier hosting (e.g. Vercel, Netlify)
- Deployment must be reproducible and documented

---

## 11. Suggested Technology Stack (Guidance)

These choices are intentionally boring and AI-friendly:

- Frontend:
  - React
  - Next.js
  - Tailwind CSS
- Auth:
  - Google SSO (via Firebase Auth or Auth.js)
- Data & Sync:
  - Firebase Firestore or Supabase
  - IndexedDB for offline persistence
- Hosting:
  - Vercel or Netlify (free tier)
- CI/CD:
  - GitHub Actions

---

## 12. Success Metrics

- Lists actively used week over week
- Items added with minimal friction
- Categories used and reordered
- Successful offline edits syncing without user intervention
- Reduced duplicate purchases

---

## 13. Out of Scope (Future Work)

- Multiple households or sharing beyond a trusted group
- Quantity or unit tracking
- Voice input
- Notifications or reminders
- Advanced behavioral analytics
