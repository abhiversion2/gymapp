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
    default: 'bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] shadow-lg',
    interactive:
      'bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] shadow-md hover:border-[#C6FF3D]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200 cursor-pointer',
    glass:
      'bg-[var(--color-card)]/80 backdrop-blur-md border border-white/10 text-[var(--color-text)] shadow-xl',
    accentBorder:
      'bg-[var(--color-card)] border-l-4 border-l-[#C6FF3D] border-t border-r border-b border-[var(--color-border)] text-[var(--color-text)] shadow-lg',
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
