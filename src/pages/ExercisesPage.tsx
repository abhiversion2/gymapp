import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { ExerciseCard } from '../components/exercises/ExerciseCard';
import { ExerciseFilter } from '../components/exercises/ExerciseFilter';
import { ExerciseDetailModal } from '../components/exercises/ExerciseDetailModal';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { useExercises } from '../hooks/useExercises';

export const ExercisesPage: React.FC = () => {
  const {
    exercises,
    filteredExercises,
    loading,
    searchQuery,
    setSearchQuery,
    selectedMuscle,
    setSelectedMuscle,
    selectedEquipment,
    setSelectedEquipment,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedExercise,
    setSelectedExercise,
    resetFilters,
  } = useExercises();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
            <Sparkles className="w-3 h-3" />
            Exercise Encyclopedia
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Exercise Library
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Browse biomechanically sound movements, setup protocols, and execution cues.
        </p>
      </div>

      {/* Filter Toolbar */}
      <ExerciseFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedMuscle={selectedMuscle}
        onMuscleChange={setSelectedMuscle}
        selectedEquipment={selectedEquipment}
        onEquipmentChange={setSelectedEquipment}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        onReset={resetFilters}
        totalCount={exercises.length}
        filteredCount={filteredExercises.length}
      />

      {/* Main Grid */}
      {loading ? (
        <LoadingState message="Loading exercise database..." />
      ) : filteredExercises.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No Exercises Found"
          description="Try broadening your search term or clearing the active muscle/equipment filters."
          actionLabel="Clear All Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={setSelectedExercise}
            />
          ))}
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          isOpen={Boolean(selectedExercise)}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};
