import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Sparkles } from 'lucide-react';
import { WorkoutCard } from '../components/workouts/WorkoutCard';
import { Tabs } from '../components/common/Tabs';
import { useApp } from '../context/AppContext';
import type { Workout } from '../types/models';

export const WorkoutsPage: React.FC = () => {
  const navigate = useNavigate();
  const { workouts, startTracking } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Routines', badge: workouts.length },
    { id: 'Push', label: 'Push Day' },
    { id: 'Pull', label: 'Pull Day' },
    { id: 'Legs', label: 'Leg Day' },
    { id: 'Full Body', label: 'Full Body' },
  ];

  const filteredWorkouts = workouts.filter((w) => {
    if (activeCategory === 'All') return true;
    return w.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
              <Sparkles className="w-3 h-3" />
              Curated Splits
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Workout Routines
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Structured hypertrophy and strength programs tailored for optimal recovery.
          </p>
        </div>

        <Tabs
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {filteredWorkouts.map((workout: Workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onStart={startTracking}
            onViewDetails={(w) => navigate(`/workouts/${w.id}`)}
          />
        ))}
      </div>

      {/* Motivational Info Footer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#171A21] border border-[#232834] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#222836] border border-[#2B3549] flex items-center justify-center text-[#C6FF3D]">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Need a custom plan?</h4>
            <p className="text-xs text-slate-400">
              Trainer customized routines and Supabase cloud sync are unlocked in Phase 2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
