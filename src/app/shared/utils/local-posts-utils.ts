import { TPost } from '../types/client';
import {
  getLocalItems,
  saveLocalItem,
  mergeItems,
  getNextLocalId,
  filterLocalItems,
  deleteLocalItem,
  getDeletedPostIds,
  addDeletedPostId as addDeletedPostIdToStorage,
} from './local-storage-utils';

export const getLocalPosts = (): TPost[] => getLocalItems<TPost>('posts');

export const saveLocalPost = (post: TPost): void => saveLocalItem('posts', post);

export const mergePosts = (apiPosts: TPost[], localPosts: TPost[]): TPost[] =>
  mergeItems(apiPosts, localPosts);

export const getNextLocalPostId = (): number => getNextLocalId<TPost>('posts', 2000);

export const getLocalPostsByUserId = (userId: number): TPost[] =>
  filterLocalItems<TPost>('posts', (post) => Number(post.userId) === Number(userId));

export const deleteLocalPost = (id: number): void => deleteLocalItem<TPost>('posts', id);

export const addDeletedPostId = (id: number): void => addDeletedPostIdToStorage(id);

export const filterOutDeletedPosts = (posts: TPost[]): TPost[] => {
  const deletedIds = getDeletedPostIds();
  return posts.filter((post) => !deletedIds.includes(Number(post.id)));
};
