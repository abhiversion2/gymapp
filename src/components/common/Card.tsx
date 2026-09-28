import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'glass' | 'accentBorder';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#171A21] border border-[#232834] text-slate-100 shadow-lg',
    interactive:
      'bg-[#171A21] border border-[#232834] text-slate-100 shadow-md hover:border-[#C6FF3D]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer',
    glass:
      'bg-[#171A21]/80 backdrop-blur-md border border-white/10 text-slate-100 shadow-xl',
    accentBorder:
      'bg-[#171A21] border-l-4 border-l-[#C6FF3D] border-t border-r border-b border-[#232834] text-slate-100 shadow-lg',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-5 md:p-6 transition-colors',
        variantStyles[variant],
        hoverEffect && 'hover:-translate-y-0.5 transition-transform duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
