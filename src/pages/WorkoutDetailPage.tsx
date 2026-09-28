import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Dumbbell,
  Flame,
  Play,
  Info,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { LoadingState } from '../components/common/LoadingState';
import { ExerciseDetailModal } from '../components/exercises/ExerciseDetailModal';
import { useApp } from '../context/AppContext';
import { getWorkoutById } from '../services/workouts';
import type { Workout, Exercise } from '../types/models';

export const WorkoutDetailPage: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { startTracking } = useApp();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (!workoutId) return;
    setLoading(true);
    getWorkoutById(workoutId).then((data) => {
      setWorkout(data);
      setLoading(false);
    });
  }, [workoutId]);

  if (loading) {
    return <LoadingState message="Loading workout program..." />;
  }

  if (!workout) {
    return (
      <div className="text-center py-16 space-y-4">
        <h3 className="text-xl font-bold text-white">Workout Not Found</h3>
        <p className="text-sm text-slate-400">The requested workout does not exist.</p>
        <Button variant="outline" onClick={() => navigate('/workouts')}>
          Return to Workouts
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/workouts')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all routines
        </button>
      </div>

      {/* Hero Workout Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#171A21] border border-[#232834]">
        <div className="h-64 sm:h-72 w-full relative">
          <img
            src={workout.imageUrl}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-[#171A21]/70 to-black/30" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="lime" size="md">
              {workout.difficulty}
            </Badge>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
              {workout.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {workout.name}
              </h2>
              <p className="text-sm text-slate-300 mt-1">{workout.subtitle}</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => startTracking(workout)}
              leftIcon={<Play className="w-5 h-5 fill-current" />}
              className="shadow-[0_0_25px_rgba(198,255,61,0.4)]"
            >
              Start Workout
            </Button>
          </div>
        </div>

        {/* 3 Metric Summary Strip */}
        <div className="grid grid-cols-3 divide-x divide-[#232834] border-t border-[#232834] bg-[#12151B] p-4 text-center">
          <div>
            <span className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold mb-0.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Duration
            </span>
            <span className="text-lg font-black text-white tabular-nums">
              {workout.durationMinutes} min
            </span>
          </div>

          <div>
            <span className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold mb-0.5">
              <Dumbbell className="w-3.5 h-3.5 text-[#C6FF3D]" />
              Movements
            </span>
            <span className="text-lg font-black text-white tabular-nums">
              {workout.exercisesCount} exercises
            </span>
          </div>

          <div>
            <span className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold mb-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Est. Burn
            </span>
            <span className="text-lg font-black text-white tabular-nums">
              {workout.estimatedCalories} kcal
            </span>
          </div>
        </div>
      </div>

      {/* Description & Target Muscles */}
      <Card className="p-6 space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Routine Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">{workout.description}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Target Muscle Groups
          </h4>
          <div className="flex flex-wrap gap-2">
            {workout.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="px-3 py-1 rounded-lg bg-[#0F1115] text-xs font-bold text-[#C6FF3D] border border-[#2B3448]"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Exercise List */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#232834] pb-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Exercise Sequence</h3>
            <p className="text-xs text-slate-400">
              Follow set protocols and rest durations for maximum mechanical tension.
            </p>
          </div>
          <span className="text-xs font-bold text-[#C6FF3D]">
            {workout.exercises.length} Exercises Total
          </span>
        </div>

        <div className="space-y-3">
          {workout.exercises.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#0F1115] border border-[#232834] hover:border-[#C6FF3D]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-[#1F2533] border border-[#2E374A] text-xs font-bold text-[#C6FF3D] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#C6FF3D] transition-colors">
                    {item.exercise.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{item.exercise.targetMuscle}</span>
                    <span>•</span>
                    <span>{item.exercise.equipment}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1C212B]">
                <div className="text-right">
                  <span className="text-sm font-extrabold text-white">
                    {item.sets} sets × {item.reps} reps
                  </span>
                  {item.targetWeightKg && (
                    <span className="block text-xs text-[#C6FF3D] font-semibold">
                      Target ~{item.targetWeightKg} kg
                    </span>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedExercise(item.exercise)}
                  leftIcon={<Info className="w-3.5 h-3.5" />}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Tips
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Start button */}
        <div className="pt-4 border-t border-[#232834] flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={() => startTracking(workout)}
            leftIcon={<Play className="w-5 h-5 fill-current" />}
            className="w-full sm:w-auto shadow-[0_0_20px_rgba(198,255,61,0.3)]"
          >
            Start Workout ({workout.name})
          </Button>
        </div>
      </Card>

      {/* Exercise tips modal */}
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
