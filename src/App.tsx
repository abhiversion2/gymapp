import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { WorkoutDetailPage } from './pages/WorkoutDetailPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { ProgressPage } from './pages/ProgressPage';
import { MeasurementsPage } from './pages/MeasurementsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="workouts" element={<WorkoutsPage />} />
            <Route path="workouts/:workoutId" element={<WorkoutDetailPage />} />
            <Route path="exercises" element={<ExercisesPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="measurements" element={<MeasurementsPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
