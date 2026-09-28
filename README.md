# 🏋️‍♂️ ApexFit — Modern Cross-Platform Gym Management & Fitness Platform (MVP)

> A modern, production-grade Gym Management & Workout Tracking MVP built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**, architected for maximum code-sharing with **React Native** and immediate backend integration with **Supabase**.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [UI/UX Design System](#-uiux-design-system)
3. [Technology Stack](#-technology-stack)
4. [Architecture & Folder Structure](#-architecture--folder-structure)
5. [Core Features in MVP](#-core-features-in-mvp)
6. [Cross-Platform & React Native Code Sharing Strategy](#-cross-platform--react-native-code-sharing-strategy)
7. [Supabase Setup & Database Migrations](#-supabase-setup--database-migrations)
8. [Installation & Getting Started](#-installation--getting-started)
9. [Environment Variables](#-environment-variables)
10. [Building for Production](#-building-for-production)
11. [Vercel Deployment Guide](#-vercel-deployment-guide)
12. [Future Roadmap](#-future-roadmap)

---

## 🌟 Project Overview

**ApexFit** is designed for modern gym members and fitness enthusiasts who value clean aesthetics, instant responsive interactions, and straightforward progress tracking. Inspired by the sleek minimalism of Stripe and Vercel, the application delivers:

- **Executive Gym Dashboard**: Live welcome greeting, digital VIP Membership Pass card with validity countdown, today's workout launcher, 4 quick stat cards, interactive 7-day weekly activity grid, and recent logged workout history.
- **Workout Routine Management**: Push, Pull, Leg, and Full Body splits with categorized tags, muscle groups, estimated calorie burn, and detailed exercise sequence overviews.
- **Live Workout Tracker**: Real-time set-by-set tracker with weight modification, rep adjustment, completed set checkboxes, "+ Add Set" button, active stopwatch timer, and "Workout Completed 🎉" celebration summary modal.
- **Exercise Encyclopedia**: 14+ foundational gym movements featuring real-time client-side search, multi-filter selector (Muscle Group, Equipment, Difficulty), and step-by-step biomechanical execution guides.
- **Progress & Personal Records**: Recharts-powered bodyweight progression area chart, weekly calories burned bar chart, and verified personal record (PR) cards with progress deltas.
- **Body Measurements & Anthropometrics**: Track weight, body fat %, height, chest, waist, arms, and thighs with local persistence and an "Add Measurement" form modal.
- **Club Broadcasts & Announcements**: Filterable facility notices, new equipment arrivals, yoga sessions, and schedule changes.
- **Member Profile & App Settings**: Dark / Light / System theme toggle, KG / LB unit selector, notification preferences, and editable member contact credentials.

---

## 🎨 UI/UX Design System

The app utilizes a centralized theme token architecture:

| Token | Dark Mode (Default) | Light Mode |
|---|---|---|
| **Background** | Charcoal `#0F1115` | Off-white `#F8FAFC` |
| **Card Surface** | Deep Charcoal `#171A21` | Pure White `#FFFFFF` |
| **Primary Accent** | Electric Neon Lime `#C6FF3D` | Emerald Teal `#10B981` |
| **Border** | Subtle Slate `#232834` | Clean Gray `#E2E8F0` |
| **Typography** | Plus Jakarta Sans & JetBrains Mono | Plus Jakarta Sans & JetBrains Mono |

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite 8 with ESNext modules
- **Styling**: Tailwind CSS v3 with custom theme tokens & CSS variables
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Routing**: React Router DOM (v7) with SPA fallback
- **Backend & Database (Prepared)**: Supabase (`@supabase/supabase-js`)
- **Hosting Platform**: Vercel

---

## 📂 Architecture & Folder Structure

```
gymapp/
├── public/                     # Static assets and favicon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Button, Card, Badge, Avatar, Modal, Drawer,
│   │   │                       # Input, Select, Tabs, ProgressBar, StatCard,
│   │   │                       # EmptyState, LoadingState, ErrorState, Toast
│   │   ├── navigation/         # Sidebar (desktop), Navbar (top), MobileNavigation (bottom)
│   │   ├── dashboard/          # WelcomeHeader, MembershipCard, TodaysWorkoutCard,
│   │   │                       # WeeklyActivityWidget, RecentActivityWidget
│   │   ├── workouts/           # WorkoutCard, WorkoutTrackerModal, WorkoutCompleteModal
│   │   ├── exercises/          # ExerciseCard, ExerciseFilter, ExerciseDetailModal
│   │   ├── progress/           # WeightProgressChart, WeeklyVolumeChart, PersonalRecordsList
│   │   ├── measurements/       # MeasurementSummaryCard, AddMeasurementModal, MeasurementHistoryTable
│   │   ├── announcements/      # AnnouncementCard
│   │   └── profile/            # EditProfileModal
│   ├── context/                # AppContext & global state providers
│   ├── data/                   # Realistic mock data (members, exercises, routines, PRs)
│   ├── hooks/                  # Custom business logic hooks
│   │   ├── useTheme.ts         # Dark / Light / System mode management
│   │   ├── useWorkouts.ts      # Active routine logging & completion
│   │   ├── useExercises.ts     # Real-time search & filter hooks
│   │   ├── useMeasurements.ts  # Anthropometric state & additions
│   │   ├── useProgress.ts      # PRs, weight progression, calories
│   │   ├── useAnnouncements.ts # Club announcements & category filters
│   │   ├── useMember.ts        # Member profile & settings
│   │   └── useToast.ts         # Global toast notifications
│   ├── layouts/
│   │   └── AppLayout.tsx       # Desktop sidebar, mobile navbar, active tracking overlay
│   ├── lib/
│   │   └── supabase.ts         # Supabase client wrapper & isSupabaseConfigured()
│   ├── pages/                  # Top-level view routes
│   │   ├── DashboardPage.tsx
│   │   ├── WorkoutsPage.tsx
│   │   ├── WorkoutDetailPage.tsx
│   │   ├── ExercisesPage.tsx
│   │   ├── ProgressPage.tsx
│   │   ├── MeasurementsPage.tsx
│   │   ├── AnnouncementsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   ├── services/               # Data-access layer (Mock + Supabase ready)
│   │   ├── workouts.ts
│   │   ├── exercises.ts
│   │   ├── measurements.ts
│   │   ├── progress.ts
│   │   ├── announcements.ts
│   │   └── members.ts
│   ├── types/                  # Strict TypeScript models & database schemas
│   │   ├── models.ts
│   │   ├── database.types.ts
│   │   └── index.ts
│   ├── utils/                  # Utility helpers (cn, formatters, storage)
│   ├── App.tsx                 # Client-side router configuration
│   ├── index.css               # Design tokens, CSS variables & base styles
│   └── main.tsx                # React root mount
│
├── supabase/
│   └── migrations/
│       └── 20260928000000_initial_gym_schema.sql  # 11 PostgreSQL tables, indexes & RLS
├── .env.example                # Environment variable template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.app.json           # Application compiler options with path aliases
├── vite.config.ts              # Production Vite configuration with @ path alias
├── tailwind.config.js          # Tailwind theme configuration
├── vercel.json                 # Vercel SPA rewrite routing rules
└── README.md                   # Comprehensive technical documentation
```

---

## 📱 Cross-Platform & React Native Code Sharing Strategy

The codebase is strictly structured into **Platform-Agnostic** and **Platform-Specific** layers:

### 1. 100% Shared Across Web & React Native
- **`src/types/`**: All domain models (`Workout`, `Exercise`, `BodyMeasurement`, `Profile`) and database types.
- **`src/services/`**: Pure asynchronous business data-access functions (`getWorkouts()`, `addMeasurement()`).
- **`src/hooks/`**: Pure React logic hooks (`useWorkouts`, `useExercises`, `useMeasurements`, `useProgress`).
- **`src/utils/`**: Numerical formatters, date formatters, and storage adapters.
- **`src/data/`**: Shared initial offline mock data.

### 2. Platform-Specific UI Implementation
- **Web**: Implemented using HTML5 tags, Tailwind CSS utility classes, and Recharts.
- **React Native (Phase 2 integration)**:
  - Swap HTML elements (`div`, `p`, `button`) for React Native primitives (`View`, `Text`, `TouchableOpacity`).
  - Swap Recharts for `react-native-chart-kit` or Victory Native.
  - Swap web `localStorage` for `@react-native-async-storage/async-storage` via the existing `src/utils/storage.ts` adapter interface.

---

## 🗄️ Supabase Setup & Database Migrations

The database migration file is located at `supabase/migrations/20260928000000_initial_gym_schema.sql`.

It establishes 11 relational PostgreSQL tables:
1. `profiles`: Extends user records with membership level and status.
2. `memberships`: Details plans, start dates, expiration dates, and renewal.
3. `exercises`: Exercise encyclopedia with equipment, difficulty, and muscles.
4. `workouts`: Routine splits (Push, Pull, Legs, Full Body).
5. `workout_exercises`: Join table linking routines to exercises with target sets/reps.
6. `workout_sessions`: User logged workout history sessions.
7. `workout_sets`: Individual logged sets (reps, weight, completion).
8. `measurements`: Weight, height, body fat %, and circumferences.
9. `announcements`: Gym notices and operational broadcasts.
10. `personal_records`: User personal records (PRs) per exercise.
11. `gym_settings`: Member appearance, notifications, units, and language.

### How to Apply Migrations to a Live Supabase Instance
1. Create a new project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/migrations/20260928000000_initial_gym_schema.sql`, copy all contents, and execute.
4. Copy your Supabase Project URL and Anon Key from **Project Settings > API**.
5. Add credentials to your `.env` file.

---

## 🚀 Installation & Getting Started

### 1. Prerequisites
- Node.js `v18+` or `v20+` or `v25+`
- npm `v9+` or `v11+`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Define the configuration variables:
```env
# Supabase Configuration (Optional for MVP - app seamlessly runs in local mock mode without credentials)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Metadata
VITE_APP_NAME="ApexFit Gym"
VITE_APP_ENV=development
```

---

## 📦 Building for Production

Compile TypeScript and build the optimized production distribution:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## ☁️ Vercel Deployment Guide

The repository includes a ready-to-deploy `vercel.json` configuration for single-page routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy in 3 Steps:
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com/new), select "Import Project" and choose the repository.
3. Keep default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if connected.
5. Click **Deploy**!

---

## 🗺️ Future Roadmap

- [ ] **Phase 2 — Authentication & Multi-Tenant Profiles**: Supabase Auth (Magic Links, Google OAuth), secure profile sessions, and role-based access control.
- [ ] **Phase 3 — Gym Operations**: Front desk QR check-in scanner, membership billing, trainer booking, and class attendance caps.
- [ ] **Phase 4 — Advanced Analytics**: 1RM percentage calculator, volume overload heatmaps, and progress photo timeline comparison.
- [ ] **Phase 5 — Native Mobile App**: React Native Expo build sharing `@services`, `@hooks`, and `@types` with Apple HealthKit & Google Health Connect sync.

---

Built with pride for high-performance athletes & modern fitness clubs.
