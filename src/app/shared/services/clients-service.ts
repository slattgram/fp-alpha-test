import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, combineLatest, of } from 'rxjs';
import { baseUrl } from '../consts/api';
import { TClient } from '../types/client';
import { compareIds, findById } from '../utils/id-utils';
import {
  getLocalItems,
  saveLocalItem,
  mergeItems,
  getNextLocalId,
} from '../utils/local-storage-utils';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);

  getClients() {
    const apiClients$ = this.http.get<TClient[]>(`${baseUrl}/users`);

    const localClients$ = of(getLocalItems<TClient>('clients'));

    return combineLatest([apiClients$, localClients$]).pipe(
      map(([apiClients, localClients]) => mergeItems(apiClients, localClients)),
    );
  }

  getClientById(id: number) {
    const localClients = getLocalItems<TClient>('clients');
    const isClientInLocalStorage = localClients.some((client) => compareIds(client.id, id));

    return isClientInLocalStorage
      ? of(findById(localClients, id))
      : this.http.get<TClient>(`${baseUrl}/users/${id}`);
  }

  createClient(client: Omit<TClient, 'id'>) {
    return this.http.post<TClient>(`${baseUrl}/users`, client).pipe(
      map((createdClient) => {
        const clientWithUniqueId = {
          ...createdClient,
          id: getNextLocalId('clients'),
          creation_date: new Date(),
        };

        saveLocalItem('clients', clientWithUniqueId);

        return clientWithUniqueId;
      }),
    );
  }
}
