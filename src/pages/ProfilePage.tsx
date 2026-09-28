import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  AlertCircle,
  Phone,
  Sparkles,
  KeyRound,
  Trash2,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { ChangePasswordModal } from '../components/profile/ChangePasswordModal';
import { DeleteAccountModal } from '../components/profile/DeleteAccountModal';
import { useApp } from '../context/AppContext';
import { useAuth } from '../auth/useAuth';
import type { Profile } from '../types/models';

export const ProfilePage: React.FC = () => {
  const {
    profile: appProfile,
    membership,
    handleUpdateProfile,
    theme,
    changeTheme,
    addToast,
  } = useApp();

  const {
    user,
    profile: authProfile,
    isEmailVerified,
    signOut,
    updateProfileData,
  } = useAuth();

  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active display profile (prefer auth context profile if present)
  const currentProfile = authProfile || appProfile;
  const currentEmail = user?.email || currentProfile?.email || 'abhijeet@example.com';
  const currentMobile = currentProfile?.mobileNumber || currentProfile?.phone || '+91 9876543210';
  const currentFullName = currentProfile?.fullName || 'Abhijeet Vishwakarma';
  const currentDob = currentProfile?.dateOfBirth;

  const handleLogout = async () => {
    try {
      await signOut();
      addToast({
        title: 'Logged Out',
        message: 'You have been safely signed out.',
        type: 'info',
      });
      navigate('/login', { replace: true });
    } catch {
      navigate('/login', { replace: true });
    }
  };

  const handleSaveProfile = async (updates: Partial<Profile>) => {
    try {
      if (user) {
        await updateProfileData(updates);
      }
      await handleUpdateProfile(updates);
      addToast({
        title: 'Profile Updated',
        message: 'Your personal information was saved successfully.',
        type: 'success',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not save profile.';
      addToast({
        title: 'Update Failed',
        message: msg,
        type: 'error',
      });
    }
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
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Member Profile
        </h2>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Manage your personal details, credentials, membership, and security settings.
        </p>
      </div>

      {/* Main Member Profile Card */}
      <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-[#1C212D] via-[#171A21] to-[#12151B] border-[#293244] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar
              name={currentFullName}
              src={currentProfile?.avatarUrl}
              size="xl"
              showStatus
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {currentFullName}
                </h3>
                <Badge variant="lime" size="sm" dot>
                  {currentProfile?.status || 'Active'}
                </Badge>
                {/* Email Verification status badge */}
                {isEmailVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <NavLink
                    to="/verify-email"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Verify Email
                  </NavLink>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {currentEmail}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  {currentMobile}
                </span>
                {currentDob && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    DOB: {currentDob}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Member since {currentProfile?.memberSince || 'January 2026'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-center flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              leftIcon={<Edit3 className="w-4 h-4" />}
            >
              Edit Profile
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsChangePasswordOpen(true)}
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              Password
            </Button>
          </div>
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
                {membership?.planName || currentProfile?.membershipPlan || 'Premium'} Tier
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

      {/* Account Management & Security Actions */}
      <Card className="p-0 overflow-hidden divide-y divide-[var(--color-border)]">
        {/* Settings Route */}
        <NavLink
          to="/settings"
          className="p-4 flex items-center justify-between hover:bg-[var(--color-card)]/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--color-bg)] text-[var(--color-muted)] group-hover:text-amber-500 transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-text)]">App Settings</p>
              <p className="text-xs text-[var(--color-muted)]">
                Manage appearance, units (KG/LB), language, and notifications
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[var(--color-muted)]">Configure</span>
        </NavLink>

        {/* Change Password Action */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--color-bg)] text-amber-500">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-text)]">Security Credentials</p>
              <p className="text-xs text-[var(--color-muted)]">
                Update account password and security keys
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsChangePasswordOpen(true)}
          >
            Change Password
          </Button>
        </div>

        {/* Quick Theme Switcher */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--color-bg)] text-amber-400">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-text)]">Appearance Theme</p>
              <p className="text-xs text-[var(--color-muted)]">
                Currently using <strong className="capitalize text-[var(--color-text)]">{theme}</strong> mode
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

        {/* Logout */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-text)]">Sign Out</p>
              <p className="text-xs text-[var(--color-muted)]">
                Securely terminate session on this device
              </p>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Delete Account */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-rose-400">Delete Account</p>
              <p className="text-xs text-[var(--color-muted)]">
                Permanently erase profile, workouts, and fitness records
              </p>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Account
          </Button>
        </div>
      </Card>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={currentProfile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onSuccessToast={() =>
          addToast({
            title: 'Password Changed',
            message: 'Your password was successfully updated.',
            type: 'success',
          })
        }
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
