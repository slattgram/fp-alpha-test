import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../shared/services/posts-service';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { ErrorPipe } from '../../../../shared/pipes/error-pipe';

@Component({
  selector: 'app-create-post-form',
  imports: [ReactiveFormsModule, Textarea, FormInput, InputText, ErrorPipe, Button],
  templateUrl: './create-post-form.html',
  styleUrl: './create-post-form.scss',
})
export class CreatePostForm {
  private route = inject(ActivatedRoute);

  private fb = inject(UntypedFormBuilder);

  private postsService = inject(PostsService);

  postCreated = output<boolean>();

  submitted = signal(false);

  readonly clientId = signal<number>(this.route.snapshot.params['id']);

  form = this.fb.group({
    title: ['', Validators.required],
    body: [''],
  });

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.submitted());
  }

  submit() {
    this.submitted.set(true);

    if (this.form.valid) {
      this.postsService
        .createPost({ ...this.form.value, userId: this.clientId() })
        .subscribe(() => {
          this.postCreated.emit(true);
        });
    }
  }
}
