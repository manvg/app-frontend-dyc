import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login-callback',
  standalone: true,
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: ({ isAuthenticated }) => {
        if (isAuthenticated) {
          this.router.navigate(['/productos']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        this.router.navigate(['/home']);
      }
    });
  }
}
