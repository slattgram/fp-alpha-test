import { Component, input } from '@angular/core';
import { TPost } from '../../../../shared/types/client';
import { Widget } from '../../../../shared/components/widget/widget';
import { WidgetHeader } from '../../../../shared/components/widget/widget-header/widget-header';
import { Post } from './post/post';

@Component({
  selector: 'app-posts-widget',
  imports: [Widget, WidgetHeader, Post],
  templateUrl: './posts-widget.html',
  styleUrl: './posts-widget.scss',
})
export class PostsWidget {
  readonly posts = input<TPost[]>();
}
