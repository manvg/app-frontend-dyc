import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAuth } from 'angular-auth-oidc-client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interceptor';

const isProd = window.location.hostname !== 'localhost';

const cognitoConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iRvmxMLIb',
  redirectUrl: isProd ? 'https://{ip-publica-aws}/login/callback' : 'http://localhost:4200/login/callback',
  clientId: 'f1vmjepap0h7h1qouu45i59bi',
  scope: 'openid email',
  responseType: 'code',
  customParamsAuthRequest: { lang: 'es' }
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideAuth({ config: cognitoConfig }),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ]
}).catch((err) => console.error(err));
