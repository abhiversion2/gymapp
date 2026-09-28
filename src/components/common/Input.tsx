import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[var(--color-text)] opacity-90 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[var(--color-muted)] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]',
              'focus:outline-none focus:border-[#C6FF3D] focus:ring-1 focus:ring-[#C6FF3D]/50 transition-colors duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-10' : undefined,
              rightIcon ? 'pr-10' : undefined,
              error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/50' : undefined,
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[var(--color-muted)] flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
