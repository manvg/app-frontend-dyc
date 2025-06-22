import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  onLogin(): void {
    this.oidcSecurityService.authorize();
  }
}
