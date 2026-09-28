import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Navbar } from '../components/navigation/Navbar';
import { MobileNavigation } from '../components/navigation/MobileNavigation';
import { WorkoutTrackerModal } from '../components/workouts/WorkoutTrackerModal';
import { WorkoutCompleteModal } from '../components/workouts/WorkoutCompleteModal';
import { Toast } from '../components/common/Toast';
import { useApp } from '../context/AppContext';

export const AppLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const {
    profile,
    membership,
    activeTracking,
    completedSummary,
    updateSet,
    addSet,
    cancelTracking,
    completeWorkout,
    dismissCompletedSummary,
    toasts,
    removeToast,
  } = useApp();

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 flex flex-col lg:flex-row transition-colors selection:bg-[#C6FF3D] selection:text-black">
      {/* Desktop Left Sidebar */}
      <Sidebar profile={profile} membership={membership} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation & Drawer */}
      <MobileNavigation
        isMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMobileMenuOpen}
      />

      {/* Active Workout Session Tracker Modal */}
      {activeTracking && (
        <WorkoutTrackerModal
          isOpen={Boolean(activeTracking)}
          workout={activeTracking.workout}
          exercises={activeTracking.exercises}
          startTime={activeTracking.startTime}
          onClose={cancelTracking}
          onUpdateSet={updateSet}
          onAddSet={addSet}
          onComplete={completeWorkout}
        />
      )}

      {/* Workout Complete Celebration Modal */}
      {completedSummary && (
        <WorkoutCompleteModal
          isOpen={Boolean(completedSummary)}
          summary={completedSummary}
          onClose={dismissCompletedSummary}
          onNavigateProgress={() => navigate('/progress')}
        />
      )}

      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
