import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private idTokenKey = 'id_token';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  setTokens(tokens: { idToken?: string, accessToken?: string, refreshToken?: string }) {
    if (tokens.idToken) {
      localStorage.setItem(this.idTokenKey, tokens.idToken);
    }
    if (tokens.accessToken) {
      localStorage.setItem(this.accessTokenKey, tokens.accessToken);
    }
    if (tokens.refreshToken) {
      localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    }
  }

  getIdToken(): string | null {
    return localStorage.getItem(this.idTokenKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clearTokens() {
    localStorage.removeItem(this.idTokenKey);
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    const idToken = this.getIdToken();
    if (!idToken) return false;
    return !this.isTokenExpired(idToken);
  }

  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  logout() {
    this.clearTokens();
    this.router.navigate(['/login']);
  }
}
