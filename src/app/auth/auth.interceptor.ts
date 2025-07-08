import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const oidcSecurityService = inject(OidcSecurityService);

  const API_GATEWAY_URL = 'https://uwwdb8o872.execute-api.us-east-1.amazonaws.com';
  const needsAuth = request.url.startsWith(API_GATEWAY_URL);

  if (!needsAuth) {
    return next(request);
  }

  return oidcSecurityService.getAccessToken().pipe(
    switchMap((token: string) => {
      if (token) {
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      }
      return next(request);
    })
  );
};
