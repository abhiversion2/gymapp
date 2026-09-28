import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from './models';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
}

export interface SignUpParams {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  dateOfBirth?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  needsEmailVerification?: boolean;
}
