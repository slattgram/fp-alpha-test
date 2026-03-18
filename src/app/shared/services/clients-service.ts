import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, combineLatest, of } from 'rxjs';
import { baseUrl } from '../consts/api';
import { TClient } from '../types/client';

import {
  appendDateToExistingUser,
  appendDateToExistingUsers,
} from '../utils/append-date-to-existing-users';
import {
  getLocalClients,
  saveLocalClient,
  mergeClients,
  getNextLocalId,
} from '../utils/local-clients-utils';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);

  getClients() {
    const apiClients$ = this.http
      .get<TClient[]>(`${baseUrl}/users`)
      .pipe(map((res) => appendDateToExistingUsers(res)));

    const localClients$ = of(getLocalClients());

    return combineLatest([apiClients$, localClients$]).pipe(
      map(([apiClients, localClients]) => mergeClients(apiClients, localClients)),
    );
  }

  getClientById(id: number) {
    const isClientInLocalStorage = getLocalClients().some(
      (client) => Number(client.id) === Number(id),
    );

    const client$ = isClientInLocalStorage
      ? of(getLocalClients().find((client) => Number(client.id) === Number(id)))
      : this.http.get<TClient>(`${baseUrl}/users/${id}`);

    return client$.pipe(
      map((client) => (isClientInLocalStorage ? client : appendDateToExistingUser(client))),
    );
  }

  createClient(client: Omit<TClient, 'id'>) {
    return this.http.post<TClient>(`${baseUrl}/users`, client).pipe(
      map((createdClient) => {
        const clientWithUniqueId = {
          ...createdClient,
          id: getNextLocalId(),
          creation_date: new Date(),
        };

        saveLocalClient(clientWithUniqueId);

        return clientWithUniqueId;
      }),
    );
  }
}
