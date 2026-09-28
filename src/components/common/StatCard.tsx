import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
    label?: string;
  };
  accentColor?: 'lime' | 'cyan' | 'amber' | 'rose' | 'purple';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon,
  trend,
  accentColor = 'lime',
  className,
}) => {
  const iconColorStyles = {
    lime: 'text-[#C6FF3D] bg-[#C6FF3D]/10 border-[#C6FF3D]/20',
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    rose: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  };

  return (
    <Card className={cn('relative overflow-hidden group', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white tabular-nums">
              {value}
            </span>
            {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div
          className={cn(
            'p-3 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105',
            iconColorStyles[accentColor]
          )}
        >
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-[#232834] flex items-center gap-1.5 text-xs">
          {trend.isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          )}
          <span
            className={cn(
              'font-semibold',
              trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend.value}
          </span>
          {trend.label && <span className="text-slate-400">{trend.label}</span>}
        </div>
      )}
    </Card>
  );
};
