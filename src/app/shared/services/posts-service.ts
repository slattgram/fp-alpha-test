import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, combineLatest, of, tap } from 'rxjs';
import { baseUrl } from '../consts/api';
import { TPost } from '../types/client';
import {
  getLocalPosts,
  saveLocalPost,
  mergePosts,
  getNextLocalPostId,
  getLocalPostsByUserId,
  deleteLocalPost,
  addDeletedPostId,
  filterOutDeletedPosts,
} from '../utils/local-posts-utils';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);

  getClientPosts(id: number) {
    const apiPosts$ = this.http.get<TPost[]>(`${baseUrl}/posts/?userId=${id}`);
    const localPosts$ = of(getLocalPostsByUserId(id));

    return combineLatest([apiPosts$, localPosts$]).pipe(
      map(([apiPosts, localPosts]) => {
        const mergedPosts = mergePosts(apiPosts, localPosts);
        return filterOutDeletedPosts(mergedPosts);
      }),
    );
  }

  deletePost(id: number) {
    const isLocalPost = getLocalPosts().some((post) => Number(post.id) === Number(id));

    if (isLocalPost) {
      deleteLocalPost(id);
      return of(null);
    }
    return this.http.delete(`${baseUrl}/posts/${id}`).pipe(tap(() => addDeletedPostId(id)));
  }

  createPost(post: Omit<TPost, 'id'>) {
    return this.http.post<TPost>(`${baseUrl}/posts`, post).pipe(
      map((createdPost) => {
        const postWithUniqueId = {
          ...createdPost,
          id: getNextLocalPostId(),
        };

        saveLocalPost(postWithUniqueId);
        return postWithUniqueId;
      }),
    );
  }
}
