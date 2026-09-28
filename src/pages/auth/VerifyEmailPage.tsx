import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, LogOut } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const VerifyEmailPage: React.FC = () => {
  const { user, isEmailVerified, resendVerification, updateProfileData, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailChangeStatus, setEmailChangeStatus] = useState<string | null>(null);

  const currentEmail = user?.email || 'your email';

  const handleResend = async () => {
    if (!user?.email) return;
    setResending(true);
    setResendStatus(null);
    setErrorMessage(null);
    try {
      await resendVerification(user.email);
      setResendStatus('Verification email sent! Please check your inbox.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend verification email.';
      setErrorMessage(msg);
    } finally {
      setResending(false);
    }
  };

  const handleEmailChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage(null);
    try {
      await updateProfileData({ email: newEmail });
      setEmailChangeStatus(`Confirmation email sent to ${newEmail}. Please confirm to complete change.`);
      setIsChangingEmail(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not change email address.';
      setErrorMessage(msg);
    }
  };

  const handleContinue = async () => {
    await refreshProfile();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-card)] py-8 px-6 shadow-xl rounded-2xl border border-[var(--color-border)] sm:px-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 mb-4">
            <Mail className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            Please verify your email address
          </h2>

          <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
            We sent a verification link to{' '}
            <span className="font-semibold text-[var(--color-text)]">{currentEmail}</span>.
            Verifying your email ensures your workouts and gym records stay safe.
          </p>

          {isEmailVerified && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Your email is verified!
            </div>
          )}

          {resendStatus && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {resendStatus}
            </div>
          )}

          {emailChangeStatus && (
            <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              {emailChangeStatus}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </div>
          )}

          {/* Change Email Form toggle */}
          {isChangingEmail ? (
            <form onSubmit={handleEmailChangeSubmit} className="mt-6 text-left space-y-3">
              <Input
                label="New Email Address"
                type="email"
                placeholder="new@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" variant="primary" size="sm" className="flex-1">
                  Send Confirmation
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChangingEmail(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={handleContinue}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Dashboard
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResend}
                isLoading={resending}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Resend Verification Email
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs"
                onClick={() => setIsChangingEmail(true)}
              >
                Change Email Address
              </Button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log out and use a different account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
