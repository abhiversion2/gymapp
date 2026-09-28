import React, { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';

export interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { deleteUserAccount } = useAuth();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isConfirmed = confirmText.trim().toUpperCase() === 'DELETE';

  const handleDelete = async () => {
    if (!isConfirmed) return;
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      await deleteUserAccount();
      onClose();
      navigate('/login', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete account. Please try again.';
      setErrorMsg(msg);
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setConfirmText('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Account?"
      description="This action is permanent and cannot be undone."
      size="md"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed space-y-1">
            <p className="font-bold">Warning: Permanent Data Erasure</p>
            <p className="opacity-90">
              This action will permanently delete your user profile, gym workout logs, personal records, and measurements. Once deleted, this information cannot be recovered.
            </p>
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[var(--color-text)]">
            To confirm, type <span className="font-mono text-rose-400 font-bold">DELETE</span> below:
          </label>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            disabled={isDeleting}
            autoFocus
          />
        </div>

        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            isLoading={isDeleting}
            disabled={!isConfirmed || isDeleting}
            onClick={handleDelete}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            {isDeleting ? 'Deleting...' : 'Delete My Account'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
