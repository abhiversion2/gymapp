import { mockMeasurements } from '../data/mockData';
import type { BodyMeasurement } from '../types/models';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { getStorageItem, setStorageItem } from '../utils/storage';

const MEASUREMENTS_STORAGE_KEY = 'apexfit_user_measurements';

export async function getMeasurements(): Promise<BodyMeasurement[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          date: row.date,
          weightKg: Number(row.weight_kg),
          heightCm: Number(row.height_cm),
          bodyFatPercentage: Number(row.body_fat_percentage),
          chestCm: Number(row.chest_cm),
          waistCm: Number(row.waist_cm),
          armsCm: Number(row.arms_cm),
          thighCm: Number(row.thigh_cm),
          notes: row.notes || undefined,
        }));
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to local storage:', err);
    }
  }

  const stored = getStorageItem<BodyMeasurement[]>(MEASUREMENTS_STORAGE_KEY, mockMeasurements);
  return new Promise((resolve) => {
    setTimeout(() => resolve([...stored]), 60);
  });
}

export async function getLatestMeasurement(): Promise<BodyMeasurement> {
  const all = await getMeasurements();
  return all[0] || mockMeasurements[0];
}

export async function addMeasurement(
  input: Omit<BodyMeasurement, 'id'>
): Promise<BodyMeasurement> {
  const newRecord: BodyMeasurement = {
    ...input,
    id: `meas_${Date.now()}`,
  };

  if (isSupabaseConfigured()) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('measurements').insert({
          profile_id: user.id,
          date: input.date,
          weight_kg: input.weightKg,
          height_cm: input.heightCm,
          body_fat_percentage: input.bodyFatPercentage,
          chest_cm: input.chestCm,
          waist_cm: input.waistCm,
          arms_cm: input.armsCm,
          thigh_cm: input.thighCm,
          notes: input.notes || null,
        });
      }
    } catch (err) {
      console.warn('Supabase insert failed, saving locally:', err);
    }
  }

  const existing = getStorageItem<BodyMeasurement[]>(MEASUREMENTS_STORAGE_KEY, mockMeasurements);
  const updated = [newRecord, ...existing].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  setStorageItem(MEASUREMENTS_STORAGE_KEY, updated);

  return newRecord;
}
