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
      await supabase.from('workout_sessions').insert({
        workout_id: session.workoutId,
        duration_minutes: session.durationMinutes,
        calories_burned: session.caloriesBurned,
        completed: true,
      });
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
