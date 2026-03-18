import { Component, input, output } from '@angular/core';
import { DeletePost } from '../delete-post/delete-post';

@Component({
  selector: 'app-post',
  imports: [DeletePost],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post {
  readonly label = input.required<string>();

  readonly value = input.required<string>();

  readonly id = input.required<number>();

  delete = output();
}
