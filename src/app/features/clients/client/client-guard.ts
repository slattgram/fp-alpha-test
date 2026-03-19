import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const clientGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  return Number(route.params['id']) ? true : router.navigate(['/clients']);
};
