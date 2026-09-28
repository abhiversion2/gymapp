import React from 'react';
import { Check, Flame, Trophy } from 'lucide-react';
import { Card } from '../common/Card';
import { cn } from '../../utils/cn';
import type { WeeklyActivityDay } from '../../types/models';

export interface WeeklyActivityWidgetProps {
  weeklyActivity: WeeklyActivityDay[];
  workoutsThisWeekCount: number;
}

export const WeeklyActivityWidget: React.FC<WeeklyActivityWidgetProps> = ({
  weeklyActivity,
  workoutsThisWeekCount,
}) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white tracking-tight">Weekly Activity</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Week
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Weekly consistency goal: 4 sessions minimum
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F1115] border border-[#232834]">
          <Trophy className="w-4 h-4 text-[#C6FF3D]" />
          <span className="text-xs font-semibold text-slate-300">
            Workouts this week:{' '}
            <strong className="text-white text-sm font-bold ml-1">{workoutsThisWeekCount}</strong>
          </span>
        </div>
      </div>

      {/* 7 Days Row */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {weeklyActivity.map((item) => (
          <div
            key={item.day}
            className={cn(
              'flex flex-col items-center p-2.5 sm:p-3 rounded-xl border transition-all text-center',
              item.completed
                ? 'bg-[#C6FF3D]/10 border-[#C6FF3D]/40 text-[#C6FF3D] shadow-[0_0_15px_rgba(198,255,61,0.1)]'
                : item.isToday
                ? 'bg-[#1F2533] border-[#38435C] text-white ring-1 ring-[#C6FF3D]/50'
                : 'bg-[#0F1115] border-[#222734] text-slate-400'
            )}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider">{item.day}</span>

            <div
              className={cn(
                'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center my-2 font-bold transition-transform',
                item.completed
                  ? 'bg-[#C6FF3D] text-[#0F1115] shadow-sm'
                  : item.isToday
                  ? 'bg-[#2B3448] text-slate-200'
                  : 'bg-transparent text-slate-500'
              )}
            >
              {item.completed ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <span className="text-sm font-semibold select-none">—</span>
              )}
            </div>

            <span className="text-[10px] truncate max-w-full font-medium">
              {item.completed ? (
                <span className="text-[#C6FF3D] font-semibold flex items-center gap-0.5 justify-center">
                  <Flame className="w-2.5 h-2.5 fill-current" /> Done
                </span>
              ) : item.isToday ? (
                <span className="text-slate-300">Today</span>
              ) : (
                <span className="text-slate-400">Rest</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
