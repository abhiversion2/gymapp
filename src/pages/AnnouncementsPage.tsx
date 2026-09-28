import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { AnnouncementCard } from '../components/announcements/AnnouncementCard';
import { Tabs } from '../components/common/Tabs';
import { LoadingState } from '../components/common/LoadingState';
import { useAnnouncements } from '../hooks/useAnnouncements';

export const AnnouncementsPage: React.FC = () => {
  const {
    announcements,
    allAnnouncements,
    loading,
    filterCategory,
    setFilterCategory,
  } = useAnnouncements();

  const filterTabs = [
    { id: 'All', label: 'All Updates', badge: allAnnouncements.length },
    { id: 'Facility', label: 'Facility' },
    { id: 'Equipment', label: 'Equipment' },
    { id: 'Classes', label: 'Classes' },
    { id: 'Community', label: 'Community' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
              <Sparkles className="w-3 h-3" />
              Club Communications
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gym Announcements
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Stay informed with facility operational hours, equipment deliveries, and classes.
          </p>
        </div>

        <Tabs
          tabs={filterTabs}
          activeTab={filterCategory}
          onChange={setFilterCategory}
        />
      </div>

      {/* Announcements List */}
      {loading ? (
        <LoadingState message="Fetching gym broadcasts..." />
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}

      {/* Notification Preferences Helper */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#171A21] border border-[#232834] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#222836] border border-[#2B3549] flex items-center justify-center text-amber-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Broadcast Alerts Enabled</h4>
            <p className="text-xs text-slate-400">
              You will receive push notices for emergency closures and high-priority updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
