import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Exercise, MuscleGroup, EquipmentType, DifficultyLevel } from '../types/models';
import { getExercises } from '../services/exercises';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'All'>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const loadExercises = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getExercises();
      setExercises(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesMuscle = item.targetMuscle.toLowerCase().includes(q);
        const matchesEquipment = item.equipment.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesMuscle && !matchesEquipment) {
          return false;
        }
      }

      if (selectedMuscle !== 'All' && item.targetMuscle !== selectedMuscle) {
        return false;
      }

      if (selectedEquipment !== 'All' && item.equipment !== selectedEquipment) {
        return false;
      }

      if (selectedDifficulty !== 'All' && item.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [exercises, searchQuery, selectedMuscle, selectedEquipment, selectedDifficulty]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMuscle('All');
    setSelectedEquipment('All');
    setSelectedDifficulty('All');
  };

  return {
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
  };
}
