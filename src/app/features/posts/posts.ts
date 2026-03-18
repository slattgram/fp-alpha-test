import { Component, inject, model, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TPost } from '../../shared/types/client';
import { Widget } from '../../shared/components/widget/widget';
import { WidgetHeader } from '../../shared/components/widget/widget-header/widget-header';
import { Post } from './post/post';
import { CreatePost } from './create-post/create-post';
import { PostsService } from '../../shared/services/posts-service';

@Component({
  selector: 'app-posts-widget',
  imports: [Widget, WidgetHeader, Post, CreatePost],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  private postsService = inject(PostsService);

  private route = inject(ActivatedRoute);

  readonly posts = model<TPost[]>();

  clientId = signal(this.route.snapshot.params['id']);

  fetchPosts() {
    this.postsService.getClientPosts(this.clientId()).subscribe((res) => {
      this.posts.set(res);
    });
  }
}
