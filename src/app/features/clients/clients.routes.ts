import { Routes } from '@angular/router';
import { clientResolver } from './client/client-resolver';
import { clientGuard } from './client/client-guard';
import { postsResolver } from './client/posts-resolver';

export const clientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./clients').then((m) => m.Clients),
    title: 'Clients',
  },
  {
    path: ':id',
    loadComponent: () => import('./client/client').then((m) => m.Client),
    resolve: {
      client: clientResolver,
      posts: postsResolver,
    },
    canActivate: [clientGuard],
  },
];
