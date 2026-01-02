import { AppData } from '@/types/list.types';

const STORAGE_KEY = 'lists-app-data';
const STORAGE_VERSION = '2.0';

const getDefaultData = (): AppData => ({
  lists: [],
  kanbanColumns: {},
  tags: [],
  preferences: {
    themeId: 'ocean',
    lastActiveListId: null,
  },
  version: STORAGE_VERSION,
});

// Migration function from v1.0 to v2.0
const migrateV1toV2 = (data: any): AppData => {
  return {
    ...data,
    lists: (data.lists || []).map((list: any) => ({
      ...list,
      tags: list.tags || [],
      visualStyle: list.visualStyle || 'card',
    })),
    tags: data.tags || [],
    version: '2.0',
  };
};

const migrate = (data: any): AppData => {
  const version = data.version || '1.0';

  // Apply migrations sequentially
  if (version === '1.0') {
    data = migrateV1toV2(data);
  }

  return data as AppData;
};

export const storage = {
  save: (data: AppData): void => {
    try {
      const dataWithVersion = { ...data, version: STORAGE_VERSION };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please delete some lists to free up space.');
      }
    }
  },

  load: (): AppData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return getDefaultData();
      }

      const parsed = JSON.parse(stored);

      // Migrate if needed
      if (parsed.version !== STORAGE_VERSION) {
        console.log(`Migrating data from version ${parsed.version} to ${STORAGE_VERSION}`);
        const migrated = migrate(parsed);
        // Save migrated data
        storage.save(migrated);
        return migrated;
      }

      return parsed as AppData;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return getDefaultData();
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  export: (): string => {
    const data = storage.load();
    return JSON.stringify(data, null, 2);
  },

  import: (jsonString: string): AppData | null => {
    try {
      const data = JSON.parse(jsonString) as AppData;
      storage.save(data);
      return data;
    } catch (error) {
      console.error('Failed to import data:', error);
      return null;
    }
  },
};
