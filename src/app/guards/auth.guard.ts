import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);

  return oidcSecurityService.checkAuth().pipe(
    map(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
};
