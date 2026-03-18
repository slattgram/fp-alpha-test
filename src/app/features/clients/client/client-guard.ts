import { CanActivateFn } from '@angular/router';

export const clientGuard: CanActivateFn = (route) => Boolean(Number(route.params['id']));
