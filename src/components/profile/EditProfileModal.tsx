import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { Profile } from '../../types/models';

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
  const [fullName, setFullName] = useState(profile?.fullName || 'Abhijeet Vishwakarma');
  const [email, setEmail] = useState(profile?.email || 'abhijeet@example.com');
  const [phone, setPhone] = useState(profile?.phone || '+1 (555) 234-8901');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Member Profile"
      description="Update your personal contact details."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="pt-3 border-t border-[#232834] flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="shadow-[0_0_15px_rgba(198,255,61,0.2)]"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
