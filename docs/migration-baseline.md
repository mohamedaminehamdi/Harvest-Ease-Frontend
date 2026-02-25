# Frontend Baseline Inventory

## Current Runtime
- Legacy stack is Create React App with React Router and Redux Toolkit.
- There is an in-progress migration setup to Next.js 15 + TypeScript in root config files.

## Legacy Routing Surface
- `/` -> Home
- `/login` -> Login
- `/Settings` -> SettingsPage (protected)
- `/Farm-scheduler` -> FarmSchedulerPage (protected)
- `/Resources-tracker` -> ResourcesTrackerPage (protected)
- `/Plant-Health-Scanner` -> PlantHealth (protected)
- `/Forum` -> CommunityPage (protected)
- `/Chatbot` nested routes for chat and saved messages (protected)

## State Management
- Legacy Redux auth store in `src/state/store.js` and `src/state/reducers/authReducer.js`.
- In-progress Zustand + Immer auth store exists in `src/state/useAuthStore.ts`.

## Major UI Domains To Migrate
- Home and marketing sections.
- Forum/community feed and post creation.
- Farm scheduler and event flows.
- Resources tracker and plant-health scanner.
- Chatbot views and saved-message UI.
- Settings and user profile flows.

## Migration Constraints
- All Next.js page files in `src/app/**/page.tsx` must remain server components.
- Sections should compose smaller components under `src/components`.
- Client-side providers should be isolated in `src/providers/AppProviders.tsx`.
