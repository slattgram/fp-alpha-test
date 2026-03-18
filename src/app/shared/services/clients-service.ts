import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { baseUrl } from '../consts/api';
import { TClient } from '../types/client';
import randomDate from '../utils/random-date';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);

  getClients() {
    return this.http
      .get<TClient[]>(`${baseUrl}/users`)
      .pipe(map((res) => res.map((client) => ({ ...client, creation_date: randomDate() }))));
  }

  getClientById(id: number) {
    return this.http
      .get<TClient>(`${baseUrl}/users/${id}`)
      .pipe(map((client) => ({ ...client, creation_date: randomDate() })));
  }

  createClient(client: Omit<TClient, 'id'>) {
    return this.http.post<TClient>(`${baseUrl}/users`, client);
  }
}
