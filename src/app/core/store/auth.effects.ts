import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthResponse, AuthService, AUTH_TOKEN } from '../authentication/auth/auth.service';
import * as fromAuthAction from './auth.actions';
import { fromUiActions, fromUiReducers } from 'src/app/shared/store';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((res: AuthResponse) => {
            this.authService.token = res.access_token;
            localStorage.setItem(AUTH_TOKEN, res.access_token);
            this.store.dispatch(fromUiActions.stopLoadingModal());
            return fromAuthAction.loginSuccess({ email });
          }),
          catchError(({ error }) => {
              return of(fromAuthAction.loginFailed({ error: error && error.error.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthAction.loginSuccess
      ),
      tap(() => this.router.navigate(['/home']))
    )
  , { dispatch: false });

  stopModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthAction.loginSuccess,
        fromAuthAction.loginFailed
      ),
      map(() => fromUiActions.stopLoadingModal())
    )
  );

  constructor(private authService: AuthService,
    private actions$: Actions,
    private store: Store<fromUiReducers.State>,
    private router: Router) {}
}