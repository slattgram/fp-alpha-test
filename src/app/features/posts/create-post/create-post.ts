import { Component, inject, output, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CreatePostForm } from './create-post-form/create-post-form';

@Component({
  selector: 'app-create-post',
  imports: [Button, Dialog, CreatePostForm, Toast],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss',
  providers: [MessageService],
})
export class CreatePost {
  readonly messageService = inject(MessageService);

  readonly visible = signal(false);

  postCreated = output();

  postCreatedHandler(): void {
    this.messageService.add({ summary: 'Post created', severity: 'success' });
    this.visible.set(false);
    this.postCreated.emit();
  }
}
