import React, { useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AuthContext, type AuthContextType } from './AuthContext';
import type { Profile } from '../types/models';
import type { SignUpParams, SignInParams, AuthResponse } from '../types/auth';
import * as authService from '../services/auth';
import { getStorageItem } from '../utils/storage';
import { mockProfile } from '../data/mockData';

const LOCAL_AUTH_USER_KEY = 'apexfit_auth_user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user profile
  const fetchProfile = useCallback(async (userId: string, currentUser?: User | null) => {
    try {
      const p = await authService.getProfile(userId);
      if (p) {
        // Sync email if user has email
        if (currentUser?.email && p.email !== currentUser.email) {
          p.email = currentUser.email;
        }
        setProfile(p);
      } else if (currentUser) {
        // Fallback profile if none in database yet
        const meta = currentUser.user_metadata || {};
        const fallbackProfile: Profile = {
          id: currentUser.id,
          fullName: meta.full_name || currentUser.email?.split('@')[0] || 'Member',
          email: currentUser.email || 'user@example.com',
          mobileNumber: meta.mobile_number,
          phone: meta.mobile_number,
          dateOfBirth: meta.date_of_birth,
          membershipPlan: 'Premium',
          memberSince: new Date().toISOString().split('T')[0],
          status: 'Active',
          emailVerified: Boolean(currentUser.email_confirmed_at),
        };
        setProfile(fallbackProfile);
      }
    } catch (err) {
      console.error('Failed to load profile in AuthProvider:', err);
    }
  }, []);

  // Initialize session and auth listener
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured()) {
        try {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            if (currentSession?.user) {
              await fetchProfile(currentSession.user.id, currentSession.user);
            }
          }
        } catch (err) {
          console.warn('Supabase getSession error:', err);
        } finally {
          if (mounted) setLoading(false);
        }

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            if (!mounted) return;
            setSession(newSession);
            setUser(newSession?.user ?? null);

            if (newSession?.user) {
              await fetchProfile(newSession.user.id, newSession.user);
            } else {
              setProfile(null);
            }

            if (event === 'SIGNED_OUT') {
              setSession(null);
              setUser(null);
              setProfile(null);
            }
            setLoading(false);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } else {
        // Fallback demo mode when Supabase env vars are not set
        const localUser = getStorageItem<User | null>(LOCAL_AUTH_USER_KEY, null);
        if (localUser) {
          setUser(localUser);
          const p = await authService.getProfile(localUser.id);
          setProfile(p || mockProfile);
        }
        setLoading(false);
      }
    }

    const cleanupPromise = initAuth();

    return () => {
      mounted = false;
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, [fetchProfile]);

  const signUp = async (params: SignUpParams): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authService.signUp(params);
      if (response.user) {
        setUser(response.user);
        setSession(response.session);
        await fetchProfile(response.user.id, response.user);
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (params: SignInParams): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authService.signIn(params);
      if (response.user) {
        setUser(response.user);
        setSession(response.session);
        await fetchProfile(response.user.id, response.user);
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    await authService.resetPasswordForEmail(email);
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    await authService.changePassword(currentPassword, newPassword);
  };

  const updateProfileData = async (updates: Partial<Profile>): Promise<Profile> => {
    if (!user) throw new Error('No user currently authenticated');
    const updated = await authService.updateProfile(user.id, updates);
    setProfile(updated);
    return updated;
  };

  const deleteUserAccount = async (): Promise<void> => {
    if (!user) throw new Error('No user currently authenticated');
    await authService.deleteAccount(user.id);
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resendVerification = async (email: string): Promise<void> => {
    await authService.resendVerificationEmail(email);
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user.id, user);
    }
  };

  const isEmailVerified = Boolean(
    !isSupabaseConfigured() ||
    user?.email_confirmed_at ||
    (user as unknown as { confirmed_at?: string })?.confirmed_at
  );

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: Boolean(user),
    isEmailVerified,
    signUp,
    signIn,
    signOut,
    resetPassword,
    changePassword,
    updateProfileData,
    deleteUserAccount,
    resendVerification,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
