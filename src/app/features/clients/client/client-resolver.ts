import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ClientsService } from '../../../shared/services/clients-service';

export const clientResolver: ResolveFn<any> = (route) => {
  const title = inject(Title);
  const clientsService = inject(ClientsService);
  const { id } = route.params;

  return clientsService.getClientById(id).pipe(
    tap((client) => {
      title.setTitle(client.name);
    }),
  );
};
