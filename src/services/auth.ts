import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { SignUpParams, SignInParams, AuthResponse } from '../types/auth';
import type { Profile } from '../types/models';
import { mockProfile } from '../data/mockData';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

const LOCAL_AUTH_USER_KEY = 'apexfit_auth_user';
const LOCAL_PROFILE_KEY = 'apexfit_profile';

export function formatAuthError(error: unknown): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message)
      : String(error);

  const lower = message.toLowerCase();

  if (lower.includes('user already registered') || lower.includes('email already in use')) {
    return 'This email address is already registered. Try logging in instead.';
  }
  if (lower.includes('invalid login credentials') || lower.includes('invalid credentials')) {
    return 'Invalid email or password. Please verify your details.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Your email address has not been verified yet. Please check your inbox for the confirmation link.';
  }
  if (lower.includes('password should be at least')) {
    return 'Password is too weak. It must be at least 8 characters with uppercase, lowercase, and numbers.';
  }
  if (lower.includes('over_email_send_rate_limit') || lower.includes('rate limit')) {
    return 'Too many requests. Please wait a moment before trying again.';
  }
  if (lower.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (lower.includes('network') || lower.includes('failed to fetch')) {
    return 'Unable to reach authentication server. Please check your network connection.';
  }

  return message;
}

export async function signUp(params: SignUpParams): Promise<AuthResponse> {
  const { fullName, email, mobileNumber, password, dateOfBirth } = params;

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          mobile_number: mobileNumber,
          date_of_birth: dateOfBirth || null,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      throw new Error(formatAuthError(error));
    }

    const user = data.user;
    const session = data.session;
    const needsEmailVerification = Boolean(user && !session);

    // If user was created, ensure profile record exists
    if (user) {
      try {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: fullName,
          email,
          mobile_number: mobileNumber,
          date_of_birth: dateOfBirth || null,
          membership_plan: 'Premium',
          status: 'Active',
        });
      } catch (upsertErr) {
        console.warn('Profile upsert fallback:', upsertErr);
      }
    }

    return {
      user,
      session,
      needsEmailVerification,
    };
  }

  // Local offline fallback mode for testing without live Supabase
  const fakeUserId = `usr_local_${Date.now()}`;
  const localProfile: Profile = {
    id: fakeUserId,
    fullName,
    email,
    mobileNumber,
    phone: mobileNumber,
    dateOfBirth,
    avatarUrl: undefined,
    memberSince: new Date().toISOString().split('T')[0],
    membershipPlan: 'Premium',
    status: 'Active',
    emailVerified: true,
  };

  setStorageItem(LOCAL_AUTH_USER_KEY, { id: fakeUserId, email });
  setStorageItem(LOCAL_PROFILE_KEY, localProfile);

  return {
    user: { id: fakeUserId, email } as unknown as import('@supabase/supabase-js').User,
    session: { access_token: 'demo_token' } as unknown as import('@supabase/supabase-js').Session,
    needsEmailVerification: false,
  };
}

export async function signIn(params: SignInParams): Promise<AuthResponse> {
  const { email, password } = params;

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(formatAuthError(error));
    }

    return {
      user: data.user,
      session: data.session,
    };
  }

  // Local fallback
  const localProfile = getStorageItem<Profile>(LOCAL_PROFILE_KEY, {
    ...mockProfile,
    email,
  });

  const fakeUser = { id: localProfile.id, email } as import('@supabase/supabase-js').User;
  setStorageItem(LOCAL_AUTH_USER_KEY, fakeUser);

  return {
    user: fakeUser,
    session: { access_token: 'demo_token' } as unknown as import('@supabase/supabase-js').Session,
  };
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut error:', err);
    }
  }

  removeStorageItem(LOCAL_AUTH_USER_KEY);
}

export async function resetPasswordForEmail(email: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new Error(formatAuthError(error));
    }
    return;
  }

  // Local fallback simulation
  return new Promise((resolve) => setTimeout(resolve, 300));
}

export async function updatePassword(newPassword: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(formatAuthError(error));
    }
    return;
  }

  return new Promise((resolve) => setTimeout(resolve, 300));
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  if (isSupabaseConfigured()) {
    // 1. Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      throw new Error('No authenticated user session found.');
    }

    // 2. Re-authenticate with current password to verify ownership
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInErr) {
      throw new Error('Current password is incorrect.');
    }

    // 3. Update password
    const { error: updateErr } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateErr) {
      throw new Error(formatAuthError(updateErr));
    }
    return;
  }

  return new Promise((resolve) => setTimeout(resolve, 300));
}

export async function resendVerificationEmail(email: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      throw new Error(formatAuthError(error));
    }
    return;
  }

  return new Promise((resolve) => setTimeout(resolve, 300));
}

export async function getProfile(userId: string): Promise<Profile | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          fullName: data.full_name,
          email: data.email,
          phone: data.phone || data.mobile_number || undefined,
          mobileNumber: data.mobile_number || data.phone || undefined,
          dateOfBirth: data.date_of_birth || undefined,
          avatarUrl: data.avatar_url || undefined,
          memberSince: data.member_since || '2026-01-10',
          membershipPlan: (data.membership_plan as Profile['membershipPlan']) || 'Premium',
          status: (data.status as Profile['status']) || 'Active',
          emailVerified: true,
        };
      }
    } catch (err) {
      console.warn('Failed fetching Supabase profile, falling back:', err);
    }
  }

  const stored = getStorageItem<Profile>(LOCAL_PROFILE_KEY, mockProfile);
  return stored;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<Profile> {
  if (isSupabaseConfigured()) {
    try {
      const payload: Record<string, unknown> = {};
      if (updates.fullName !== undefined) payload.full_name = updates.fullName;
      if (updates.mobileNumber !== undefined) payload.mobile_number = updates.mobileNumber;
      if (updates.phone !== undefined) payload.phone = updates.phone;
      if (updates.dateOfBirth !== undefined) payload.date_of_birth = updates.dateOfBirth;
      if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;
      payload.updated_at = new Date().toISOString();

      await supabase.from('profiles').update(payload).eq('id', userId);

      // If email is changing, trigger Supabase secure email change flow
      if (updates.email) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && user.email !== updates.email) {
          await supabase.auth.updateUser({ email: updates.email });
        }
      }
    } catch (err) {
      console.warn('Supabase profile update warning:', err);
    }
  }

  const current = getStorageItem<Profile>(LOCAL_PROFILE_KEY, mockProfile);
  const updated = { ...current, ...updates };
  setStorageItem(LOCAL_PROFILE_KEY, updated);
  return updated;
}

export async function deleteAccount(userId: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      // 1. Delete user row in profiles (cascades or cleans up user data via RLS)
      await supabase.from('profiles').delete().eq('id', userId);
      // 2. Sign out
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Account deletion cleanup warning:', err);
    }
  }

  removeStorageItem(LOCAL_AUTH_USER_KEY);
  removeStorageItem(LOCAL_PROFILE_KEY);
}
