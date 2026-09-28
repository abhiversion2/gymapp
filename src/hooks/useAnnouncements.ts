import { useState, useEffect, useCallback } from 'react';
import type { Announcement } from '../types/models';
import { getAnnouncements } from '../services/announcements';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredAnnouncements = announcements.filter((item) => {
    if (filterCategory === 'All') return true;
    return item.category === filterCategory;
  });

  return {
    announcements: filteredAnnouncements,
    allAnnouncements: announcements,
    loading,
    filterCategory,
    setFilterCategory,
    refreshAnnouncements: loadData,
  };
}
