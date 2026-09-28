import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Dumbbell, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { resetPasswordSchema, type ResetPasswordInput } from '../../utils/validation';
import * as authService from '../../services/auth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setErrorMessage(null);
    try {
      await authService.updatePassword(data.password);
      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password. Your reset link may have expired.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 mb-4">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Create New Password
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Choose a strong password to secure your fitness account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-card)] py-8 px-6 shadow-xl rounded-2xl border border-[var(--color-border)] sm:px-10">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)]">
                Password Updated!
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Your password has been updated successfully. You can now log in with your new credentials.
              </p>
              <div className="pt-4">
                <Link to="/login" className="block">
                  <Button variant="primary" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <Input
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
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
                  <p className="text-[11px] text-[var(--color-muted)] mt-1 ml-1">
                    At least 8 characters with uppercase, lowercase, and a number
                  </p>
                </div>

                <Input
                  label="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  error={errors.confirmPassword?.message}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  {...register('confirmPassword')}
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Updating Password...' : 'Update Password'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
