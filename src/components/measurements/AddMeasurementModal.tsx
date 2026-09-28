import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { BodyMeasurement } from '../../types/models';

export interface AddMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<BodyMeasurement, 'id'>) => Promise<unknown>;
}

export const AddMeasurementModal: React.FC<AddMeasurementModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weightKg: '78.5',
    heightCm: '178',
    bodyFatPercentage: '18.0',
    chestCm: '102',
    waistCm: '84',
    armsCm: '37',
    thighCm: '58',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const weight = parseFloat(formData.weightKg);
    const height = parseFloat(formData.heightCm);
    const bodyFat = parseFloat(formData.bodyFatPercentage);
    const chest = parseFloat(formData.chestCm);
    const waist = parseFloat(formData.waistCm);
    const arms = parseFloat(formData.armsCm);
    const thigh = parseFloat(formData.thighCm);

    if (isNaN(weight) || weight <= 0) {
      setError('Please provide a valid weight in kg.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        date: formData.date,
        weightKg: weight,
        heightCm: height || 178,
        bodyFatPercentage: bodyFat || 18,
        chestCm: chest || 100,
        waistCm: waist || 80,
        armsCm: arms || 35,
        thighCm: thigh || 55,
        notes: formData.notes.trim() || undefined,
      });
      onClose();
    } catch {
      setError('Failed to save measurement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record New Measurement"
      description="Enter your updated metrics to track fitness progression."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Date */}
        <Input
          label="Date of Measurement"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        {/* Weight & Body Fat */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Weight (kg)"
            type="number"
            step="0.1"
            value={formData.weightKg}
            onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
            required
          />
          <Input
            label="Body Fat (%)"
            type="number"
            step="0.1"
            value={formData.bodyFatPercentage}
            onChange={(e) => setFormData({ ...formData, bodyFatPercentage: e.target.value })}
          />
        </div>

        {/* Height & Chest */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Height (cm)"
            type="number"
            step="0.5"
            value={formData.heightCm}
            onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
          />
          <Input
            label="Chest (cm)"
            type="number"
            step="0.5"
            value={formData.chestCm}
            onChange={(e) => setFormData({ ...formData, chestCm: e.target.value })}
          />
        </div>

        {/* Waist & Arms */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Waist (cm)"
            type="number"
            step="0.5"
            value={formData.waistCm}
            onChange={(e) => setFormData({ ...formData, waistCm: e.target.value })}
          />
          <Input
            label="Arms (cm)"
            type="number"
            step="0.5"
            value={formData.armsCm}
            onChange={(e) => setFormData({ ...formData, armsCm: e.target.value })}
          />
        </div>

        {/* Thigh */}
        <Input
          label="Thigh (cm)"
          type="number"
          step="0.5"
          value={formData.thighCm}
          onChange={(e) => setFormData({ ...formData, thighCm: e.target.value })}
        />

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Check-In Notes
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. Completed after morning fasted cardio..."
            className="w-full rounded-xl bg-[#0F1115] border border-[#272D3B] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#C6FF3D]"
          />
        </div>

        {/* Actions */}
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
            Save Measurement
          </Button>
        </div>
      </form>
    </Modal>
  );
};
