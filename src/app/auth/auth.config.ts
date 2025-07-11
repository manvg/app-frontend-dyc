import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

const isProd = window.location.hostname !== 'localhost';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iRvmxMLIb',
    redirectUrl: isProd ? 'https://cortelaserdyc.cl/login/callback' : 'http://localhost:4200/login/callback',
    postLogoutRedirectUri: isProd ? 'https://cortelaserdyc.cl/home' : 'http://localhost:4200/home',
    clientId: 'f1vmjepap0h7h1qouu45i59bi',
    scope: 'openid email',
    responseType: 'code',
    customParamsAuthRequest: {
      lang: 'es'
    },
    logLevel: LogLevel.Debug
  }
};
