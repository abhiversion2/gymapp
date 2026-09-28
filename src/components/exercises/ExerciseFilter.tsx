import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { MuscleGroup, EquipmentType, DifficultyLevel } from '../../types/models';

export interface ExerciseFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedMuscle: MuscleGroup | 'All';
  onMuscleChange: (val: MuscleGroup | 'All') => void;
  selectedEquipment: EquipmentType | 'All';
  onEquipmentChange: (val: EquipmentType | 'All') => void;
  selectedDifficulty: DifficultyLevel | 'All';
  onDifficultyChange: (val: DifficultyLevel | 'All') => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export const ExerciseFilter: React.FC<ExerciseFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedMuscle,
  onMuscleChange,
  selectedEquipment,
  onEquipmentChange,
  selectedDifficulty,
  onDifficultyChange,
  onReset,
  totalCount,
  filteredCount,
}) => {
  const muscleOptions = [
    { value: 'All', label: 'All Muscles' },
    { value: 'Chest', label: 'Chest' },
    { value: 'Back', label: 'Back' },
    { value: 'Legs', label: 'Legs' },
    { value: 'Shoulders', label: 'Shoulders' },
    { value: 'Arms', label: 'Arms' },
    { value: 'Core', label: 'Core' },
  ];

  const equipmentOptions = [
    { value: 'All', label: 'All Equipment' },
    { value: 'Barbell', label: 'Barbell' },
    { value: 'Dumbbell', label: 'Dumbbell' },
    { value: 'Machine', label: 'Machine' },
    { value: 'Cable', label: 'Cable' },
    { value: 'Bodyweight', label: 'Bodyweight' },
  ];

  const difficultyOptions = [
    { value: 'All', label: 'All Difficulties' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedMuscle !== 'All' ||
    selectedEquipment !== 'All' ||
    selectedDifficulty !== 'All';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#171A21] border border-[#232834] space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="md:col-span-4">
          <Input
            placeholder="Search exercises by name, muscle, equipment..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            rightIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Muscle Filter */}
        <div className="md:col-span-3">
          <Select
            options={muscleOptions}
            value={selectedMuscle}
            onChange={(e) => onMuscleChange(e.target.value as MuscleGroup | 'All')}
          />
        </div>

        {/* Equipment Filter */}
        <div className="md:col-span-3">
          <Select
            options={equipmentOptions}
            value={selectedEquipment}
            onChange={(e) => onEquipmentChange(e.target.value as EquipmentType | 'All')}
          />
        </div>

        {/* Difficulty Filter */}
        <div className="md:col-span-2">
          <Select
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel | 'All')}
          />
        </div>
      </div>

      {/* Filter status row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#232834] text-xs">
        <div className="text-slate-400">
          Showing <strong className="text-white font-bold">{filteredCount}</strong> of{' '}
          <span className="text-slate-300">{totalCount} exercises</span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs text-slate-400 hover:text-white py-1 h-auto"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};
