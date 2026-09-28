import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Scale, Trophy } from 'lucide-react';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { MembershipCard } from '../components/dashboard/MembershipCard';
import { TodaysWorkoutCard } from '../components/dashboard/TodaysWorkoutCard';
import { WeeklyActivityWidget } from '../components/dashboard/WeeklyActivityWidget';
import { RecentActivityWidget } from '../components/dashboard/RecentActivityWidget';
import { StatCard } from '../components/common/StatCard';
import { useApp } from '../context/AppContext';
import { mockDashboardMetrics } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, membership, todaysWorkout, startTracking } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Header */}
      <WelcomeHeader profile={profile} />

      {/* Top 2 Cards: Membership Pass & Today's Workout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MembershipCard membership={membership} />
        <TodaysWorkoutCard
          workout={todaysWorkout}
          onStart={startTracking}
          onViewDetails={(w) => navigate(`/workouts/${w.id}`)}
        />
      </div>

      {/* Quick Stats 4-Card Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Quick Fitness Metrics
          </h3>
          <span className="text-xs text-slate-500">Live 30-Day Aggregates</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Workouts"
            value={mockDashboardMetrics.totalWorkouts}
            subtitle="Completed sessions"
            icon={<Dumbbell className="w-5 h-5" />}
            trend={{ value: '+4', isPositive: true, label: 'this week' }}
            accentColor="lime"
          />

          <StatCard
            title="Calories Burned"
            value="8,450"
            unit="kcal"
            subtitle="Total active burn"
            icon={<Flame className="w-5 h-5" />}
            trend={{ value: '+12%', isPositive: true, label: 'vs last month' }}
            accentColor="amber"
          />

          <StatCard
            title="Current Weight"
            value={mockDashboardMetrics.currentWeightKg}
            unit="kg"
            subtitle="Down from 82.0 kg"
            icon={<Scale className="w-5 h-5" />}
            trend={{ value: '-3.5 kg', isPositive: true, label: 'net progress' }}
            accentColor="cyan"
          />

          <StatCard
            title="Workout Streak"
            value={mockDashboardMetrics.workoutStreakDays}
            unit="days"
            subtitle="Active daily habit"
            icon={<Trophy className="w-5 h-5" />}
            trend={{ value: 'Record', isPositive: true, label: 'unbroken' }}
            accentColor="lime"
          />
        </div>
      </div>

      {/* Bottom Row: Weekly Activity Chart & Recent Logged Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <WeeklyActivityWidget
            weeklyActivity={mockDashboardMetrics.weeklyActivity}
            workoutsThisWeekCount={mockDashboardMetrics.workoutsThisWeekCount}
          />
        </div>

        <div className="lg:col-span-5">
          <RecentActivityWidget activities={mockDashboardMetrics.recentActivities} />
        </div>
      </div>
    </div>
  );
};
