import React from 'react';
import { Dumbbell, Flame, CheckCircle, Info } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import type { Exercise } from '../../types/models';

export interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  isOpen,
  onClose,
}) => {
  if (!exercise) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exercise.name}
      description={`${exercise.targetMuscle} • ${exercise.equipment}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Banner Image */}
        <div className="relative h-56 rounded-xl overflow-hidden bg-[#0F1115] border border-[#232834]">
          <img
            src={exercise.sampleImageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
            <Badge variant="lime" size="md">
              {exercise.difficulty}
            </Badge>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/70 backdrop-blur-sm text-slate-200 border border-white/10">
              {exercise.equipment}
            </span>
          </div>
        </div>

        {/* Overview tags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-[#0F1115] border border-[#232834]">
            <span className="text-[11px] text-slate-400 block font-medium">Primary Muscle</span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <Dumbbell className="w-3.5 h-3.5 text-[#C6FF3D]" />
              {exercise.targetMuscle}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0F1115] border border-[#232834]">
            <span className="text-[11px] text-slate-400 block font-medium">Caloric Burn</span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              ~{exercise.caloriesPerHourEstimate} kcal/hr
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0F1115] border border-[#232834] col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-400 block font-medium">Secondary Muscles</span>
            <span className="text-xs font-semibold text-slate-300 mt-1 block">
              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0
                ? exercise.secondaryMuscles.join(', ')
                : 'Isolation movement'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C6FF3D]" />
            Description
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed bg-[#0F1115]/50 p-3.5 rounded-xl border border-[#232834]">
            {exercise.description}
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step-by-Step Execution
          </h4>
          <div className="space-y-2.5">
            {exercise.instructions.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#0F1115] border border-[#232834]"
              >
                <div className="w-6 h-6 rounded-full bg-[#1F2533] border border-[#2E374A] text-xs font-bold text-[#C6FF3D] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="p-3.5 rounded-xl bg-[#C6FF3D]/5 border border-[#C6FF3D]/20 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#C6FF3D] shrink-0" />
          <p className="text-xs text-slate-300">
            <strong className="text-white">Form Tip:</strong> Maintain controlled tempo (2 seconds eccentric lowering, 1 second pause, explosive concentric lift) for optimal muscle fiber recruitment.
          </p>
        </div>
      </div>
    </Modal>
  );
};
