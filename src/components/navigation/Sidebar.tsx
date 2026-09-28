import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  LineChart,
  Scale,
  Bell,
  Settings,
  ChevronRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/cn';
import type { Profile, MembershipDetails } from '../../types/models';

export interface SidebarProps {
  profile: Profile | null;
  membership: MembershipDetails | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ profile, membership }) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Workouts', path: '/workouts', icon: <Dumbbell className="w-5 h-5" /> },
    { label: 'Exercises', path: '/exercises', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Progress', path: '/progress', icon: <LineChart className="w-5 h-5" /> },
    { label: 'Measurements', path: '/measurements', icon: <Scale className="w-5 h-5" /> },
    {
      label: 'Announcements',
      path: '/announcements',
      icon: <Bell className="w-5 h-5" />,
      badge: 'New',
    },
    { label: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[var(--color-card)] border-r border-[var(--color-border)] h-screen sticky top-0 shrink-0 select-none z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-6 pb-5 flex items-center justify-between border-b border-[var(--color-border)]">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C6FF3D] to-[#88CA05] flex items-center justify-center text-[#0F1115] shadow-[0_0_20px_rgba(198,255,61,0.3)] transition-transform duration-200 group-hover:scale-105">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">APEX</span>
              <span className="text-xl font-extrabold tracking-tight text-[#C6FF3D]">FIT</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Club & Conditioning
            </p>
          </div>
        </NavLink>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
          PRO
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Navigation
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-[#191D26] text-white border border-[#2B3244] shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-[#C6FF3D]' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <Badge variant="lime" size="sm">
                    {item.badge}
                  </Badge>
                ) : isActive ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D]" />
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Profile Widget */}
      <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-card-subtle)]">
        <NavLink
          to="/profile"
          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-[var(--color-border)]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              name={profile?.fullName || 'Abhijeet Vishwakarma'}
              src={profile?.avatarUrl}
              size="md"
              showStatus
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-[#C6FF3D] transition-colors">
                {profile?.fullName || 'Abhijeet V.'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF3D]" />
                <span className="truncate">{membership?.planName || 'Premium'} Member</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
        </NavLink>
      </div>
    </aside>
  );
};
