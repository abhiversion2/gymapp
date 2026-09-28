import { useState, useEffect, useCallback } from 'react';
import type {
  Workout,
  WorkoutTrackingExercise,
  WorkoutSessionSummary,
  RecentWorkoutActivity,
} from '../types/models';
import {
  getWorkouts,
  getTodaysWorkout,
  saveWorkoutSession,
  getRecentWorkouts,
} from '../services/workouts';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [todaysWorkout, setTodaysWorkout] = useState<Workout | null>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<RecentWorkoutActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTracking, setActiveTracking] = useState<{
    workout: Workout;
    exercises: WorkoutTrackingExercise[];
    startTime: number;
  } | null>(null);
  const [completedSummary, setCompletedSummary] = useState<WorkoutSessionSummary | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [list, today, recents] = await Promise.all([
        getWorkouts(),
        getTodaysWorkout(),
        getRecentWorkouts(),
      ]);
      setWorkouts(list);
      setTodaysWorkout(today);
      setRecentWorkouts(recents);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const startTracking = (workout: Workout) => {
    const exercises: WorkoutTrackingExercise[] = workout.exercises.map((item) => ({
      exerciseId: item.exerciseId,
      exerciseName: item.exercise.name,
      muscle: item.exercise.targetMuscle,
      sets: Array.from({ length: item.sets }, (_, idx) => ({
        id: `set_${item.exerciseId}_${idx + 1}`,
        setNumber: idx + 1,
        reps: item.reps,
        weightKg: item.targetWeightKg || 40,
        completed: false,
      })),
    }));

    setActiveTracking({
      workout,
      exercises,
      startTime: Date.now(),
    });
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: 'reps' | 'weightKg' | 'completed',
    value: number | boolean
  ) => {
    if (!activeTracking) return;

    setActiveTracking((prev) => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const targetExercise = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...targetExercise.sets];

      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        [field]: value,
      };

      targetExercise.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetExercise;

      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };

  const addSet = (exerciseIndex: number) => {
    if (!activeTracking) return;
    setActiveTracking((prev) => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const targetExercise = { ...updatedExercises[exerciseIndex] };
      const currentSets = targetExercise.sets;
      const lastSet = currentSets[currentSets.length - 1];

      const newSet = {
        id: `set_${targetExercise.exerciseId}_${currentSets.length + 1}`,
        setNumber: currentSets.length + 1,
        reps: lastSet ? lastSet.reps : 10,
        weightKg: lastSet ? lastSet.weightKg : 50,
        completed: false,
      };

      targetExercise.sets = [...currentSets, newSet];
      updatedExercises[exerciseIndex] = targetExercise;

      return { ...prev, exercises: updatedExercises };
    });
  };

  const cancelTracking = () => {
    setActiveTracking(null);
  };

  const completeWorkout = async (): Promise<WorkoutSessionSummary | null> => {
    if (!activeTracking) return null;

    const durationMinutes = Math.max(
      1,
      Math.round((Date.now() - activeTracking.startTime) / 60000) || activeTracking.workout.durationMinutes
    );

    let completedSetsCount = 0;
    let completedExercisesCount = 0;

    activeTracking.exercises.forEach((ex) => {
      const anyDone = ex.sets.some((s) => s.completed);
      if (anyDone) completedExercisesCount += 1;
      completedSetsCount += ex.sets.filter((s) => s.completed).length;
    });

    // Approximate calories burned
    const caloriesBurned = Math.round(
      (activeTracking.workout.estimatedCalories / activeTracking.workout.durationMinutes) *
        durationMinutes
    );

    const summary: WorkoutSessionSummary = {
      id: `sess_${Date.now()}`,
      workoutId: activeTracking.workout.id,
      workoutName: activeTracking.workout.name,
      durationMinutes,
      caloriesBurned: caloriesBurned || activeTracking.workout.estimatedCalories,
      exercisesCompletedCount: completedExercisesCount || activeTracking.exercises.length,
      totalSetsCompleted: completedSetsCount || activeTracking.exercises.length * 3,
      date: new Date().toISOString(),
    };

    await saveWorkoutSession(summary);
    setCompletedSummary(summary);
    setActiveTracking(null);

    // Refresh recents
    const recents = await getRecentWorkouts();
    setRecentWorkouts(recents);

    return summary;
  };

  const dismissCompletedSummary = () => {
    setCompletedSummary(null);
  };

  return {
    workouts,
    todaysWorkout,
    recentWorkouts,
    loading,
    activeTracking,
    completedSummary,
    startTracking,
    updateSet,
    addSet,
    cancelTracking,
    completeWorkout,
    dismissCompletedSummary,
    refreshWorkouts: loadData,
  };
}
