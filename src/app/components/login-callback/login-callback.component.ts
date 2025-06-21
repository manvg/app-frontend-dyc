import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-callback',
  standalone: true,
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const idToken = params.get('id_token');
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        this.authService.setTokens({
          idToken: idToken ?? undefined,
          accessToken: accessToken ?? undefined,
          refreshToken: refreshToken ?? undefined
        });
        this.router.navigate(['/']);
      }
    });
  }
}
