import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import type { Profile } from '../../types/models';

export interface WelcomeHeaderProps {
  profile: Profile | null;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ profile }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTodayFormatted = () => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(new Date());
  };

  const firstName = profile?.fullName ? profile.fullName.split(' ')[0] : 'Abhijeet';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
            <Sparkles className="w-3 h-3" />
            Daily Motivation
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {getTodayFormatted()}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {getGreeting()}, {firstName} 👋
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Ready for today&apos;s workout? You are on a 7-day streak!
        </p>
      </div>
    </div>
  );
};
