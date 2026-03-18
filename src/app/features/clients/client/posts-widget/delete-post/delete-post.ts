import { Component, inject, input } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PostsService } from '../../../../../shared/services/posts-service';

@Component({
  selector: 'app-delete-post',
  imports: [Button, ConfirmDialog],
  templateUrl: './delete-post.html',
  providers: [ConfirmationService],
})
export class DeletePost {
  private postsService = inject(PostsService);

  private confirmationService = inject(ConfirmationService);

  readonly id = input.required<number>();

  confirmDelete() {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.postsService.deletePost(this.id()).subscribe(() => console.log('Great success'));
      },
      reject: () => {
        console.log('Reject');
      },
    });
  }
}
