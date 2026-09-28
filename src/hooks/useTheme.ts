import { useState, useEffect, useCallback } from 'react';
import { getUserPreferences, updateUserPreferences } from '../services/members';

export type ThemeMode = 'dark' | 'light' | 'system';

const STORAGE_THEME_KEY = 'apexfit_theme';

function getStoredTheme(): ThemeMode {
  try {
    const direct = localStorage.getItem(STORAGE_THEME_KEY);
    if (direct === 'dark' || direct === 'light' || direct === 'system') {
      return direct;
    }
    const prefs = localStorage.getItem('apexfit_preferences');
    if (prefs) {
      const parsed = JSON.parse(prefs);
      if (parsed.appearance) return parsed.appearance;
    }
  } catch {
    // fallback
  }
  return 'dark';
}

function applyThemeToDOM(mode: ThemeMode) {
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
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const initial = getStoredTheme();
    applyThemeToDOM(initial);
    return initial;
  });

  const changeTheme = useCallback(async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
      await updateUserPreferences({ appearance: newTheme });
    } catch (e) {
      console.warn('Failed persisting theme preference', e);
    }
  }, []);

  useEffect(() => {
    // Listen for system theme changes if in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyThemeToDOM('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    // Initial sync from stored member preferences
    getUserPreferences().then((prefs) => {
      if (prefs.appearance && prefs.appearance !== theme) {
        setTheme(prefs.appearance);
        applyThemeToDOM(prefs.appearance);
      }
    });

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, changeTheme };
}
