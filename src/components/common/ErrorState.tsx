import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-rose-950/20 border border-rose-500/20',
        className
      )}
    >
      <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 mb-3">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-rose-300 max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
