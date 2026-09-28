import React from 'react';
import { Dumbbell, ChevronRight, Flame } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import type { Exercise } from '../../types/models';

export interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick }) => {
  const difficultyBadgeVariant = {
    Beginner: 'blue',
    Intermediate: 'lime',
    Advanced: 'orange',
  } as const;

  return (
    <Card
      onClick={() => onClick(exercise)}
      className="p-0 overflow-hidden bg-[#171A21] border-[#242A38] hover:border-[#C6FF3D]/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
    >
      {/* Exercise Image */}
      <div className="relative h-40 overflow-hidden bg-[#101319]">
        <img
          src={exercise.sampleImageUrl}
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-transparent to-black/30" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge
            variant={difficultyBadgeVariant[exercise.difficulty] || 'neutral'}
            size="sm"
          >
            {exercise.difficulty}
          </Badge>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-sm text-slate-200 border border-white/10">
            {exercise.equipment}
          </span>
        </div>

        <div className="absolute bottom-2 right-3">
          <span className="text-[11px] font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            ~{exercise.caloriesPerHourEstimate} kcal/hr
          </span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#C6FF3D] font-bold uppercase tracking-wider mb-1">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>{exercise.targetMuscle}</span>
          </div>
          <h4 className="text-base font-bold text-white tracking-tight group-hover:text-[#C6FF3D] transition-colors">
            {exercise.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {exercise.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#232834] flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
          <span>{exercise.instructions.length} technique steps</span>
          <span className="flex items-center gap-1 text-[#C6FF3D] font-semibold">
            View Guide
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Card>
  );
};
