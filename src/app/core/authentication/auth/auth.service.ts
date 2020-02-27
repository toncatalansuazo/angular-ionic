import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/login/User';
import * as _ from 'lodash';
import { ConfigurationEndpoint } from '../../../configuration/configuration-endpoint';

export interface AuthResponse {
  token: string;
}

export const AUTH_TOKEN = 'ECOMMERCE_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

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
  getTokenFromStorage(): string {
    return localStorage.getItem(AUTH_TOKEN);
  }

  private isTokenValid(): boolean {
    // @TODO check expiration
    return _.isNil(this.token) ? false : true;
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    this.token = null;
  }
}
