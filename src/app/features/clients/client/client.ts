import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TClient, TPost } from '../../../shared/types/client';
import { Posts } from '../../posts/posts';
import { ClientInformationWidget } from './client-information-widget/client-information-widget';
import { DetailViewContent } from '../../../shared/components/detail-view/detail-view-content/detail-view-content';
import { DetailView } from '../../../shared/components/detail-view/detail-view';
import { DetailViewHeader } from '../../../shared/components/detail-view/detail-view-header/detail-view-header';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-client',
  imports: [Posts, ClientInformationWidget, DetailViewContent, DetailView, DetailViewHeader],
  templateUrl: './client.html',
  styleUrl: './client.scss',
})
export class Client implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  client = signal<TClient>(undefined);

  posts = signal<TPost[]>(undefined);

  ngOnInit() {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.client.set(data['client']);
      this.posts.set(data['posts']);
    });
  }
}
