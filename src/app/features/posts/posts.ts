import { Component, inject, model, signal, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TPost } from '../../shared/types/client';
import { Widget } from '../../shared/components/widget/widget';
import { WidgetHeader } from '../../shared/components/widget/widget-header/widget-header';
import { Post } from './post/post';
import { CreatePost } from './create-post/create-post';
import { PostsService } from '../../shared/services/posts-service';

@Component({
  selector: 'app-posts-widget',
  imports: [Widget, WidgetHeader, Post, CreatePost, Toast],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
  providers: [MessageService],
})
export class Posts {
  private postsService = inject(PostsService);

  private messageService = inject(MessageService);

  private route = inject(ActivatedRoute);

  private destroyRef = inject(DestroyRef);

  readonly posts = model<TPost[]>();

  clientId = signal(this.route.snapshot.params['id']);

  showDeletedMessage() {
    this.messageService.add({ summary: 'Post deleted', severity: 'success' });
  }

  fetchPosts() {
    this.postsService
      .getClientPosts(this.clientId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.posts.set(res);
      });
  }
}
