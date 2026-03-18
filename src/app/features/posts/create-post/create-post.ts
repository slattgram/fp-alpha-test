import { Component, output, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { CreatePostForm } from './create-post-form/create-post-form';

@Component({
  selector: 'app-create-post',
  imports: [Button, Dialog, CreatePostForm],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss',
})
export class CreatePost {
  readonly visible = signal(false);

  postCreated = output();
}
