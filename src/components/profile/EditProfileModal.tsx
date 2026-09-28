import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { Profile } from '../../types/models';
import { User, Mail, Phone, Calendar, Image as ImageIcon, AlertCircle } from 'lucide-react';

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (updates: Partial<Profile>) => Promise<unknown>;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [mobileNumber, setMobileNumber] = useState(profile?.mobileNumber || profile?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const initialEmail = profile?.email;
  const isEmailChanging = email.trim() !== initialEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await onSave({
        fullName: fullName.trim(),
        email: email.trim(),
        mobileNumber: mobileNumber.trim() || undefined,
        phone: mobileNumber.trim() || undefined,
        dateOfBirth: dateOfBirth || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
      });
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Member Profile"
      description="Update your personal details, contact information, and avatar."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Full Name */}
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
          required
        />

        {/* Email Address */}
        <div>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />
          {isEmailChanging && (
            <p className="text-[11px] text-amber-400 mt-1 ml-1">
              Note: Changing your email will send a confirmation link to both the old and new email addresses.
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="+91 9876543210"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          leftIcon={<Phone className="w-4 h-4" />}
          helperText="For gym member directory and notifications"
        />

        {/* Date of Birth */}
        <Input
          label="Date of Birth (Optional)"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          leftIcon={<Calendar className="w-4 h-4" />}
        />

        {/* Avatar Image URL */}
        <Input
          label="Avatar Image URL (Optional)"
          type="url"
          placeholder="https://images.unsplash.com/..."
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          leftIcon={<ImageIcon className="w-4 h-4" />}
          helperText="Direct link to your profile image"
        />

        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
