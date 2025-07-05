import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { NgIf, AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, NgTemplateOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  userData$ = this.oidcSecurityService.userData$;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.warn('authenticated: ', isAuthenticated);
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    window.sessionStorage.clear();
    window.location.href =
      'https://dyc-corte-laser.auth.us-east-1.amazoncognito.com/logout?client_id=f1vmjepap0h7h1qouu45i59bi&logout_uri=' +
      encodeURIComponent(window.location.origin + '/home');
  }
}
