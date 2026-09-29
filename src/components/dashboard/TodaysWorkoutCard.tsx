import React from 'react';
import { Play, Clock, Flame, Dumbbell, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import type { Workout } from '../../types/models';

export interface TodaysWorkoutCardProps {
  workout: Workout | null;
  onStart: (workout: Workout) => void;
  onViewDetails?: (workout: Workout) => void;
}

export const TodaysWorkoutCard: React.FC<TodaysWorkoutCardProps> = ({
  workout,
  onStart,
  onViewDetails,
}) => {
  if (!workout) return null;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#1C2029] via-[#171A21] to-[#12151B] border-[#293140] p-6 shadow-xl flex flex-col justify-between">
      {/* Background ambient cover */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url(${workout.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-[#171A21]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Header badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#C6FF3D]/15 text-[#C6FF3D] border border-[#C6FF3D]/30 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Today&apos;s Workout
            </span>
            <Badge variant="neutral" size="sm">
              {workout.difficulty}
            </Badge>
          </div>

          <span className="text-xs font-medium text-slate-400">Scheduled for today</span>
        </div>

        {/* Title and muscles */}
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">{workout.name}</h3>
          <p className="text-xs text-slate-400 mt-1">{workout.subtitle}</p>
        </div>

        {/* 3 Metrics pills */}
        <div className="grid grid-cols-3 gap-2.5 py-2">
          <div className="p-3 rounded-xl bg-[#0F1115]/80 border border-[#232938] flex flex-col items-center text-center">
            <Dumbbell className="w-4 h-4 text-[#C6FF3D] mb-1" />
            <span className="text-sm font-bold text-white tabular-nums">
              {workout.exercisesCount}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Exercises</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0F1115]/80 border border-[#232938] flex flex-col items-center text-center">
            <Clock className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-sm font-bold text-white tabular-nums">
              {workout.durationMinutes} min
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Duration</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0F1115]/80 border border-[#232938] flex flex-col items-center text-center">
            <Flame className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-sm font-bold text-white tabular-nums">
              {workout.estimatedCalories} kcal
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Est. Burn</span>
          </div>
        </div>

        {/* Target Muscles */}
        <div className="flex flex-wrap gap-1.5">
          {(workout.targetMuscles || []).map((muscle) => (
            <span
              key={muscle}
              className="px-2 py-0.5 rounded-md bg-[#222836] text-[11px] font-semibold text-slate-300 border border-[#2C3446]"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 pt-5 mt-2 border-t border-[#232834] flex items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onStart(workout)}
          leftIcon={<Play className="w-4 h-4 fill-current" />}
          className="flex-1 shadow-[0_0_20px_rgba(198,255,61,0.3)] hover:shadow-[0_0_25px_rgba(198,255,61,0.5)]"
        >
          Start Workout
        </Button>
        {onViewDetails && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => onViewDetails(workout)}
            className="px-4"
          >
            Review Routine
          </Button>
        )}
      </div>
    </Card>
  );
};
