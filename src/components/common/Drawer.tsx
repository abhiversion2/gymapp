import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'bottom' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed z-50 bg-[#171A21] border-[#272D3B] text-slate-100 shadow-2xl flex flex-col',
          position === 'bottom'
            ? 'bottom-0 inset-x-0 rounded-t-3xl max-h-[85vh] border-t'
            : 'right-0 inset-y-0 w-full max-w-md border-l'
        )}
      >
        {position === 'bottom' && (
          <div className="w-12 h-1.5 bg-slate-600 rounded-full mx-auto my-3 shrink-0" />
        )}

        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232834]">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
