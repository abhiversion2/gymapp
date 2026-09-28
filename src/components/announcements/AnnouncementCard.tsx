import React from 'react';
import { Calendar, Bell, Sparkles, AlertCircle, Dumbbell, Clock, Users } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import type { Announcement } from '../../types/models';

export interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const categoryIcons = {
    Facility: <Clock className="w-4 h-4 text-cyan-400" />,
    Equipment: <Dumbbell className="w-4 h-4 text-[#C6FF3D]" />,
    Classes: <Sparkles className="w-4 h-4 text-purple-400" />,
    Schedule: <Calendar className="w-4 h-4 text-amber-400" />,
    Community: <Users className="w-4 h-4 text-emerald-400" />,
  };

  const categoryBadgeVariant = {
    Facility: 'blue',
    Equipment: 'lime',
    Classes: 'purple',
    Schedule: 'orange',
    Community: 'success',
  } as const;

  return (
    <Card className="p-5 sm:p-6 bg-[#171A21] border-[#242A38] hover:border-[#C6FF3D]/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0F1115] border border-[#232834]">
            {categoryIcons[announcement.category] || <Bell className="w-4 h-4 text-slate-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge
                variant={categoryBadgeVariant[announcement.category] || 'neutral'}
                size="sm"
              >
                {announcement.category}
              </Badge>
              {announcement.isImportant && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <AlertCircle className="w-3 h-3" />
                  Important
                </span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
              {announcement.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0 self-start sm:self-center">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{announcement.date}</span>
        </div>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed pl-0 sm:pl-12">
        {announcement.description}
      </p>
    </Card>
  );
};
