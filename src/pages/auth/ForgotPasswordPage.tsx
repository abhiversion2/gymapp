import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, ArrowLeft, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { forgotPasswordSchema, type ForgotPasswordInput } from '../../utils/validation';
import { useAuth } from '../../auth/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setErrorMessage(null);
    try {
      await resetPassword(data.email);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to send reset instructions.';
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
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Enter your registered email and we&apos;ll send you instructions to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-card)] py-8 px-6 shadow-xl rounded-2xl border border-[var(--color-border)] sm:px-10">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)]">
                Reset Link Sent
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                If an account exists for <span className="font-semibold text-[var(--color-text)]">{getValues('email')}</span>, password reset instructions have been sent. Please check your inbox and spam folder.
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="abhijeet@example.com"
                  autoComplete="email"
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
