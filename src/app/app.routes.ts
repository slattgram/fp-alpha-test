import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./features/clients/clients.routes').then((m) => m.clientsRoutes),
  },
];
