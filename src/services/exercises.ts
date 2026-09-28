import { mockExercises } from '../data/mockData';
import type { Exercise, MuscleGroup, EquipmentType, DifficultyLevel } from '../types/models';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export interface ExerciseFilterParams {
  query?: string;
  muscle?: MuscleGroup | 'All';
  equipment?: EquipmentType | 'All';
  difficulty?: DifficultyLevel | 'All';
}

export async function getExercises(): Promise<Exercise[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('exercises').select('*');
      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          name: row.name,
          targetMuscle: row.target_muscle as MuscleGroup,
          secondaryMuscles: (row.secondary_muscles as MuscleGroup[]) || [],
          equipment: row.equipment as EquipmentType,
          difficulty: row.difficulty as DifficultyLevel,
          description: row.description,
          instructions: row.instructions || [],
          sampleImageUrl: row.sample_image_url || '',
          caloriesPerHourEstimate: row.calories_per_hour_estimate || 400,
        }));
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to mock exercises:', err);
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockExercises]), 80);
  });
}

export async function getExerciseById(id: string): Promise<Exercise | null> {
  const all = await getExercises();
  return all.find((e) => e.id === id) || null;
}

export async function filterExercises(params: ExerciseFilterParams): Promise<Exercise[]> {
  const all = await getExercises();
  return all.filter((item) => {
    if (params.query) {
      const q = params.query.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchMuscle = item.targetMuscle.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchMuscle) return false;
    }

    if (params.muscle && params.muscle !== 'All') {
      if (item.targetMuscle !== params.muscle) return false;
    }

    if (params.equipment && params.equipment !== 'All') {
      if (item.equipment !== params.equipment) return false;
    }

    if (params.difficulty && params.difficulty !== 'All') {
      if (item.difficulty !== params.difficulty) return false;
    }

    return true;
  });
}
