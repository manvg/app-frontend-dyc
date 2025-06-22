import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iRvmxMLIb',
    redirectUrl: 'http://localhost:4200/login/callback',
    postLogoutRedirectUri: 'http://localhost:4200/login',
    clientId: 'f1vmjepap0h7h1qouu45i59bi',
    scope: 'openid email',
    responseType: 'code',
    customParamsAuthRequest: {
      lang: 'es'
    },
    logLevel: LogLevel.Debug
  }
};
