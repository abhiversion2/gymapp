import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, User, Mail, Phone, Lock, Eye, EyeOff, Calendar, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { signupSchema, type SignupInput } from '../../utils/validation';
import { useAuth } from '../../auth/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const SignupPage: React.FC = () => {
  const { signUp, resendVerification } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verificationPending, setVerificationPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setAuthError(null);
    setResendStatus(null);
    try {
      const response = await signUp({
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        dateOfBirth: data.dateOfBirth || undefined,
        password: data.password,
      });

      if (response.needsEmailVerification) {
        setRegisteredEmail(data.email);
        setVerificationPending(true);
      } else {
        // Logged in directly
        navigate('/', { replace: true });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create account. Please try again.';
      setAuthError(msg);
    }
  };

  const handleResend = async () => {
    if (!registeredEmail) return;
    try {
      await resendVerification(registeredEmail);
      setResendStatus('Verification email resent! Please check your inbox and spam folder.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend verification email.';
      setResendStatus(msg);
    }
  };

  if (verificationPending) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 transition-colors duration-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[var(--color-card)] py-8 px-6 shadow-xl rounded-2xl border border-[var(--color-border)] sm:px-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text)]">
              Check your email
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
              Account created successfully! We sent a confirmation link to{' '}
              <span className="font-semibold text-[var(--color-text)]">{registeredEmail}</span>.
              Please verify your email to access your ApexFit profile.
            </p>

            {resendStatus && (
              <p className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-medium">
                {resendStatus}
              </p>
            )}

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResend}
              >
                Resend verification email
              </Button>
              <Link to="/login" className="block">
                <Button variant="ghost" className="w-full text-xs">
                  Return to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 mb-4">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Join ApexFit to unlock smart workout tracking and fitness insights
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-card)] py-8 px-6 shadow-xl rounded-2xl border border-[var(--color-border)] sm:px-10">
          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Abhijeet Vishwakarma"
              autoComplete="name"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            {/* Email Address */}
            <Input
              label="Email Address"
              type="email"
              placeholder="abhijeet@example.com"
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Mobile Number */}
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+91 9876543210"
              autoComplete="tel"
              leftIcon={<Phone className="w-4 h-4" />}
              helperText="For profile records and gym member updates"
              error={errors.mobileNumber?.message}
              {...register('mobileNumber')}
            />

            {/* Date of Birth (Optional) */}
            <Input
              label="Date of Birth (Optional)"
              type="date"
              leftIcon={<Calendar className="w-4 h-4" />}
              helperText="Optional for age verification or custom fitness goals"
              error={errors.dateOfBirth?.message}
              {...register('dateOfBirth')}
            />

            {/* Password */}
            <div>
              <Input
                label="Password"
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
                Must contain at least 8 characters, 1 uppercase, 1 lowercase & 1 number
              </p>
            </div>

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
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

            {/* Terms and Privacy Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-amber-500 focus:ring-amber-500/50"
                  {...register('termsAccepted')}
                />
                <span className="text-xs text-[var(--color-muted)] leading-tight">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="font-semibold text-amber-500 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" target="_blank" className="font-semibold text-amber-500 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-xs text-rose-400 font-medium mt-1">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-amber-500 hover:text-amber-400 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
