import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, Menu, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { theme, changeTheme } = useApp();
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/workouts':
        return 'Workouts';
      case '/exercises':
        return 'Exercise Library';
      case '/progress':
        return 'Progress & PRs';
      case '/measurements':
        return 'Body Measurements';
      case '/announcements':
        return 'Gym Announcements';
      case '/profile':
        return 'Member Profile';
      case '/settings':
        return 'App Settings';
      default:
        if (pathname.startsWith('/workouts/')) return 'Workout Routine';
        return 'ApexFit';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-[var(--color-card)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile brand icon */}
        <NavLink to="/" className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C6FF3D] flex items-center justify-center text-[#0F1115]">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">APEX</span>
        </NavLink>

        {/* Page Title for Desktop */}
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="text-[11px] text-slate-400 hidden md:block">
            Cross-platform fitness management MVP
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Facility status pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-card-subtle)] border border-[var(--color-border)] text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">Facility Open 24/7</span>
        </div>

        {/* Announcements Link */}
        <NavLink
          to="/announcements"
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Announcements"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C6FF3D] shadow-[0_0_6px_#C6FF3D]" />
        </NavLink>

        {/* Theme Mode Switcher */}
        <button
          onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-300 transition-transform duration-200 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-400 transition-transform duration-200 hover:-rotate-12" />
          )}
        </button>
      </div>
    </header>
  );
};
