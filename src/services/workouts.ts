import { mockWorkouts, mockDashboardMetrics } from '../data/mockData';
import type { Workout, WorkoutSessionSummary, RecentWorkoutActivity } from '../types/models';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { getStorageItem, setStorageItem } from '../utils/storage';

const WORKOUT_SESSIONS_STORAGE_KEY = 'apexfit_workout_sessions';

export async function getWorkouts(): Promise<Workout[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*, workout_exercises(*, exercises(*))');
      if (!error && data && data.length > 0) {
        // Map database row to domain Workout model
        return data as unknown as Workout[];
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to mock workouts:', err);
    }
  }

  // Simulated async network delay for realism
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockWorkouts]), 100);
  });
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const all = await getWorkouts();
  return all.find((w) => w.id === id) || null;
}

export async function getTodaysWorkout(): Promise<Workout> {
  const all = await getWorkouts();
  return all[0] || mockWorkouts[0];
}

export async function saveWorkoutSession(session: WorkoutSessionSummary): Promise<WorkoutSessionSummary> {
  if (isSupabaseConfigured()) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(session.workoutId);
        await supabase.from('workout_sessions').insert({
          profile_id: user.id,
          workout_id: isUUID ? session.workoutId : null,
          workout_name: session.workoutName,
          duration_minutes: session.durationMinutes,
          calories_burned: session.caloriesBurned,
          completed: true,
        });
      }
    } catch (err) {
      console.warn('Supabase session save failed, caching locally:', err);
    }
  }

  const existing = getStorageItem<WorkoutSessionSummary[]>(WORKOUT_SESSIONS_STORAGE_KEY, []);
  const updated = [session, ...existing];
  setStorageItem(WORKOUT_SESSIONS_STORAGE_KEY, updated);

  return session;
}

export async function getRecentWorkouts(): Promise<RecentWorkoutActivity[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          workoutName: item.workout_name || 'Logged Workout',
          category: 'Logged Session',
          relativeTime: new Date(item.created_at).toLocaleDateString(),
          durationMinutes: item.duration_minutes,
          caloriesBurned: item.calories_burned,
          date: item.created_at.split('T')[0],
        }));
      }
    } catch (err) {
      console.warn('Failed querying remote workout_sessions:', err);
    }
  }

  const logged = getStorageItem<WorkoutSessionSummary[]>(WORKOUT_SESSIONS_STORAGE_KEY, []);

  const loggedActivities: RecentWorkoutActivity[] = logged.map((l) => ({
    id: l.id,
    workoutName: l.workoutName,
    category: 'Logged Session',
    relativeTime: 'Just now',
    durationMinutes: l.durationMinutes,
    caloriesBurned: l.caloriesBurned,
    date: l.date,
  }));

  return [...loggedActivities, ...mockDashboardMetrics.recentActivities];
}
