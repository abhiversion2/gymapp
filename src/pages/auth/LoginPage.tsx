import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { loginSchema, type LoginInput } from '../../utils/validation';
import { useAuth } from '../../auth/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const LoginPage: React.FC = () => {
  const { signIn, signInDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Retrieve redirect parameter if user came from a protected route
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setAuthError(null);
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid login credentials';
      setAuthError(msg);
    }
  };

  const handleDemoLogin = async () => {
    setAuthError(null);
    setValue('email', 'abhijeet@example.com');
    setValue('password', 'Fitness@2026');
    try {
      await signInDemo();
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to sign in with demo account';
      setAuthError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo and Brand */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 mb-4">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Sign in to your ApexFit account to track workouts & milestones
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-card)] py-8 px-6 shadow-xl rounded-2xl border border-[var(--color-border)] sm:px-10">
          {/* Error notification */}
          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="abhijeet@example.com"
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[var(--color-text)] opacity-90 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  error={errors.password?.message}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  {...register('password')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="secondary"
              className="w-full text-xs"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
            >
              ⚡ Instant Demo Login
            </Button>
            <p className="text-[11px] text-center text-[var(--color-muted)] mt-2">
              Explore the full app dashboard and workout tracking instantly
            </p>
          </div>

          {/* Switch to Signup */}
          <div className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-amber-500 hover:text-amber-400 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
