import React from 'react';
import { Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import { NavLink } from 'react-router-dom';
import type { RecentWorkoutActivity } from '../../types/models';

export interface RecentActivityWidgetProps {
  activities: RecentWorkoutActivity[];
}

export const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ activities }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight">Recent Sessions</h4>
          <p className="text-xs text-slate-400 mt-0.5">Your recently logged workout achievements</p>
        </div>
        <NavLink
          to="/progress"
          className="text-xs font-semibold text-[#C6FF3D] hover:underline flex items-center gap-1"
        >
          View All History
          <ChevronRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      <div className="divide-y divide-[#222734]">
        {activities.slice(0, 4).map((activity) => (
          <div
            key={activity.id}
            className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#1F2533] border border-[#2B3448] flex items-center justify-center text-[#C6FF3D] shrink-0 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h5 className="text-sm font-bold text-white group-hover:text-[#C6FF3D] transition-colors truncate">
                  {activity.workoutName}
                </h5>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span className="text-slate-300 font-medium">{activity.relativeTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {activity.durationMinutes} min
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    {activity.caloriesBurned} kcal
                  </span>
                </div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#222836] text-slate-300 border border-[#2B3448] shrink-0 hidden sm:inline-block">
              {activity.category}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
