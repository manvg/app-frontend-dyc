import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
              authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yrySOkLP8',
              redirectUrl: 'http://localhost:4200/login/callback',
              postLogoutRedirectUri: 'http://localhost:4200/login',
              clientId: 'pjpde8a7s02kp9h2i0keflk',
              scope: 'openid email',
              responseType: 'code',
              customParamsAuthRequest: {
                lang: 'es'
              }
          }
}
