import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, filter, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);

  return oidcSecurityService.isAuthenticated$
    .pipe(
      filter(auth => typeof auth?.isAuthenticated === 'boolean'),
      take(1),
      map(({ isAuthenticated }) => {
        if (!isAuthenticated) {
          window.location.href = '/home';
          return false;
        }
        return true;
      })
    );
};
