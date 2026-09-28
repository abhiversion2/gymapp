-- ==============================================================================
-- APEXFIT GYM MANAGEMENT PLATFORM - SEED MASTER DATA
-- Migration: 20260928000002_seed_gym_data.sql
-- Description: Seeds initial exercises, workouts, and announcements catalog,
--              and adds workout_name column for sessions.
-- ==============================================================================

-- 1. Ensure workout_sessions supports workout_name column
ALTER TABLE IF EXISTS public.workout_sessions 
  ADD COLUMN IF NOT EXISTS workout_name TEXT;

-- 2. Ensure RLS policies allow reading master catalogs
ALTER TABLE IF EXISTS public.exercises ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to exercises" ON public.exercises;
CREATE POLICY "Allow public read access to exercises" ON public.exercises FOR SELECT USING (true);

ALTER TABLE IF EXISTS public.workouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to workouts" ON public.workouts;
CREATE POLICY "Allow public read access to workouts" ON public.workouts FOR SELECT USING (true);

ALTER TABLE IF EXISTS public.workout_exercises ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to workout_exercises" ON public.workout_exercises;
CREATE POLICY "Allow public read access to workout_exercises" ON public.workout_exercises FOR SELECT USING (true);

ALTER TABLE IF EXISTS public.announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to announcements" ON public.announcements;
CREATE POLICY "Allow public read access to announcements" ON public.announcements FOR SELECT USING (true);

-- 3. Seed Gym Exercises Catalog
INSERT INTO public.exercises (name, target_muscle, secondary_muscles, equipment, difficulty, description, instructions, sample_image_url, calories_per_hour_estimate)
VALUES
(
  'Bench Press',
  'Chest',
  ARRAY['Shoulders', 'Arms'],
  'Barbell',
  'Intermediate',
  'Compound upper-body exercise targeting the chest, anterior deltoids, and triceps.',
  ARRAY[
    'Lie flat on the bench with eyes aligned under the barbell.',
    'Grip the bar slightly wider than shoulder-width with wrists straight.',
    'Unrack bar, lower with control to the mid-chest while keeping elbows at a 45-degree angle.',
    'Press explosively back up to lockout without flaring elbows.'
  ],
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
  450
),
(
  'Incline Dumbbell Press',
  'Chest',
  ARRAY['Shoulders', 'Arms'],
  'Dumbbell',
  'Intermediate',
  'Upper-chest focused press emphasizing clavicular pectoral head development.',
  ARRAY[
    'Set bench to a 30 to 45 degree incline.',
    'Hold dumbbells at shoulder height with palms facing forward.',
    'Press upward in an arching motion until dumbbells gently meet above chest.',
    'Lower under control until you feel a deep chest stretch.'
  ],
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
  420
),
(
  'Barbell Back Squat',
  'Legs',
  ARRAY['Core'],
  'Barbell',
  'Intermediate',
  'The king of lower body movements targeting quadriceps, glutes, hamstrings, and core stability.',
  ARRAY[
    'Place bar comfortably across upper traps with shoulder blades retracted.',
    'Stance slightly wider than shoulder-width, toes turned slightly outward.',
    'Inhale deep, brace core, and sit back and down until thighs reach parallel or below.',
    'Drive forcefully through mid-foot to stand back up to starting position.'
  ],
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
  520
),
(
  'Conventional Deadlift',
  'Back',
  ARRAY['Legs', 'Core'],
  'Barbell',
  'Advanced',
  'Full posterior chain compound lift developing raw pull strength, spinal erectors, and hips.',
  ARRAY[
    'Stand with feet hip-width apart, barbell cutting across mid-foot.',
    'Hinge at hips, grip bar outside shins with double-overhand or mixed grip.',
    'Depress lats, take out the slack, keep chest proud and back neutral.',
    'Push the floor away through your heels, extending hips and knees simultaneously.'
  ],
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  560
),
(
  'Pull-up',
  'Back',
  ARRAY['Arms', 'Core'],
  'Bodyweight',
  'Intermediate',
  'Classic vertical pull exercise developing latissimus dorsi width, biceps, and grip strength.',
  ARRAY[
    'Grip bar with overhand grip slightly wider than shoulder width.',
    'Hang with arms fully extended and engage scapular retractors.',
    'Pull your elbows down toward your ribs until chin clears the bar.',
    'Lower under control back to a dead hang.'
  ],
  'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80',
  400
),
(
  'Overhead Barbell Press',
  'Shoulders',
  ARRAY['Arms', 'Core'],
  'Barbell',
  'Intermediate',
  'Foundational vertical pressing exercise building powerful deltoids and shoulder stability.',
  ARRAY[
    'Rack bar at collarbone height, grip with elbows slightly forward.',
    'Brace core and squeeze glutes to establish a rigid foundation.',
    'Press bar in a vertical path, moving head back slightly as bar passes face.',
    'Lock out directly overhead with head neutral.'
  ],
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80',
  430
),
(
  'Bent-over Barbell Row',
  'Back',
  ARRAY['Arms', 'Core'],
  'Barbell',
  'Intermediate',
  'Horizontal pulling compound movement building upper back thickness and rhomboid strength.',
  ARRAY[
    'Hinge forward at roughly 45 degrees with knees slightly bent.',
    'Grip barbell slightly wider than shoulder width with palms pronated.',
    'Pull bar toward lower ribcage by driving elbows behind torso.',
    'Pause briefly at contraction before lowering under control.'
  ],
  'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&auto=format&fit=crop&q=80',
  460
),
(
  'Barbell Bicep Curl',
  'Arms',
  ARRAY['Arms'],
  'Barbell',
  'Beginner',
  'Primary isolation lift for increasing bicep brachii mass and arm flexor strength.',
  ARRAY[
    'Stand upright holding barbell with underhand shoulder-width grip.',
    'Pin elbows tightly to your sides without swaying torso.',
    'Curl weight upward toward shoulders while squeezing biceps.',
    'Lower slowly through full eccentric range of motion.'
  ],
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
  350
),
(
  'Cable Tricep Pushdown',
  'Arms',
  ARRAY['Arms'],
  'Cable',
  'Beginner',
  'Effective triceps isolation targeting the lateral and long heads with constant tension.',
  ARRAY[
    'Attach rope or straight bar to high cable pulley.',
    'Tuck elbows at sides and brace torso with slight forward lean.',
    'Extend elbows downward until arms are completely straight.',
    'Return with control to 90 degrees elbow flexion.'
  ],
  'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=600&auto=format&fit=crop&q=80',
  340
),
(
  '45° Incline Leg Press',
  'Legs',
  ARRAY['Legs'],
  'Machine',
  'Beginner',
  'High-load quadriceps and glute builder with reduced lower spinal compression.',
  ARRAY[
    'Sit deep into machine with lower back flat against pad.',
    'Place feet shoulder-width apart in center of sled platform.',
    'Release safety catches and lower sled until knees form 90 degrees.',
    'Drive platform up powerfully without hyper-extending knees.'
  ],
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  480
),
(
  'Hanging Leg Raise',
  'Core',
  ARRAY['Core'],
  'Bodyweight',
  'Advanced',
  'Demanding abdominal exercise emphasizing the lower rectus abdominis and hip flexors.',
  ARRAY[
    'Hang from pull-up bar with arms straight and grip secure.',
    'Without swinging, posteriorly tilt pelvis and raise legs to horizontal.',
    'Squeeze abs hard at top position.',
    'Lower legs smoothly back to starting hang.'
  ],
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
  380
),
(
  'Dumbbell Lateral Raise',
  'Shoulders',
  ARRAY['Shoulders'],
  'Dumbbell',
  'Beginner',
  'Premier medial deltoid builder essential for developing shoulder width.',
  ARRAY[
    'Stand upright holding dumbbells at your sides with neutral grip.',
    'Raise arms outward until elbows reach parallel with shoulders.',
    'Lead slightly with elbows, keeping pinkies elevated.',
    'Lower weights slowly under strict control.'
  ],
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80',
  320
),
(
  'Romanian Deadlift',
  'Legs',
  ARRAY['Back', 'Core'],
  'Barbell',
  'Intermediate',
  'Hamstring and glute hypertrophy staple emphasizing loaded eccentric stretching.',
  ARRAY[
    'Stand tall holding barbell with shoulder-width overhand grip.',
    'Unlock knees slightly, then push hips backward while tracing bar down legs.',
    'Descend until you feel a deep hamstring stretch around mid-shin.',
    'Contract glutes and hamstrings to drive hips forward to standing.'
  ],
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  490
),
(
  'Plank',
  'Core',
  ARRAY['Core', 'Shoulders'],
  'Bodyweight',
  'Beginner',
  'Isometric core endurance exercise strengthening the transverse abdominis and spine stabilizers.',
  ARRAY[
    'Place forearms on floor with elbows directly under shoulders.',
    'Extend legs behind you, balancing on toes with body forming a straight line.',
    'Engage core, squeeze glutes, and prevent hips from sagging.',
    'Breathe steadily while holding position for time.'
  ],
  'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80',
  300
)
ON CONFLICT (name) DO NOTHING;

-- 4. Seed Workout Routines
INSERT INTO public.workouts (name, subtitle, description, category, target_muscles, duration_minutes, difficulty, estimated_calories, image_url)
VALUES
(
  'Push Hypertrophy Focus',
  'Chest, Front Delts & Triceps',
  'A high-volume hypertrophy routine designed to build upper body pressing power and muscular definition across the chest and triceps.',
  'Hypertrophy',
  ARRAY['Chest', 'Shoulders', 'Arms'],
  55,
  'Intermediate',
  460,
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80'
),
(
  'Pull Strength & Density',
  'Upper Back, Lats & Biceps',
  'Heavy compound pull workout centered around deadlifts, weighted chin-ups, and horizontal rows for maximum back thickness.',
  'Strength',
  ARRAY['Back', 'Arms'],
  50,
  'Advanced',
  480,
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80'
),
(
  'Lower Body Destroyer',
  'Quads, Hamstrings & Glutes',
  'Complete lower body development session featuring barbell squats, heavy leg presses, and high-tension hamstring movements.',
  'Hypertrophy',
  ARRAY['Legs', 'Core'],
  60,
  'Intermediate',
  530,
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80'
),
(
  'Full Body Athletic Conditioning',
  'Total Body Conditioning',
  'A high-energy functional strength circuit blending compound lifts with core and rotational stamina exercises.',
  'Conditioning',
  ARRAY['Full Body', 'Core'],
  45,
  'Beginner',
  420,
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
);

-- 5. Seed Gym Announcements
INSERT INTO public.announcements (title, description, category, is_important)
VALUES
(
  'New Olympic Lifting Platforms Installed',
  'We have added 4 brand new Eleiko Olympic lifting platforms with calibrated bumper plates in Zone 3.',
  'Equipment',
  TRUE
),
(
  'Saturday Morning Power Yoga Sessions',
  'Starting this weekend, complimentary 60-minute Vinyasa Yoga classes will run every Saturday at 8:00 AM.',
  'Classes',
  FALSE
),
(
  'Holiday Operating Hours Announcement',
  'The facility will remain open 24/7 for digital key holders; staffed front desk hours will operate 7 AM - 6 PM.',
  'Facility',
  FALSE
),
(
  'Steam Room & Spa Maintenance Schedule',
  'Routine maintenance on the spa facilities will take place this Thursday from 1:00 PM to 4:00 PM.',
  'Schedule',
  FALSE
);
