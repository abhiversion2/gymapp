import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Mail,
  Calendar,
  ShieldCheck,
  Edit3,
  Settings as SettingsIcon,
  Sun,
  Moon,
  LogOut,
  CheckCircle2,
  Phone,
  Sparkles,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const {
    profile,
    membership,
    handleUpdateProfile,
    theme,
    changeTheme,
    addToast,
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleLogoutPlaceholder = () => {
    addToast({
      title: 'Demo Mode Active',
      message: 'Authentication will be fully integrated in Phase 2 with Supabase Auth.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
            <Sparkles className="w-3 h-3" />
            Member Account
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Member Profile
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage your personal details, membership credentials, and application preferences.
        </p>
      </div>

      {/* Main Member Profile Card */}
      <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-[#1C212D] via-[#171A21] to-[#12151B] border-[#293244] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar
              name={profile?.fullName || 'Abhijeet Vishwakarma'}
              src={profile?.avatarUrl}
              size="xl"
              showStatus
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {profile?.fullName || 'Abhijeet Vishwakarma'}
                </h3>
                <Badge variant="lime" size="sm" dot>
                  {profile?.status || 'Active'}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {profile?.email || 'abhijeet@example.com'}
                </span>
                {profile?.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {profile.phone}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Member since January 2026
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => setIsEditModalOpen(true)}
            leftIcon={<Edit3 className="w-4 h-4" />}
            className="sm:self-center"
          >
            Edit Profile
          </Button>
        </div>

        {/* Membership Details Sub-Card */}
        <div className="mt-6 pt-6 border-t border-[#232834] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-[#0F1115] border border-[#232834]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Membership Level
            </span>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck className="w-4 h-4 text-[#C6FF3D]" />
              <span className="text-base font-extrabold text-white">
                {membership?.planName || 'Premium'} Tier
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0F1115] border border-[#232834]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Expiration Date
            </span>
            <span className="text-base font-extrabold text-white mt-1 block">
              {membership?.validUntil || '31 Dec 2026'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0F1115] border border-[#232834]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Days Remaining
            </span>
            <span className="text-base font-extrabold text-[#C6FF3D] mt-1 block tabular-nums">
              {membership?.daysRemaining || 94} Days
            </span>
          </div>
        </div>

        {/* Member Perks */}
        {membership?.perks && (
          <div className="mt-5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Member Benefits
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {membership.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Quick Settings & Navigation Group */}
      <Card className="p-0 overflow-hidden divide-y divide-[#232834]">
        {/* Settings Route */}
        <NavLink
          to="/settings"
          className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1F2533] text-slate-300 group-hover:text-[#C6FF3D] transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">App Settings</p>
              <p className="text-xs text-slate-400">
                Manage appearance, units (KG/LB), language, and notifications
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-400">Configure</span>
        </NavLink>

        {/* Quick Theme Switcher */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1F2533] text-amber-400">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">Appearance Theme</p>
              <p className="text-xs text-slate-400">
                Currently using <strong className="capitalize text-slate-200">{theme}</strong> theme
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </div>

        {/* Logout Placeholder */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Member Session</p>
              <p className="text-xs text-slate-400">
                Sign out of this client device
              </p>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleLogoutPlaceholder}
          >
            Logout
          </Button>
        </div>
      </Card>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updates) => {
            await handleUpdateProfile(updates);
            addToast({
              title: 'Profile Updated',
              message: 'Your personal information was saved successfully.',
              type: 'success',
            });
          }}
        />
      )}
    </div>
  );
};
