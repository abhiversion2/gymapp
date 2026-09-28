import React from 'react';
import { Dumbbell, Calendar, Clock, Trophy, Sparkles } from 'lucide-react';
import { WeightProgressChart } from '../components/progress/WeightProgressChart';
import { WeeklyVolumeChart } from '../components/progress/WeeklyVolumeChart';
import { PersonalRecordsList } from '../components/progress/PersonalRecordsList';
import { StatCard } from '../components/common/StatCard';
import { LoadingState } from '../components/common/LoadingState';
import { useProgress } from '../hooks/useProgress';

export const ProgressPage: React.FC = () => {
  const {
    personalRecords,
    weightHistory,
    workoutMetrics,
    weeklyVolume,
    loading,
  } = useProgress();

  if (loading) {
    return <LoadingState message="Crunching progress metrics..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
            <Sparkles className="w-3 h-3" />
            Performance Tracking
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Progress & Personal Records
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Visual analytics tracking body composition shifts, gym consistency, and maximal lifting PRs.
        </p>
      </div>

      {/* 4 Workout Progress Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workouts"
          value={workoutMetrics.totalWorkouts}
          subtitle="All-time sessions logged"
          icon={<Dumbbell className="w-5 h-5" />}
          accentColor="lime"
        />

        <StatCard
          title="This Month"
          value={workoutMetrics.thisMonth}
          subtitle="Target: 12 sessions"
          icon={<Calendar className="w-5 h-5" />}
          trend={{ value: '67%', isPositive: true, label: 'of monthly goal' }}
          accentColor="cyan"
        />

        <StatCard
          title="Average Duration"
          value={workoutMetrics.avgDurationMinutes}
          unit="min"
          subtitle="Optimal training density"
          icon={<Clock className="w-5 h-5" />}
          accentColor="purple"
        />

        <StatCard
          title="Current Streak"
          value={workoutMetrics.currentStreakDays}
          unit="days"
          subtitle="Daily discipline"
          icon={<Trophy className="w-5 h-5" />}
          trend={{ value: 'Active', isPositive: true }}
          accentColor="amber"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeightProgressChart data={weightHistory} />
        <WeeklyVolumeChart data={weeklyVolume} />
      </div>

      {/* Personal Records PRs */}
      <PersonalRecordsList records={personalRecords} />
    </div>
  );
};
