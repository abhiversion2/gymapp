export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Legs'
  | 'Arms'
  | 'Core'
  | 'Full Body';

export type EquipmentType =
  | 'Barbell'
  | 'Dumbbell'
  | 'Machine'
  | 'Cable'
  | 'Bodyweight'
  | 'Kettlebell';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type MembershipPlan = 'Basic' | 'Standard' | 'Premium' | 'VIP';

export type MembershipStatus = 'Active' | 'Paused' | 'Expired';

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  memberSince: string;
  membershipPlan: MembershipPlan;
  status: MembershipStatus;
  emailVerified?: boolean;
}

export interface MembershipDetails {
  id: string;
  memberId: string;
  planName: MembershipPlan;
  status: MembershipStatus;
  startDate: string;
  validUntil: string;
  totalDays: number;
  daysRemaining: number;
  progressPercent: number;
  priceMonthly: number;
  autoRenew: boolean;
  perks: string[];
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: MuscleGroup;
  secondaryMuscles?: string[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  description: string;
  instructions: string[];
  sampleImageUrl: string;
  caloriesPerHourEstimate: number;
}

export interface WorkoutExerciseItem {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  targetWeightKg?: number;
  restSeconds?: number;
}

export interface Workout {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  targetMuscles: MuscleGroup[];
  durationMinutes: number;
  exercisesCount: number;
  difficulty: DifficultyLevel;
  estimatedCalories: number;
  imageUrl: string;
  exercises: WorkoutExerciseItem[];
}

export interface WorkoutTrackingSet {
  id: string;
  setNumber: number;
  reps: number;
  weightKg: number;
  completed: boolean;
}

export interface WorkoutTrackingExercise {
  exerciseId: string;
  exerciseName: string;
  muscle: MuscleGroup;
  sets: WorkoutTrackingSet[];
}

export interface WorkoutSessionSummary {
  id: string;
  workoutId: string;
  workoutName: string;
  durationMinutes: number;
  caloriesBurned: number;
  exercisesCompletedCount: number;
  totalSetsCompleted: number;
  date: string;
}

export interface WeeklyActivityDay {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dateStr: string;
  completed: boolean;
  workoutName?: string;
  isToday?: boolean;
}

export interface RecentWorkoutActivity {
  id: string;
  workoutName: string;
  category: string;
  relativeTime: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  muscle: MuscleGroup;
  recordValue: number;
  unit: 'kg' | 'lbs';
  date: string;
  previousRecord?: number;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  heightCm: number;
  bodyFatPercentage: number;
  chestCm: number;
  waistCm: number;
  armsCm: number;
  thighCm: number;
  notes?: string;
}

export type AnnouncementCategory = 'Facility' | 'Equipment' | 'Classes' | 'Schedule' | 'Community';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: AnnouncementCategory;
  isImportant?: boolean;
  read?: boolean;
}

export interface UserPreferences {
  appearance: 'dark' | 'light' | 'system';
  notifications: {
    workoutReminders: boolean;
    gymAnnouncements: boolean;
  };
  units: 'kg' | 'lbs';
  language: 'English' | 'Spanish' | 'French' | 'German';
}

export interface DashboardMetrics {
  totalWorkouts: number;
  caloriesBurned: number;
  currentWeightKg: number;
  workoutStreakDays: number;
  workoutsThisWeekCount: number;
  weeklyActivity: WeeklyActivityDay[];
  recentActivities: RecentWorkoutActivity[];
}
