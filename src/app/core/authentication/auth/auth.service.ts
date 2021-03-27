import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/modules/login/User';
import { ConfigurationEndpoint } from '../../../configuration/configuration-endpoint';
import { Data } from '@angular/router';

export interface AuthResponse {
  access_token: string;
  expires_at: Data;
}

export const AUTH_TOKEN = 'ECOMMERCE_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null;
  expiresAt: Data;

  constructor(private htpp: HttpClient) { }

  login(user: User): Observable<AuthResponse> {
    return this.htpp.post<AuthResponse>(ConfigurationEndpoint.getLoginEndpoint(), user);
  }

  isAuthenticated(): boolean {
    if (this.token) {
      return true;
    }
    this.token = this.getTokenFromStorage();
    return this.isTokenValid();
  }

  // check if has a token in storage
  getTokenFromStorage(): string| null {
    return localStorage.getItem(AUTH_TOKEN);
  }

  private isTokenValid(): boolean {
    // @TODO check expiration
    return this.token ? false : true;
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    this.token = null;
  }
}
