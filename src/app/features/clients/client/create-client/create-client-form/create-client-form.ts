import { Component, inject, output, signal, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ClientsService } from '../../../../../shared/services/clients-service';
import { FormInput } from '../../../../../shared/components/form-input/form-input';
import { ErrorPipe } from '../../../../../shared/pipes/error-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-client-form',
  imports: [ReactiveFormsModule, Button, FormInput, InputText, ErrorPipe],
  templateUrl: './create-client-form.html',
  styleUrl: './create-client-form.scss',
})
export class CreateClientForm {
  private fb = inject(UntypedFormBuilder);
  private clientsService = inject(ClientsService);
  private destroyRef = inject(DestroyRef);

  clientCreated = output<boolean>();

  submitted = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.submitted());
  }

  submit() {
    this.submitted.set(true);

    if (this.form.valid) {
      this.clientsService.createClient(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.clientCreated.emit(true);
      });
    }
  }
}
