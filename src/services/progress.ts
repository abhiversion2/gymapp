import { mockPersonalRecords, mockDashboardMetrics } from '../data/mockData';
import type { PersonalRecord } from '../types/models';
import { getMeasurements } from './measurements';

export async function getPersonalRecords(): Promise<PersonalRecord[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockPersonalRecords]), 50);
  });
}

export async function getWeightHistory() {
  const measurements = await getMeasurements();
  return measurements
    .slice()
    .reverse()
    .map((m) => {
      const d = new Date(m.date);
      const monthName = d.toLocaleString('en-US', { month: 'short' });
      return {
        date: m.date,
        month: monthName,
        weightKg: m.weightKg,
        bodyFat: m.bodyFatPercentage,
      };
    });
}

export async function getWorkoutMetrics() {
  return {
    totalWorkouts: mockDashboardMetrics.totalWorkouts,
    thisMonth: 8,
    avgDurationMinutes: 48,
    currentStreakDays: mockDashboardMetrics.workoutStreakDays,
    caloriesBurnedTotal: mockDashboardMetrics.caloriesBurned,
  };
}

export async function getWeeklyCaloriesAndVolume() {
  return [
    { day: 'Mon', workouts: 1, calories: 340, minutes: 45 },
    { day: 'Tue', workouts: 1, calories: 360, minutes: 50 },
    { day: 'Wed', workouts: 0, calories: 0, minutes: 0 },
    { day: 'Thu', workouts: 1, calories: 420, minutes: 55 },
    { day: 'Fri', workouts: 1, calories: 320, minutes: 45 },
    { day: 'Sat', workouts: 0, calories: 0, minutes: 0 },
    { day: 'Sun', workouts: 0, calories: 0, minutes: 0 },
  ];
}
