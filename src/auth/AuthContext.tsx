import { createContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '../types/models';
import type { SignUpParams, SignInParams, AuthResponse } from '../types/auth';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  signUp: (params: SignUpParams) => Promise<AuthResponse>;
  signIn: (params: SignInParams) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfileData: (updates: Partial<Profile>) => Promise<Profile>;
  deleteUserAccount: () => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
