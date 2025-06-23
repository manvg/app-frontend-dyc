import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  userData$ = this.oidcSecurityService.userData$;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated && window.location.pathname === '/login/callback') {
        this.router.navigate(['/productos']);
      }
    });
  }

  // logout() {
  //   if (typeof window !== 'undefined') {
  //     console.log('Cerrando sesión...');
  //     this.oidcSecurityService.logoffAndRevokeTokens(window.location.origin + '/home');
  //   }
  // }



  logout() {
    if (typeof window !== 'undefined') {
      this.oidcSecurityService.logoff(window.location.origin + '/home');
    }
  }


}
