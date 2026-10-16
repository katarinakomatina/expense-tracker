import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const ulogovanGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.jeUlogovan() ? true : router.createUrlTree(['/prijava']);
};

export const gostGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.jeUlogovan() ? router.createUrlTree(['/']) : true;
};
