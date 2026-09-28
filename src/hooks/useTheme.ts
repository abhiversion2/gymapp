import { useState, useEffect } from 'react';
import { getUserPreferences, updateUserPreferences } from '../services/members';

export type ThemeMode = 'dark' | 'light' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    getUserPreferences().then((prefs) => {
      setTheme(prefs.appearance);
      applyTheme(prefs.appearance);
    });
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    const isDark =
      mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const changeTheme = async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    await updateUserPreferences({ appearance: newTheme });
  };

  return { theme, changeTheme };
}
