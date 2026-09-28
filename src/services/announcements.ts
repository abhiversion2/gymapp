import { mockAnnouncements } from '../data/mockData';
import type { Announcement } from '../types/models';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export async function getAnnouncements(): Promise<Announcement[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          date: row.created_at.split('T')[0],
          category: row.category as Announcement['category'],
          isImportant: row.is_important,
        }));
      }
    } catch (err) {
      console.warn('Supabase query failed, returning mock announcements:', err);
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockAnnouncements]), 50);
  });
}
