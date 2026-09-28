import React from 'react';
import { Clock, Dumbbell, Flame, Play, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import type { Workout } from '../../types/models';

export interface WorkoutCardProps {
  workout: Workout;
  onStart: (workout: Workout) => void;
  onViewDetails: (workout: Workout) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onStart,
  onViewDetails,
}) => {
  const difficultyBadgeVariant = {
    Beginner: 'blue',
    Intermediate: 'lime',
    Advanced: 'orange',
  } as const;

  return (
    <Card className="flex flex-col justify-between overflow-hidden p-0 border-[#232834] bg-[#171A21] group hover:border-[#C6FF3D]/30 transition-all duration-300">
      {/* Top Image Banner */}
      <div className="relative h-44 overflow-hidden bg-[#101319]">
        <img
          src={workout.imageUrl}
          alt={workout.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-[#171A21]/50 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge
            variant={difficultyBadgeVariant[workout.difficulty] || 'neutral'}
            size="sm"
          >
            {workout.difficulty}
          </Badge>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-black/60 backdrop-blur-sm text-slate-200 border border-white/10">
            {workout.category}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">{workout.name}</h3>
            <p className="text-xs text-slate-300 line-clamp-1">{workout.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content & Metrics */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Pills row */}
        <div className="grid grid-cols-3 gap-2 text-center py-1">
          <div className="p-2 rounded-xl bg-[#0F1115] border border-[#222734]">
            <span className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Dumbbell className="w-3 h-3 text-[#C6FF3D]" />
              Moves
            </span>
            <span className="text-sm font-bold text-white tabular-nums">
              {workout.exercisesCount}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#0F1115] border border-[#222734]">
            <span className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Clock className="w-3 h-3 text-cyan-400" />
              Time
            </span>
            <span className="text-sm font-bold text-white tabular-nums">
              {workout.durationMinutes}m
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#0F1115] border border-[#222734]">
            <span className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Flame className="w-3 h-3 text-amber-400" />
              Burn
            </span>
            <span className="text-sm font-bold text-white tabular-nums">
              {workout.estimatedCalories}
            </span>
          </div>
        </div>

        {/* Target muscle tags */}
        <div className="flex flex-wrap gap-1.5">
          {workout.targetMuscles.map((muscle) => (
            <span
              key={muscle}
              className="px-2 py-0.5 rounded-md bg-[#222836] text-[10px] font-semibold text-slate-300 border border-[#2B3446]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="pt-3 border-t border-[#232834] flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(workout)}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            className="flex-1"
          >
            Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onStart(workout)}
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
            className="flex-1"
          >
            Start
          </Button>
        </div>
      </div>
    </Card>
  );
};
