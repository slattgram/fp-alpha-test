export interface LocalStorageItem {
  id: number;
}

const STORAGE_KEYS = {
  clients: 'local_clients',
  posts: 'local_posts',
  deletedPostIds: 'deleted_post_ids',
} as const;

const BASE_IDS = {
  clients: 1000,
  posts: 2000,
} as const;

type StorageType = keyof typeof STORAGE_KEYS;

export const getLocalItems = <T extends LocalStorageItem>(type: StorageType): T[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[type]);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveLocalItem = <T extends LocalStorageItem>(type: StorageType, item: T): void => {
  try {
    const localItems = getLocalItems<T>(type);
    localItems.push(item);
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(localItems));
  } catch {
    // Silent fail - could add logging here
  }
};

export const mergeItems = <T extends LocalStorageItem>(apiItems: T[], localItems: T[]): T[] => {
  const merged = [...apiItems, ...localItems];
  return merged.sort((a, b) => a.id - b.id);
};

export const getNextLocalId = <T extends LocalStorageItem>(type: StorageType): number => {
  const localItems = getLocalItems<T>(type);
  const maxId = Math.max(...localItems.map((item) => item.id), 0);
  return Math.max(maxId, BASE_IDS[type]) + 1;
};

export const getLocalItemById = <T extends LocalStorageItem>(
  type: StorageType,
  id: number,
): T | undefined => getLocalItems<T>(type).find((item) => Number(item.id) === Number(id));

export const filterLocalItems = <T extends LocalStorageItem>(
  type: StorageType,
  predicate: (item: T) => boolean,
): T[] => getLocalItems<T>(type).filter(predicate);

export const deleteLocalItem = <T extends LocalStorageItem>(
  type: StorageType,
  id: number,
): void => {
  const localItems = getLocalItems<T>(type);
  const filteredItems = localItems.filter((item) => Number(item.id) !== Number(id));
  localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(filteredItems));
};

export const getDeletedPostIds = (): number[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.deletedPostIds);
  return stored ? JSON.parse(stored) : [];
};

export const addDeletedPostId = (id: number): void => {
  const deletedIds = getDeletedPostIds();
  if (!deletedIds.includes(Number(id))) {
    deletedIds.push(Number(id));
    localStorage.setItem(STORAGE_KEYS.deletedPostIds, JSON.stringify(deletedIds));
  }
};

export const clearAllLocalStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch {
    // Silent fail - could add logging here
  }
};
