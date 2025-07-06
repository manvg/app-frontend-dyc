import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isAuthenticated = false;

  private oidcSecurityService = inject(OidcSecurityService);

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  onLogin(): void {
    this.oidcSecurityService.authorize();
  }
}
