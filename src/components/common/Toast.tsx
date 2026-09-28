import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import type { ToastItem } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

export interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#C6FF3D]" />,
    info: <Info className="w-5 h-5 text-cyan-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    error: <XCircle className="w-5 h-5 text-rose-400" />,
  };

  const borders = {
    success: 'border-[#C6FF3D]/40',
    info: 'border-cyan-500/40',
    warning: 'border-amber-500/40',
    error: 'border-rose-500/40',
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const type = toast.type || 'success';
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#171A21] border text-slate-100 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3',
              borders[type]
            )}
          >
            <div className="shrink-0 mt-0.5">{icons[type]}</div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-white">{toast.title}</h5>
              {toast.message && (
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
