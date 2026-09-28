import React from 'react';
import { ShieldCheck, CreditCard, Clock, CalendarDays, CheckCircle2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import type { MembershipDetails } from '../../types/models';

export interface MembershipCardProps {
  membership: MembershipDetails | null;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
  const plan = membership?.planName || 'Premium';
  const status = membership?.status || 'Active';
  const validUntil = membership?.validUntil || '31 December 2026';
  const daysRemaining = membership?.daysRemaining ?? 94;
  const progressPercent = membership?.progressPercent ?? 74;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#1C212B] via-[#171A21] to-[#12151B] border-[#293140] p-6 shadow-xl">
      {/* Decorative gradient glow orb in top corner */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#C6FF3D]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#222836] border border-[#2F374A] flex items-center justify-center text-[#C6FF3D] shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Membership Pass
              </p>
              <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {plan} VIP
                <ShieldCheck className="w-4 h-4 text-[#C6FF3D]" />
              </h3>
            </div>
          </div>

          <Badge variant="lime" size="md" dot>
            {status}
          </Badge>
        </div>

        {/* Middle Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#232834]">
          <div>
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
              Valid Until
            </span>
            <p className="text-sm font-bold text-white mt-1">{validUntil}</p>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C6FF3D]" />
              Days Remaining
            </span>
            <p className="text-sm font-bold text-[#C6FF3D] mt-1 tabular-nums">
              {daysRemaining} Days
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Annual Cycle Progress</span>
            <span className="font-semibold text-slate-200">{progressPercent}% elapsed</span>
          </div>
          <ProgressBar value={progressPercent} variant="lime" size="sm" />
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Includes 24/7 access, recovery sauna, and guest privileges</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
