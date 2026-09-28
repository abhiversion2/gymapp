import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Plus,
  Clock,
  Dumbbell,
  Flame,
  Award,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/cn';
import type { Workout, WorkoutTrackingExercise } from '../../types/models';

export interface WorkoutTrackerModalProps {
  workout: Workout;
  exercises: WorkoutTrackingExercise[];
  startTime: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: 'reps' | 'weightKg' | 'completed',
    value: number | boolean
  ) => void;
  onAddSet: (exerciseIndex: number) => void;
  onComplete: () => void;
}

export const WorkoutTrackerModal: React.FC<WorkoutTrackerModalProps> = ({
  workout,
  exercises,
  startTime,
  isOpen,
  onClose,
  onUpdateSet,
  onAddSet,
  onComplete,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, startTime]);

  if (!isOpen) return null;

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSets = exercises.reduce((acc, curr) => acc + curr.sets.length, 0);
  const completedSets = exercises.reduce(
    (acc, curr) => acc + curr.sets.filter((s) => s.completed).length,
    0
  );
  const completionPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Main Tracker Container */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#13161D] border border-[#2B3344] text-slate-100 shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Sticky Header */}
        <div className="px-5 py-4 bg-[#171B24] border-b border-[#242A38] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/20 flex items-center justify-center text-[#C6FF3D]">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                  {workout.name}
                  <Badge variant="lime" size="sm">
                    In Progress
                  </Badge>
                </h3>
                <p className="text-xs text-slate-400">Track sets, weights, and reps</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Live Timer Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F1115] border border-[#2B3344] text-[#C6FF3D] font-mono text-sm font-bold shadow-inner">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>{formatTimer(elapsedSeconds)}</span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close tracker"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Mini Bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 bg-[#0F1115] h-2 rounded-full overflow-hidden border border-[#232834]">
              <div
                className="h-full bg-[#C6FF3D] transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-300 shrink-0 tabular-nums">
              {completedSets} / {totalSets} sets ({completionPercent}%)
            </span>
          </div>
        </div>

        {/* Exercises & Sets Scrollable List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {exercises.map((exercise, exIdx) => (
            <div
              key={exercise.exerciseId}
              className="rounded-xl bg-[#171B24] border border-[#242A38] p-4 sm:p-5 shadow-sm space-y-4"
            >
              {/* Exercise Header */}
              <div className="flex items-center justify-between border-b border-[#232834] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#222836] text-xs font-bold text-[#C6FF3D] flex items-center justify-center">
                    {exIdx + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {exercise.exerciseName}
                    </h4>
                    <span className="text-[11px] text-slate-400">{exercise.muscle}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddSet(exIdx)}
                  leftIcon={<Plus className="w-3.5 h-3.5 text-[#C6FF3D]" />}
                  className="text-xs text-slate-300 hover:text-[#C6FF3D]"
                >
                  Add Set
                </Button>
              </div>

              {/* Table / Grid of sets */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2 pb-1">
                  <span className="col-span-2 text-center">Set</span>
                  <span className="col-span-4 text-center">Weight (kg)</span>
                  <span className="col-span-4 text-center">Reps</span>
                  <span className="col-span-2 text-center">Done</span>
                </div>

                {exercise.sets.map((set, setIdx) => (
                  <div
                    key={set.id}
                    className={cn(
                      'grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all',
                      set.completed
                        ? 'bg-[#C6FF3D]/5 border-[#C6FF3D]/30 text-white'
                        : 'bg-[#101319] border-[#222734] text-slate-200'
                    )}
                  >
                    {/* Set Number */}
                    <div className="col-span-2 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#1F2533] text-xs font-bold text-slate-300">
                        {set.setNumber}
                      </span>
                    </div>

                    {/* Weight Input */}
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="relative w-full max-w-[110px]">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={set.weightKg}
                          onChange={(e) =>
                            onUpdateSet(
                              exIdx,
                              setIdx,
                              'weightKg',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full text-center py-1.5 px-2 bg-[#1A1F2B] border border-[#2B3344] rounded-lg text-sm font-bold text-white focus:outline-none focus:border-[#C6FF3D]"
                        />
                      </div>
                    </div>

                    {/* Reps Input */}
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="relative w-full max-w-[90px]">
                        <input
                          type="number"
                          step="1"
                          min="1"
                          value={set.reps}
                          onChange={(e) =>
                            onUpdateSet(
                              exIdx,
                              setIdx,
                              'reps',
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          className="w-full text-center py-1.5 px-2 bg-[#1A1F2B] border border-[#2B3344] rounded-lg text-sm font-bold text-white focus:outline-none focus:border-[#C6FF3D]"
                        />
                      </div>
                    </div>

                    {/* Completed Checkbox */}
                    <div className="col-span-2 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSet(exIdx, setIdx, 'completed', !set.completed)
                        }
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                          set.completed
                            ? 'bg-[#C6FF3D] text-[#0F1115] shadow-[0_0_10px_rgba(198,255,61,0.4)]'
                            : 'bg-[#222836] border border-[#30384C] text-slate-500 hover:text-white hover:border-[#C6FF3D]'
                        )}
                        aria-label={`Toggle set ${set.setNumber} complete`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#171B24] border-t border-[#242A38] shrink-0 flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Est. ~{workout.estimatedCalories} kcal
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto ml-auto">
            <Button variant="ghost" size="md" onClick={onClose} className="px-4">
              Save Draft & Exit
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={onComplete}
              leftIcon={<Award className="w-5 h-5 fill-current" />}
              className="flex-1 sm:flex-initial shadow-[0_0_20px_rgba(198,255,61,0.3)]"
            >
              Complete Workout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
