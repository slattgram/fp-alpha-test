import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, combineLatest, of, tap } from 'rxjs';
import { baseUrl } from '../consts/api';
import { TPost } from '../types/client';
import { compareIds, filterByUserId } from '../utils/id-utils';
import {
  getLocalItems,
  saveLocalItem,
  mergeItems,
  getNextLocalId,
  deleteLocalItem,
  getDeletedPostIds,
  addDeletedPostId,
} from '../utils/local-storage-utils';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);

  getClientPosts(id: number) {
    const apiPosts$ = this.http.get<TPost[]>(`${baseUrl}/posts/?userId=${id}`);
    const localPosts$ = of(filterByUserId(getLocalItems<TPost>('posts'), id));

    return combineLatest([apiPosts$, localPosts$]).pipe(
      map(([apiPosts, localPosts]) => {
        const mergedPosts = mergeItems(apiPosts, localPosts);
        const deletedIds = getDeletedPostIds();
        return mergedPosts.filter((post) => !deletedIds.includes(Number(post.id)));
      }),
    );
  }

  deletePost(id: number) {
    const isLocalPost = getLocalItems<TPost>('posts').some((post) => compareIds(post.id, id));

    if (isLocalPost) {
      deleteLocalItem('posts', id);
      return of(null);
    }
    return this.http.delete(`${baseUrl}/posts/${id}`).pipe(tap(() => addDeletedPostId(id)));
  }

  createPost(post: Omit<TPost, 'id'>) {
    return this.http.post<TPost>(`${baseUrl}/posts`, post).pipe(
      map((createdPost) => {
        const postWithUniqueId = {
          ...createdPost,
          id: getNextLocalId('posts'),
        };

        saveLocalItem('posts', postWithUniqueId);
        return postWithUniqueId;
      }),
    );
  }
}
