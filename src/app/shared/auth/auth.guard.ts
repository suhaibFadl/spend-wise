import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { TransactionsStore } from '../../store/transactions.store';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const store = inject(TransactionsStore);
  const router = inject(Router);
  
  return await authService.isAuthenticated()
    ? true
    :  router.createUrlTree(['login']);
};

export const authenticatedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return await authService.isAuthenticated()
    ? router.createUrlTree(['home'])
    : true;
};

