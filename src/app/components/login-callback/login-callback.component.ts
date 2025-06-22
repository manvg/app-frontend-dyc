import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login-callback',
  standalone: true,
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  private oidcSecurityService = inject(OidcSecurityService);

  ngOnInit(): void {
    this.oidcSecurityService.checkAuthIncludingServer().subscribe((result) => {
      console.log('Callback procesado:', result);
    });
    console.log("LoginCallbackComponent inicializado");
  }
}
