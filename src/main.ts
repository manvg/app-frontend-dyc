import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAuth } from 'angular-auth-oidc-client';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideAuth({
      config: {
        authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iRvmxMLIb',
        redirectUrl: 'http://localhost:4200/login/callback',
        clientId: 'f1vmjepap0h7h1qouu45i59bi',
        scope: 'email openid',
        responseType: 'code',
        customParamsAuthRequest: {
          lang: 'es'
        }
      }
    }),
  ]
}).catch((err) => console.error(err));
