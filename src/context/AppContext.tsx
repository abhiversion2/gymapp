import React, { createContext, useContext } from 'react';
import { useMember } from '../hooks/useMember';
import { useWorkouts } from '../hooks/useWorkouts';
import { useToast, type ToastItem } from '../hooks/useToast';
import { useTheme, type ThemeMode } from '../hooks/useTheme';
import type {
  Profile,
  MembershipDetails,
  UserPreferences,
  Workout,
  WorkoutTrackingExercise,
  WorkoutSessionSummary,
} from '../types/models';

interface AppContextValue {
  // Member & Membership
  profile: Profile | null;
  membership: MembershipDetails | null;
  preferences: UserPreferences | null;
  handleUpdateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  handleUpdatePreferences: (updates: Partial<UserPreferences>) => Promise<UserPreferences>;

  // Workouts & Active Tracking
  workouts: Workout[];
  todaysWorkout: Workout | null;
  activeTracking: {
    workout: Workout;
    exercises: WorkoutTrackingExercise[];
    startTime: number;
  } | null;
  completedSummary: WorkoutSessionSummary | null;
  startTracking: (workout: Workout) => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: 'reps' | 'weightKg' | 'completed',
    value: number | boolean
  ) => void;
  addSet: (exerciseIndex: number) => void;
  cancelTracking: () => void;
  completeWorkout: () => Promise<WorkoutSessionSummary | null>;
  dismissCompletedSummary: () => void;

  // Theme & Toasts
  theme: ThemeMode;
  changeTheme: (theme: ThemeMode) => Promise<void>;
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const memberHook = useMember();
  const workoutsHook = useWorkouts();
  const toastHook = useToast();
  const themeHook = useTheme();

  const handleStartWorkout = (w: Workout) => {
    workoutsHook.startTracking(w);
    toastHook.addToast({
      title: `Workout Started: ${w.name}`,
      message: `${w.exercisesCount} exercises ready to log. Give it your all!`,
      type: 'info',
    });
  };

  const handleCompleteWorkout = async () => {
    const summary = await workoutsHook.completeWorkout();
    if (summary) {
      toastHook.addToast({
        title: 'Workout Logged Successfully 🎉',
        message: `${summary.caloriesBurned} kcal burned over ${summary.durationMinutes} minutes!`,
        type: 'success',
      });
    }
    return summary;
  };

  const value: AppContextValue = {
    profile: memberHook.profile,
    membership: memberHook.membership,
    preferences: memberHook.preferences,
    handleUpdateProfile: memberHook.handleUpdateProfile,
    handleUpdatePreferences: memberHook.handleUpdatePreferences,

    workouts: workoutsHook.workouts,
    todaysWorkout: workoutsHook.todaysWorkout,
    activeTracking: workoutsHook.activeTracking,
    completedSummary: workoutsHook.completedSummary,
    startTracking: handleStartWorkout,
    updateSet: workoutsHook.updateSet,
    addSet: workoutsHook.addSet,
    cancelTracking: workoutsHook.cancelTracking,
    completeWorkout: handleCompleteWorkout,
    dismissCompletedSummary: workoutsHook.dismissCompletedSummary,

    theme: themeHook.theme,
    changeTheme: themeHook.changeTheme,
    toasts: toastHook.toasts,
    addToast: toastHook.addToast,
    removeToast: toastHook.removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
