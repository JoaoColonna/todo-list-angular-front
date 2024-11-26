import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.getCurrentUser();
  const routePath = route.routeConfig?.path;

  if (isAuthenticated.usr_id != null && routePath === 'acesso') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
