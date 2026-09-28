# 🏋️‍♂️ ApexFit — Production-Grade Cross-Platform Gym & Fitness Platform

> A modern, production-grade Gym Management & Workout Tracking application built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Supabase Auth**. Architected for maximum code-sharing with **React Native** and deployed on **Vercel**.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Authentication & Account Management](#-authentication--account-management)
3. [UI/UX Design System](#-uiux-design-system)
4. [Technology Stack](#-technology-stack)
5. [Architecture & Folder Structure](#-architecture--folder-structure)
6. [Core Features](#-core-features)
7. [Supabase Setup & Database Migrations](#-supabase-setup--database-migrations)
8. [Supabase Auth Configuration Guide](#-supabase-auth-configuration-guide)
9. [Row Level Security (RLS) & Security Policies](#-row-level-security-rls--security-policies)
10. [Environment Variables](#-environment-variables)
11. [Installation & Getting Started](#-installation--getting-started)
12. [Vercel Deployment Guide](#-vercel-deployment-guide)
13. [Future Roadmap](#-future-roadmap)

---

## 🌟 Project Overview

**ApexFit** delivers a sleek, high-performance gym management experience inspired by modern software aesthetics (Stripe, Linear, Vercel). Members can manage workouts, log sets in real-time, view exercise biomechanics, monitor anthropometrics, track personal records, and securely administer their member account.

---

## 🔐 Authentication & Account Management

ApexFit features a production-ready, centralized authentication architecture powered by **Supabase Auth**:

- **Authentication Service Layer** (`src/services/auth.ts`):
  - Encapsulates `signUp()`, `signIn()`, `signOut()`, `resetPassword()`, `updatePassword()`, `changePassword()`, `getProfile()`, `updateProfile()`, `deleteAccount()`, `resendVerification()`.
  - Translates raw Supabase API errors into friendly human messages.
  - Automatically handles session persistence and offline demo fallbacks.
- **Centralized Auth Provider & Hook** (`src/auth/AuthProvider.tsx`, `src/auth/useAuth.ts`):
  - Subscribes to Supabase `onAuthStateChange` events.
  - Exposes `user`, `profile`, `session`, `loading`, `isAuthenticated`, and `isEmailVerified`.
- **Protected Routes** (`src/auth/ProtectedRoute.tsx`):
  - Safeguards `/`, `/workouts`, `/exercises`, `/progress`, `/measurements`, `/announcements`, `/profile`, `/settings`.
  - Redirects unauthenticated users to `/login?redirect=<target_path>` and seamlessly returns them to their requested page upon login.
  - Renders a polished branded loading spinner while sessions load to eliminate flickering.
- **Signup Flow** (`/signup`):
  - Full Name (required)
  - Email Address (validated)
  - Mobile Number (required, stored in profile for contact records; prepared for SMS OTP)
  - Password (min. 8 characters, 1 uppercase, 1 lowercase, 1 number)
  - Confirm Password (strictly matching)
  - Date of Birth (optional profile field, ready for age-verification requirements)
  - Required Terms of Service & Privacy Policy agreement checkbox
  - Email confirmation screen with resend link
- **Login Flow** (`/login`):
  - Email + Password with password visibility toggle
  - Quick "Instant Demo Login" for one-click testing
  - Forgot Password navigation
- **Password Reset Flow** (`/forgot-password` & `/reset-password`):
  - Secure email password recovery link
  - Token recovery page with strict password validation
- **Email Verification** (`/verify-email`):
  - Verification banner, resend email trigger, and email-change flow
- **Account Management** (`/profile` & `/settings`):
  - View member photo, full name, email, mobile, DOB, membership tier, member since date, and verification status.
  - Edit Profile modal (full name, email with confirmation notice, mobile, DOB, avatar URL).
  - Change Password modal (current password check + new password validation).
  - Destructive Delete Account dialog (requires typing "DELETE" to confirm permanent erasure).
  - Multi-location logout triggers (Sidebar, Navbar, Mobile navigation drawer, Profile page, Settings page).

---

## 🎨 UI/UX Design System

The app utilizes a theme token architecture supporting both vibrant dark and crisp light themes:

| Token | Dark Mode (Default) | Light Mode |
|---|---|---|
| **Background** | Charcoal `#0F1115` | Off-white `#F8FAFC` |
| **Card Surface** | Deep Charcoal `#171A21` | Pure White `#FFFFFF` |
| **Primary Accent** | Electric Neon Lime `#C6FF3D` | Amber Gold `#F59E0B` |
| **Border** | Subtle Slate `#232834` | Clean Gray `#E2E8F0` |
| **Typography** | Plus Jakarta Sans & JetBrains Mono | Plus Jakarta Sans & JetBrains Mono |

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite 8 with ESNext modules
- **Form Validation**: Zod + React Hook Form (`@hookform/resolvers`)
- **Styling**: Tailwind CSS v3 with custom theme tokens & CSS variables
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Routing**: React Router DOM (v7) with protected route guards
- **Backend & Database**: Supabase Auth + Supabase PostgreSQL
- **Hosting Platform**: Vercel

---

## 📂 Architecture & Folder Structure

```
gymapp/
├── src/
│   ├── auth/                   # Centralized authentication & route guards
│   │   ├── AuthContext.tsx     # Context definition & types
│   │   ├── AuthProvider.tsx    # State provider & Supabase listener
│   │   ├── useAuth.ts          # Custom consumption hook
│   │   └── ProtectedRoute.tsx  # Protected route guard & session loader
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Button, Card, Badge, Avatar, Modal, Drawer, Input, Toast
│   │   ├── navigation/         # Sidebar (desktop), Navbar (top), MobileNavigation (bottom)
│   │   ├── profile/            # EditProfileModal, ChangePasswordModal, DeleteAccountModal
│   │   ├── workouts/           # WorkoutCard, WorkoutTrackerModal, WorkoutCompleteModal
│   │   ├── exercises/          # ExerciseCard, ExerciseFilter, ExerciseDetailModal
│   │   ├── measurements/       # MeasurementSummaryCard, AddMeasurementModal
│   │   └── progress/           # WeightProgressChart, WeeklyVolumeChart
│   ├── context/                # AppContext (workouts, preferences, toasts)
│   ├── data/                   # Realistic mock data
│   ├── hooks/                  # useTheme, useWorkouts, useMember, useToast, etc.
│   ├── layouts/
│   │   └── AppLayout.tsx       # Desktop sidebar, mobile navbar, active tracking overlay
│   ├── lib/
│   │   └── supabase.ts         # Supabase client & diagnostic health check
│   ├── pages/                  # Application views
│   │   ├── auth/               # LoginPage, SignupPage, ForgotPasswordPage,
│   │   │                       # ResetPasswordPage, VerifyEmailPage
│   │   ├── legal/              # TermsPage, PrivacyPage
│   │   ├── DashboardPage.tsx
│   │   ├── WorkoutsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   ├── services/
│   │   ├── auth.ts             # Supabase Auth service & error mapping
│   │   └── members.ts          # Member profile & preferences service
│   ├── types/                  # TypeScript domain models & auth contracts
│   └── utils/
│       ├── validation.ts       # Reusable Zod schemas for all forms
│       ├── cn.ts               # Tailwind class merger
│       └── storage.ts          # Safe cross-platform storage adapter
├── supabase/
│   └── migrations/             # SQL migrations for Supabase
│       ├── 20260928000000_initial_gym_schema.sql
│       └── 20260928000001_auth_schema_and_triggers.sql
└── README.md
```

---

## 🗄️ Supabase Setup & Database Migrations

### 1. Apply Schema Migrations
In your Supabase project dashboard, open the **SQL Editor**, and run the migrations in order:

1. **`supabase/migrations/20260928000000_initial_gym_schema.sql`**
   - Creates `profiles`, `memberships`, `exercises`, `workout_routines`, `workout_sessions`, `measurements`, `personal_records`, `announcements`.
   - Populates initial exercise encyclopedia and gym announcements.
2. **`supabase/migrations/20260928000001_auth_schema_and_triggers.sql`**
   - Connects `public.profiles(id)` directly to `auth.users(id)` with `ON DELETE CASCADE`.
   - Adds `mobile_number` and `date_of_birth` columns.
   - Installs the secure `handle_new_user()` trigger to automatically create profiles on signup.
   - Enables Row Level Security (RLS) on all user tables with strict ownership policies.

---

## ⚙️ Supabase Auth Configuration Guide

### 1. URL Configuration
Navigate to **Supabase Dashboard > Authentication > URL Configuration**:

- **Site URL**:
  - Local development: `http://localhost:5173`
  - Production: `https://your-production-app.vercel.app`
- **Redirect URLs (Allow list)**:
  Add the following wildcard and exact redirect URLs:
  ```
  http://localhost:5173/**
  http://localhost:5173/dashboard
  http://localhost:5173/reset-password
  https://your-production-app.vercel.app/**
  https://your-production-app.vercel.app/dashboard
  https://your-production-app.vercel.app/reset-password
  ```

### 2. Email Provider Settings
Navigate to **Authentication > Providers > Email**:
- Ensure **Email provider** is **Enabled**.
- **Confirm email**: Recommended enabled for production. If disabled, users are signed in immediately upon registration.
- **Secure email change**: Enabled (requires confirmation before applying email updates).

---

## 🛡️ Row Level Security (RLS) & Security Policies

All member data is protected by PostgreSQL Row Level Security:

| Table | Policy | Enforced Rule |
|---|---|---|
| `profiles` | User Ownership | `auth.uid() = id` (SELECT, INSERT, UPDATE, DELETE) |
| `memberships` | Member Ownership | `auth.uid() = profile_id` (SELECT) |
| `measurements` | User Ownership | `auth.uid() = profile_id` (ALL) |
| `workout_sessions` | User Ownership | `auth.uid() = profile_id` (ALL) |
| `personal_records` | User Ownership | `auth.uid() = profile_id` (ALL) |
| `exercises` | Public Authenticated | Authenticated users can read exercise movements |
| `announcements` | Public Authenticated | Authenticated users can view facility notices |

> **Security Note:** The frontend only uses `VITE_SUPABASE_ANON_KEY`. The privileged `SUPABASE_SERVICE_ROLE_KEY` is **never** bundled into the client application.

---

## 🔑 Environment Variables

Create `.env` in the project root:

```env
# Supabase Configuration (Get from Supabase Dashboard > Project Settings > API)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key-here

# Application Configuration
VITE_APP_NAME="ApexFit Gym"
VITE_APP_ENV=development
```

---

## 🚀 Installation & Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/abhiversion2/gymapp.git
cd gymapp

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` to test registration, login, workout tracking, and account management.

---

## 🚢 Vercel Deployment Guide

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete supabase authentication"
   git push origin main
   ```
2. Import the repository into **Vercel**.
3. Under **Project Settings > Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy! Vercel will build the production bundle with `npm run build`.

---

## 🔮 Future Roadmap

- **Phase 2 — Mobile Phone & SMS OTP**: Supabase Phone authentication for instant one-time-password login.
- **Phase 3 — Social Authentication**: One-click Google and Apple login integrations.
- **Phase 4 — Gym Role-Based Access Control**: Member, Personal Trainer, Gym Floor Manager, Super Administrator.
- **Phase 5 — Multi-Branch / Multi-Gym Architecture**: Single user account linked across multiple affiliated fitness clubs.
