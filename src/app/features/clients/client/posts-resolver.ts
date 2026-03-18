import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PostsService } from '../../../shared/services/posts-service';

export const postsResolver: ResolveFn<any> = (route) => {
  const postsService = inject(PostsService);
  const { id } = route.params;

  return postsService.getClientPosts(id);
};
