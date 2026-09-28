import { mockProfile, mockMembership, mockPreferences } from '../data/mockData';
import type { Profile, MembershipDetails, UserPreferences } from '../types/models';
import { getStorageItem, setStorageItem } from '../utils/storage';

const PROFILE_KEY = 'apexfit_profile';
const PREFERENCES_KEY = 'apexfit_preferences';

export async function getProfile(): Promise<Profile> {
  const profile = getStorageItem<Profile>(PROFILE_KEY, mockProfile);
  return new Promise((resolve) => {
    setTimeout(() => resolve(profile), 50);
  });
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const current = await getProfile();
  const updated = { ...current, ...data };
  setStorageItem(PROFILE_KEY, updated);
  return updated;
}

export async function getMembership(): Promise<MembershipDetails> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...mockMembership }), 50);
  });
}

export async function getUserPreferences(): Promise<UserPreferences> {
  const prefs = getStorageItem<UserPreferences>(PREFERENCES_KEY, mockPreferences);
  return new Promise((resolve) => {
    setTimeout(() => resolve(prefs), 30);
  });
}

export async function updateUserPreferences(
  updates: Partial<UserPreferences>
): Promise<UserPreferences> {
  const current = await getUserPreferences();
  const updated = {
    ...current,
    ...updates,
    notifications: {
      ...current.notifications,
      ...(updates.notifications || {}),
    },
  };
  setStorageItem(PREFERENCES_KEY, updated);
  return updated;
}
