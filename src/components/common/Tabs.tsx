import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  size = 'md',
}) => {
  return (
    <div
      className={cn(
        'inline-flex p-1 bg-[#101319] border border-[#232834] rounded-xl overflow-x-auto max-w-full scrollbar-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-150 select-none',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              isActive
                ? 'bg-[#1F2533] text-[#C6FF3D] shadow-sm font-semibold border border-[#2F374A]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-bold',
                  isActive
                    ? 'bg-[#C6FF3D]/20 text-[#C6FF3D]'
                    : 'bg-slate-800 text-slate-400'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
