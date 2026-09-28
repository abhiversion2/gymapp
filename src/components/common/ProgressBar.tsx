import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValueLabel?: boolean;
  valueSuffix?: string;
  variant?: 'lime' | 'electric' | 'flame' | 'purple' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValueLabel = false,
  valueSuffix = '%',
  variant = 'lime',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantStyles = {
    lime: 'bg-[#C6FF3D] shadow-[0_0_12px_rgba(198,255,61,0.5)]',
    electric: 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]',
    flame: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]',
    purple: 'bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.5)]',
    white: 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]',
  };

  const sizeStyles = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-medium text-slate-300">{label}</span>}
          {showValueLabel && (
            <span className="font-semibold text-slate-100 tabular-nums">
              {Math.round(percentage)}
              {valueSuffix}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-[#101319] border border-[#232834] rounded-full overflow-hidden p-0.5',
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
