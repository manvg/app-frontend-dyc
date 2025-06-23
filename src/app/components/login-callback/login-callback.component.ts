import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  standalone: true,
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);

  ngOnInit(): void {
    this.oidcSecurityService.checkAuthIncludingServer().subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        this.router.navigate(['/productos']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
