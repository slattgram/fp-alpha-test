import { Component, inject, input, output, DestroyRef } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostsService } from '../../../shared/services/posts-service';

@Component({
  selector: 'app-delete-post',
  imports: [Button, ConfirmDialog],
  templateUrl: './delete-post.html',
  providers: [ConfirmationService],
})
export class DeletePost {
  private postsService = inject(PostsService);

  private confirmationService = inject(ConfirmationService);

  private destroyRef = inject(DestroyRef);

  readonly id = input.required<number>();

  delete = output();

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
        this.postsService
          .deletePost(this.id())
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.delete.emit();
          });
      },
      reject: () => {},
    });
  }
}
