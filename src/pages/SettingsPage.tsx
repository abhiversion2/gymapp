import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Laptop,
  Bell,
  Scale,
  Globe,
  Save,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import type { UserPreferences } from '../types/models';

export const SettingsPage: React.FC = () => {
  const { preferences, handleUpdatePreferences, theme, changeTheme, addToast } = useApp();

  const [appearance, setAppearance] = useState<'dark' | 'light' | 'system'>(
    theme || 'dark'
  );
  const [workoutReminders, setWorkoutReminders] = useState(
    preferences?.notifications.workoutReminders ?? true
  );
  const [gymAnnouncements, setGymAnnouncements] = useState(
    preferences?.notifications.gymAnnouncements ?? true
  );
  const [units, setUnits] = useState<'kg' | 'lbs'>(preferences?.units || 'kg');
  const [language, setLanguage] = useState<UserPreferences['language']>(
    preferences?.language || 'English'
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (preferences) {
      setWorkoutReminders(preferences.notifications.workoutReminders);
      setGymAnnouncements(preferences.notifications.gymAnnouncements);
      setUnits(preferences.units);
      setLanguage(preferences.language);
    }
  }, [preferences]);

  const handleAppearanceChange = (mode: 'dark' | 'light' | 'system') => {
    setAppearance(mode);
    changeTheme(mode);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await handleUpdatePreferences({
        appearance,
        notifications: {
          workoutReminders,
          gymAnnouncements,
        },
        units,
        language,
      });

      addToast({
        title: 'Settings Saved',
        message: 'Your preferences have been persisted to local storage.',
        type: 'success',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
              <Sparkles className="w-3 h-3" />
              Preferences
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Application Settings
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Customize UI appearance, measurement standards, and alert channels.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          isLoading={isSaving}
          leftIcon={<Save className="w-4 h-4" />}
          className="shadow-[0_0_20px_rgba(198,255,61,0.25)]"
        >
          Save Preferences
        </Button>
      </div>

      {/* 1. Appearance Section */}
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#C6FF3D]" />
            Appearance
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select your preferred interface color theme
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: 'dark',
              label: 'Dark',
              desc: 'High contrast OLED black',
              icon: <Moon className="w-5 h-5" />,
            },
            {
              id: 'light',
              label: 'Light',
              desc: 'Clean bright daytime surface',
              icon: <Sun className="w-5 h-5" />,
            },
            {
              id: 'system',
              label: 'System',
              desc: 'Sync with operating system',
              icon: <Laptop className="w-5 h-5" />,
            },
          ].map((item) => {
            const isSelected = appearance === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAppearanceChange(item.id as 'dark' | 'light' | 'system')}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-3',
                  isSelected
                    ? 'bg-[#1F2533] border-[#C6FF3D] text-white shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]'
                    : 'bg-[#0F1115] border-[#232834] text-slate-400 hover:text-white hover:border-slate-600'
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={cn(isSelected ? 'text-[#C6FF3D]' : 'text-slate-400')}>
                    {item.icon}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C6FF3D]" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 2. Notifications Section */}
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            Notifications
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure mobile push and desktop reminders
          </p>
        </div>

        <div className="divide-y divide-[#232834]">
          <div className="py-3.5 first:pt-0 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Workout Reminders</p>
              <p className="text-xs text-slate-400">
                Receive scheduled alerts for planned training sessions
              </p>
            </div>
            <button
              type="button"
              onClick={() => setWorkoutReminders(!workoutReminders)}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative p-0.5 flex items-center',
                workoutReminders ? 'bg-[#C6FF3D]' : 'bg-[#232834]'
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded-full bg-[#0F1115] shadow-md transition-transform duration-200',
                  workoutReminders ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          <div className="py-3.5 last:pb-0 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Gym Announcements</p>
              <p className="text-xs text-slate-400">
                Facility alerts, equipment installations, and class schedules
              </p>
            </div>
            <button
              type="button"
              onClick={() => setGymAnnouncements(!gymAnnouncements)}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative p-0.5 flex items-center',
                gymAnnouncements ? 'bg-[#C6FF3D]' : 'bg-[#232834]'
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded-full bg-[#0F1115] shadow-md transition-transform duration-200',
                  gymAnnouncements ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* 3. Units & Localization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              Units of Measurement
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Weight values used across all workout sets and measurements
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'kg', label: 'Kilograms (KG)', desc: 'Metric' },
              { id: 'lbs', label: 'Pounds (LB)', desc: 'Imperial' },
            ].map((u) => {
              const isSelected = units === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUnits(u.id as 'kg' | 'lbs')}
                  className={cn(
                    'p-3.5 rounded-xl border text-center transition-all',
                    isSelected
                      ? 'bg-[#1F2533] border-[#C6FF3D] text-white ring-1 ring-[#C6FF3D]'
                      : 'bg-[#0F1115] border-[#232834] text-slate-400 hover:text-white'
                  )}
                >
                  <p className="text-sm font-bold">{u.label}</p>
                  <span className="text-[10px] text-slate-400">{u.desc}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              Language
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              App locale and date formatting conventions
            </p>
          </div>

          <div className="pt-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as UserPreferences['language'])}
              className="w-full rounded-xl bg-[#0F1115] border border-[#232834] px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#C6FF3D]"
            >
              <option value="English">English (United States)</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="German">Deutsch</option>
            </select>
          </div>
        </Card>
      </div>

      {/* Cloud & Supabase Architecture Status Card */}
      <Card className="p-5 rounded-2xl bg-[#171A21] border border-[#232834] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D] animate-pulse" />
            <h4 className="text-sm font-bold text-white">Data Architecture Ready for Supabase</h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active data layer running in high-performance local memory with pre-wired Supabase service handlers.
          </p>
        </div>

        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-[#0F1115] text-[#C6FF3D] border border-[#242A38] shrink-0">
          v1.0.0-MVP
        </span>
      </Card>
    </div>
  );
};
