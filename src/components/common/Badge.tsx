import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'lime' | 'blue' | 'orange' | 'purple' | 'neutral' | 'success' | 'danger';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'lime',
  size = 'md',
  dot = false,
  ...props
}) => {
  const variantStyles = {
    lime: 'bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/25',
    blue: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25',
    orange: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/25',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/25',
  };

  const dotColors = {
    lime: 'bg-[#C6FF3D]',
    blue: 'bg-cyan-400',
    orange: 'bg-amber-400',
    purple: 'bg-purple-400',
    neutral: 'bg-slate-400',
    success: 'bg-emerald-400',
    danger: 'bg-rose-400',
  };

  const sizeStyles = {
    sm: 'text-[11px] font-semibold px-2 py-0.5 rounded-md gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-lg gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center tracking-wide uppercase',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
};
