export interface LocalStorageItem {
  id: number;
}

const STORAGE_KEYS = {
  clients: 'local_clients',
  posts: 'local_posts',
  deletedPostIds: 'deleted_post_ids',
} as const;

type StorageType = keyof typeof STORAGE_KEYS;

export const getLocalItems = <T extends LocalStorageItem>(type: StorageType): T[] => {
  const stored = localStorage.getItem(STORAGE_KEYS[type]);
  return stored ? JSON.parse(stored) : [];
};

export const saveLocalItem = <T extends LocalStorageItem>(type: StorageType, item: T): void => {
  const localItems = getLocalItems<T>(type);
  localItems.push(item);
  localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(localItems));
};

export const mergeItems = <T extends LocalStorageItem>(apiItems: T[], localItems: T[]): T[] => {
  const merged = [...apiItems, ...localItems];
  return merged.sort((a, b) => a.id - b.id);
};

export const getNextLocalId = <T extends LocalStorageItem>(
  type: StorageType,
  baseId = 1000,
): number => {
  const localItems = getLocalItems<T>(type);
  const maxId = Math.max(...localItems.map((item) => item.id), 0);
  return Math.max(maxId, baseId) + 1;
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
