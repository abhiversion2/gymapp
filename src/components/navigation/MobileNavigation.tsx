import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  LineChart,
  User,
  MoreHorizontal,
  BookOpen,
  Scale,
  Bell,
  Settings,
} from 'lucide-react';
import { Drawer } from '../common/Drawer';
import { cn } from '../../utils/cn';

export interface MobileNavigationProps {
  isMenuOpen?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isMenuOpen: externalMenuOpen,
  setIsMenuOpen: externalSetMenuOpen,
}) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = externalMenuOpen !== undefined ? externalMenuOpen : internalMenuOpen;
  const setIsMenuOpen = externalSetMenuOpen || setInternalMenuOpen;

  const mainTabs = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Workouts', path: '/workouts', icon: <Dumbbell className="w-5 h-5" /> },
    { label: 'Progress', path: '/progress', icon: <LineChart className="w-5 h-5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  const moreItems = [
    {
      label: 'Exercise Library',
      path: '/exercises',
      desc: 'Browse 14+ exercises & techniques',
      icon: <BookOpen className="w-5 h-5 text-[#C6FF3D]" />,
    },
    {
      label: 'Body Measurements',
      path: '/measurements',
      desc: 'Track weight, body fat & circumferences',
      icon: <Scale className="w-5 h-5 text-cyan-400" />,
    },
    {
      label: 'Gym Announcements',
      path: '/announcements',
      desc: 'Latest facility schedules & news',
      icon: <Bell className="w-5 h-5 text-amber-400" />,
    },
    {
      label: 'Settings',
      path: '/settings',
      desc: 'Theme, notifications & units',
      icon: <Settings className="w-5 h-5 text-slate-400" />,
    },
  ];

  return (
    <>
      {/* Bottom Fixed Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#101217]/95 backdrop-blur-xl border-t border-[#202532] px-2 py-1.5 safe-area-bottom">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-150 min-w-[60px]',
                  isActive
                    ? 'text-[#C6FF3D] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'p-1 rounded-lg transition-transform',
                      isActive && 'scale-110'
                    )}
                  >
                    {tab.icon}
                  </div>
                  <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#C6FF3D] mt-0.5 shadow-[0_0_6px_#C6FF3D]" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* More Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-slate-400 hover:text-slate-200 transition-all min-w-[60px]"
            aria-label="More options"
          >
            <div className="p-1">
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* More Options Drawer Sheet */}
      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="More Features"
        position="bottom"
      >
        <div className="space-y-2 pb-6">
          <p className="text-xs text-slate-400 mb-3">
            Quickly navigate to fitness libraries and club management tools.
          </p>
          {moreItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-[#1F242F] border border-[#2B3342] hover:border-[#C6FF3D]/40 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-[#171A21] border border-[#272E3D]">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{item.desc}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </Drawer>
    </>
  );
};
