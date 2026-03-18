import { Component, signal, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { InputText } from 'primeng/inputtext';
import { ClientsService } from '../../shared/services/clients-service';
import { TClient } from '../../shared/types/client';
import { RelativeTimePipe } from '../../shared/pipes/relative-time-pipe';
import { CreateClient } from './client/create-client/create-client';
import { TableViewHeader } from '../../shared/components/table-view/table-view-header/table-view-header';
import { TableView } from '../../shared/components/table-view/table-view';

@Component({
  selector: 'app-clients',
  imports: [
    TableModule,
    RouterLink,
    RelativeTimePipe,
    CreateClient,
    TableViewHeader,
    TableView,
    InputText,
  ],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients implements OnInit {
  readonly clientsService = inject(ClientsService);

  readonly clients = signal<TClient[]>([]);

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientsService.getClients().subscribe((res) => {
      this.clients.set(res);
    });
  }
}
