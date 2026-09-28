import React from 'react';
import { Trophy, Clock, Dumbbell, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { WorkoutSessionSummary } from '../../types/models';

export interface WorkoutCompleteModalProps {
  summary: WorkoutSessionSummary | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateProgress?: () => void;
}

export const WorkoutCompleteModal: React.FC<WorkoutCompleteModalProps> = ({
  summary,
  isOpen,
  onClose,
  onNavigateProgress,
}) => {
  if (!summary) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" showCloseButton>
      <div className="text-center py-4 space-y-6">
        {/* Celebration Trophy Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full bg-[#C6FF3D]/10 border-2 border-[#C6FF3D] flex items-center justify-center text-[#C6FF3D] mx-auto shadow-[0_0_30px_rgba(198,255,61,0.4)] animate-bounce">
            <Trophy className="w-10 h-10 fill-current" />
          </div>
          <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#171A21] border border-[#232834]">
            <CheckCircle2 className="w-6 h-6 text-[#C6FF3D] fill-current" />
          </span>
        </div>

        {/* Headline */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Workout Completed 🎉
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Phenomenal work! You crushed <strong className="text-white">{summary.workoutName}</strong>.
          </p>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] flex flex-col items-center">
            <Clock className="w-5 h-5 text-cyan-400 mb-1.5" />
            <span className="text-xl font-black text-white tabular-nums">
              {summary.durationMinutes}
            </span>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">minutes</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] flex flex-col items-center">
            <Dumbbell className="w-5 h-5 text-[#C6FF3D] mb-1.5" />
            <span className="text-xl font-black text-white tabular-nums">
              {summary.exercisesCompletedCount}
            </span>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">exercises</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] flex flex-col items-center">
            <Flame className="w-5 h-5 text-amber-400 mb-1.5" />
            <span className="text-xl font-black text-white tabular-nums">
              {summary.caloriesBurned}
            </span>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">kcal</span>
          </div>
        </div>

        {/* Encouraging Banner */}
        <div className="p-3.5 rounded-xl bg-[#1A202C] border border-[#2B3549] text-xs text-slate-300">
          🔥 Streak extended to <strong className="text-[#C6FF3D]">7 consecutive days</strong>! Keep the momentum strong.
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {onNavigateProgress && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onClose();
                onNavigateProgress();
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:flex-1"
            >
              View Progress
            </Button>
          )}

          <Button
            variant="primary"
            size="lg"
            onClick={onClose}
            className="w-full sm:flex-1 shadow-[0_0_20px_rgba(198,255,61,0.25)]"
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
