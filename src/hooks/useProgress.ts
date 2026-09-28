import { useState, useEffect, useCallback } from 'react';
import type { PersonalRecord } from '../types/models';
import {
  getPersonalRecords,
  getWeightHistory,
  getWorkoutMetrics,
  getWeeklyCaloriesAndVolume,
} from '../services/progress';

export function useProgress() {
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([]);
  const [weightHistory, setWeightHistory] = useState<
    { date: string; month: string; weightKg: number; bodyFat: number }[]
  >([]);
  const [workoutMetrics, setWorkoutMetrics] = useState<{
    totalWorkouts: number;
    thisMonth: number;
    avgDurationMinutes: number;
    currentStreakDays: number;
    caloriesBurnedTotal: number;
  }>({
    totalWorkouts: 24,
    thisMonth: 8,
    avgDurationMinutes: 48,
    currentStreakDays: 7,
    caloriesBurnedTotal: 8450,
  });
  const [weeklyVolume, setWeeklyVolume] = useState<
    { day: string; workouts: number; calories: number; minutes: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prs, weights, metrics, vol] = await Promise.all([
        getPersonalRecords(),
        getWeightHistory(),
        getWorkoutMetrics(),
        getWeeklyCaloriesAndVolume(),
      ]);
      setPersonalRecords(prs);
      setWeightHistory(weights);
      setWorkoutMetrics(metrics);
      setWeeklyVolume(vol);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    personalRecords,
    weightHistory,
    workoutMetrics,
    weeklyVolume,
    loading,
    refreshProgress: loadData,
  };
}
