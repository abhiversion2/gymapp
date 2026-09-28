-- ==============================================================================
-- APEXFIT GYM MANAGEMENT PLATFORM - AUTH & ACCOUNT MANAGEMENT MIGRATION
-- Migration: 20260928000001_auth_schema_and_triggers.sql
-- Description: Connects profiles table directly to auth.users, adds mobile_number & 
--              date_of_birth, configures secure signup trigger, and enforces RLS.
-- ==============================================================================

-- 1. Ensure columns exist on profiles table
ALTER TABLE IF EXISTS public.profiles 
  ADD COLUMN IF NOT EXISTS mobile_number TEXT,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- 2. Ensure foreign key constraint from profiles(id) to auth.users(id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_id_fkey_auth_users'
  ) THEN
    -- In Supabase, auth.users exists in the 'auth' schema
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_id_fkey_auth_users
      FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- Silently handle if foreign key already established or during mock test run
    NULL;
END $$;

-- 3. Automatic Profile Creation Trigger on Supabase Auth Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_full_name TEXT;
  v_mobile TEXT;
  v_dob DATE;
BEGIN
  -- Extract user metadata sent during supabase.auth.signUp()
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  v_mobile := NEW.raw_user_meta_data->>'mobile_number';
  
  BEGIN
    v_dob := (NEW.raw_user_meta_data->>'date_of_birth')::DATE;
  EXCEPTION WHEN OTHERS THEN
    v_dob := NULL;
  END;

  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    mobile_number,
    phone,
    date_of_birth,
    member_since,
    membership_plan,
    status
  )
  VALUES (
    NEW.id,
    v_full_name,
    NEW.email,
    v_mobile,
    v_mobile,
    v_dob,
    CURRENT_DATE,
    'Premium',
    'Active'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    mobile_number = COALESCE(EXCLUDED.mobile_number, public.profiles.mobile_number),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    date_of_birth = COALESCE(EXCLUDED.date_of_birth, public.profiles.date_of_birth),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Enable Row Level Security (RLS) on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Strict User Ownership RLS Policies for Profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
CREATE POLICY "Users can delete their own profile"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- 6. RLS Policies for Related Gym Data
-- Memberships: only user can view their active membership
ALTER TABLE IF EXISTS public.memberships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own membership" ON public.memberships;
CREATE POLICY "Users can view own membership"
  ON public.memberships
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Measurements: user owns their measurements
ALTER TABLE IF EXISTS public.measurements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own measurements" ON public.measurements;
CREATE POLICY "Users can view own measurements"
  ON public.measurements
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- Workout Sessions: user owns their session logs
ALTER TABLE IF EXISTS public.workout_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own workout sessions" ON public.workout_sessions;
CREATE POLICY "Users can manage own workout sessions"
  ON public.workout_sessions
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- Personal Records: user owns their PR records
ALTER TABLE IF EXISTS public.personal_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own personal records" ON public.personal_records;
CREATE POLICY "Users can manage own personal records"
  ON public.personal_records
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- Exercises and Announcements remain publicly viewable by authenticated users
ALTER TABLE IF EXISTS public.exercises ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can read exercises" ON public.exercises;
CREATE POLICY "Authenticated users can read exercises"
  ON public.exercises
  FOR SELECT
  TO authenticated
  USING (true);

ALTER TABLE IF EXISTS public.announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can read announcements" ON public.announcements;
CREATE POLICY "Authenticated users can read announcements"
  ON public.announcements
  FOR SELECT
  TO authenticated
  USING (true);
