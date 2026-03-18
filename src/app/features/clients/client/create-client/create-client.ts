import { Component, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { CreateClientForm } from './create-client-form/create-client-form';

@Component({
  selector: 'app-create-client',
  imports: [Button, CreateClientForm, Dialog],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss',
})
export class CreateClient {
  readonly visible = signal(false);
}
