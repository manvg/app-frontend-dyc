import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  mostrarLogin = true;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.mostrarLogin = !this.router.url.startsWith('/panel-admin');
      });
  }

  onLogin(): void {
    this.oidcSecurityService.authorize();
  }
}
