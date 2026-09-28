import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { changePasswordSchema, type ChangePasswordInput } from '../../utils/validation';
import { useAuth } from '../../auth/useAuth';

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const { changePassword } = useAuth();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleClose = () => {
    reset();
    setApiError(null);
    setIsSuccess(false);
    onClose();
  };

  const onSubmit = async (data: ChangePasswordInput) => {
    setApiError(null);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      setIsSuccess(true);
      if (onSuccessToast) onSuccessToast();
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to change password.';
      setApiError(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Password"
      description="Update your security credentials. Use a strong password you don't use elsewhere."
      size="md"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[var(--color-text)]">Password updated successfully!</h4>
          <p className="text-xs text-[var(--color-muted)]">Closing modal...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {apiError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Current Password */}
          <Input
            label="Current Password"
            type={showCurrent ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.currentPassword?.message}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-[var(--color-muted)] hover:text-[var(--color-text)] focus:outline-none"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register('currentPassword')}
          />

          {/* New Password */}
          <div>
            <Input
              label="New Password"
              type={showNew ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.newPassword?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="text-[var(--color-muted)] hover:text-[var(--color-text)] focus:outline-none"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...register('newPassword')}
            />
            <p className="text-[11px] text-[var(--color-muted)] mt-1 ml-1">
              At least 8 characters with 1 uppercase, 1 lowercase & 1 number
            </p>
          </div>

          {/* Confirm New Password */}
          <Input
            label="Confirm New Password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter new password"
            autoComplete="new-password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-[var(--color-muted)] hover:text-[var(--color-text)] focus:outline-none"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register('confirmPassword')}
          />

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" size="md" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
