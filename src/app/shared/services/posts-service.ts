import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../consts/api';
import { TPost } from '../types/client';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);

  getClientPosts(id: number) {
    return this.http.get<TPost[]>(`${baseUrl}/posts/?userId=${id}`);
  }

  deletePost(id: number) {
    return this.http.delete(`${baseUrl}/posts/${id}`);
  }
}
