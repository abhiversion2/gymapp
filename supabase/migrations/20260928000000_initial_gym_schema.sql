-- ==============================================================================
-- APEXFIT GYM MANAGEMENT PLATFORM - SUPABASE SCHEMA MIGRATION
-- Migration: 20260928000000_initial_gym_schema.sql
-- Description: Core schema for profiles, memberships, workouts, exercises,
--              workout tracking, measurements, announcements, and personal records.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Extends auth.users in Phase 2)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    member_since DATE NOT NULL DEFAULT CURRENT_DATE,
    membership_plan TEXT NOT NULL DEFAULT 'Premium',
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Paused', 'Expired'))
);

-- ------------------------------------------------------------------------------
-- 2. MEMBERSHIPS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL CHECK (plan_name IN ('Basic', 'Standard', 'Premium', 'VIP')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Paused', 'Expired')),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_until DATE NOT NULL,
    total_days INT NOT NULL DEFAULT 365,
    price_monthly NUMERIC(10, 2) NOT NULL DEFAULT 49.99,
    auto_renew BOOLEAN NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 3. EXERCISES (Library of gym movements)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL UNIQUE,
    target_muscle TEXT NOT NULL CHECK (target_muscle IN ('Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core', 'Full Body')),
    secondary_muscles TEXT[] DEFAULT '{}',
    equipment TEXT NOT NULL CHECK (equipment IN ('Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight', 'Kettlebell')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    description TEXT NOT NULL,
    instructions TEXT[] NOT NULL DEFAULT '{}',
    sample_image_url TEXT,
    calories_per_hour_estimate INT NOT NULL DEFAULT 400
);

-- ------------------------------------------------------------------------------
-- 4. WORKOUTS (Routines / templates)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    category TEXT NOT NULL,
    target_muscles TEXT[] NOT NULL DEFAULT '{}',
    duration_minutes INT NOT NULL DEFAULT 45,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    estimated_calories INT NOT NULL DEFAULT 320,
    image_url TEXT
);

-- ------------------------------------------------------------------------------
-- 5. WORKOUT_EXERCISES (Bridge table joining Workouts & Exercises)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE RESTRICT,
    order_index INT NOT NULL DEFAULT 1,
    sets INT NOT NULL DEFAULT 3,
    reps INT NOT NULL DEFAULT 10,
    target_weight_kg NUMERIC(6, 2),
    rest_seconds INT DEFAULT 90
);

-- ------------------------------------------------------------------------------
-- 6. WORKOUT_SESSIONS (Logged user workout history)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    workout_id UUID REFERENCES public.workouts(id) ON DELETE SET NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 7. WORKOUT_SETS (Individual sets tracked in a workout session)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE RESTRICT,
    set_number INT NOT NULL,
    reps INT NOT NULL,
    weight_kg NUMERIC(6, 2) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 8. MEASUREMENTS (Body stats history)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg NUMERIC(5, 2) NOT NULL,
    height_cm NUMERIC(5, 1) NOT NULL,
    body_fat_percentage NUMERIC(4, 1) NOT NULL,
    chest_cm NUMERIC(5, 1) NOT NULL,
    waist_cm NUMERIC(5, 1) NOT NULL,
    arms_cm NUMERIC(5, 1) NOT NULL,
    thigh_cm NUMERIC(5, 1) NOT NULL,
    notes TEXT
);

-- ------------------------------------------------------------------------------
-- 9. ANNOUNCEMENTS (Gym-wide broadcasts & updates)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Facility', 'Equipment', 'Classes', 'Schedule', 'Community')),
    is_important BOOLEAN NOT NULL DEFAULT FALSE
);

-- ------------------------------------------------------------------------------
-- 10. PERSONAL_RECORDS (User 1-rep max or top weight records)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.personal_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exercise_name TEXT NOT NULL,
    muscle TEXT NOT NULL,
    record_value NUMERIC(6, 2) NOT NULL,
    unit TEXT NOT NULL DEFAULT 'kg',
    previous_record NUMERIC(6, 2)
);

-- ------------------------------------------------------------------------------
-- 11. GYM_SETTINGS (User preferences)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gym_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    appearance TEXT NOT NULL DEFAULT 'dark' CHECK (appearance IN ('dark', 'light', 'system')),
    workout_reminders BOOLEAN NOT NULL DEFAULT TRUE,
    gym_announcements BOOLEAN NOT NULL DEFAULT TRUE,
    units TEXT NOT NULL DEFAULT 'kg' CHECK (units IN ('kg', 'lbs')),
    language TEXT NOT NULL DEFAULT 'English'
);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Note: Set up for development reading. Authentication policies will be activated
--       in Phase 2 once Supabase Auth (auth.uid()) is enabled.
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for public/shared resources
CREATE POLICY "Allow public read access to exercises" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Allow public read access to workouts" ON public.workouts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to workout_exercises" ON public.workout_exercises FOR SELECT USING (true);
CREATE POLICY "Allow public read access to announcements" ON public.announcements FOR SELECT USING (true);

-- Phase 1 Development fallback: allow read for profiles, memberships, measurements, PRs
CREATE POLICY "Allow read access for member demo" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow read access for membership demo" ON public.memberships FOR SELECT USING (true);
CREATE POLICY "Allow read access for measurements demo" ON public.measurements FOR ALL USING (true);
CREATE POLICY "Allow read access for sessions demo" ON public.workout_sessions FOR ALL USING (true);
CREATE POLICY "Allow read access for sets demo" ON public.workout_sets FOR ALL USING (true);
CREATE POLICY "Allow read access for PR demo" ON public.personal_records FOR ALL USING (true);
CREATE POLICY "Allow read access for settings demo" ON public.gym_settings FOR ALL USING (true);

-- ==============================================================================
-- [FUTURE PHASE 2 AUTH BLUEPRINT - UNCOMMENT WHEN SUPABASE AUTH IS ACTIVATED]
--
-- CREATE POLICY "Users can view and edit own profile"
--   ON public.profiles FOR ALL
--   USING (auth.uid() = id);
--
-- CREATE POLICY "Users can view own membership"
--   ON public.memberships FOR SELECT
--   USING (auth.uid() = profile_id);
--
-- CREATE POLICY "Users can manage own measurements"
--   ON public.measurements FOR ALL
--   USING (auth.uid() = profile_id);
--
-- CREATE POLICY "Users can manage own workout sessions"
--   ON public.workout_sessions FOR ALL
--   USING (auth.uid() = profile_id);
-- ==============================================================================
