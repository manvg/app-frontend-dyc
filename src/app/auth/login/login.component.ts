import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NgIf, AsyncPipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [NgIf, AsyncPipe, JsonPipe, MatButtonModule, MatCardModule, MatIconModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);

  isAuthenticated = false;
  userData$ = this.oidcSecurityService.userData$;
  private authSub?: Subscription;

  ngOnInit(): void {
    this.authSub = this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.router.navigate(['/productos']);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }
}
