import { useState, useEffect, useCallback } from 'react';
import type { Profile, MembershipDetails, UserPreferences } from '../types/models';
import {
  getProfile,
  updateProfile,
  getMembership,
  getUserPreferences,
  updateUserPreferences,
} from '../services/members';

export function useMember() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<MembershipDetails | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prof, mem, prefs] = await Promise.all([
        getProfile(),
        getMembership(),
        getUserPreferences(),
      ]);
      setProfile(prof);
      setMembership(mem);
      setPreferences(prefs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateProfile = async (updates: Partial<Profile>) => {
    const updated = await updateProfile(updates);
    setProfile(updated);
    return updated;
  };

  const handleUpdatePreferences = async (updates: Partial<UserPreferences>) => {
    const updated = await updateUserPreferences(updates);
    setPreferences(updated);
    return updated;
  };

  return {
    profile,
    membership,
    preferences,
    loading,
    handleUpdateProfile,
    handleUpdatePreferences,
    refreshMember: loadData,
  };
}
