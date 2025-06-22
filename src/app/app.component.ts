import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-frontend-dyc';

  private readonly oidcSecurityService = inject(OidcSecurityService);

  isAuthenticated = false;
  userData$ = this.oidcSecurityService.userData$;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.warn('authenticated: ', isAuthenticated);
    });
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
