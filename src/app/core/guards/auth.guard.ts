import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, AUTH_TOKEN } from '../authentication/auth/auth.service';
import { fromAuthAction, fromAuthReducer } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<fromAuthReducer.State>) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromAuthReducer.isAuthenticated).pipe(
      map((isAuth) => {
        if (isAuth) {
          // you can save redirect url so after authing we can move them back to the page they requested
          return true;
        } else {
          const accessToken = localStorage.getItem(AUTH_TOKEN);          
          if (accessToken) {
            // TODO change for action to get user info or save user info in local storage
            this.store.dispatch(fromAuthAction.loginSuccess({ email: 'to do'}));
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
