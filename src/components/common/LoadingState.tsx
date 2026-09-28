import React from 'react';
import { cn } from '../../utils/cn';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading fitness data...',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center space-y-4',
        className
      )}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-[#232834] border-t-[#C6FF3D] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D] animate-pulse" />
        </div>
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{message}</p>
    </div>
  );
};
