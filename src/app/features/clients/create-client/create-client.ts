import { Component, inject, output, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CreateClientForm } from './create-client-form/create-client-form';

@Component({
  selector: 'app-create-client',
  imports: [Button, CreateClientForm, Dialog, Toast],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss',
  providers: [MessageService],
})
export class CreateClient {
  private messageService = inject(MessageService);

  readonly visible = signal(false);

  clientCreated = output();

  clientCreatedHandler(): void {
    this.visible.set(false);
    this.clientCreated.emit();
    this.messageService.add({ summary: 'Client Created', severity: 'success' });
  }
}
