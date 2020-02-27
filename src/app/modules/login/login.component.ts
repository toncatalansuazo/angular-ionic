import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponse, AUTH_TOKEN } from 'src/app/core/authentication/auth/auth.service';
import { User } from './User';
import { tap, catchError } from 'rxjs/operators';
import { Destroyer } from 'src/app/utils/Destroyer';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer' ;
import { StartLoadingAction, StopLoadingAction } from 'src/app/shared/ui.actions';
import * as Auth from 'src/app/core/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Destroyer implements OnInit {
  loading$: Observable<boolean>;
  loginForm: FormGroup;
  emailFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(3)
  ]);
  passwordFC: FormControl = new FormControl('', [
    Validators.required, Validators.min(3)
  ]);

  constructor(private auth: AuthService, private router: Router, private store: Store<fromRoot.State>) {
    super();
  }

  ngOnInit() {
    this.loading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: this.emailFC,
      password: this.passwordFC
    });
  }

  onLogin(): void {
    const user: User = this.loginForm.value;
    this.store.dispatch(new StartLoadingAction());
    this.auth.login(user)
      .pipe(
        this.closeOnDestroy$(),
        tap((authResponse: AuthResponse) => {
          if (authResponse) {
            this.auth.token = authResponse.token;
            this.store.dispatch(new Auth.Authenticated());
            localStorage.setItem(AUTH_TOKEN, 'Bearer ' + authResponse.token);
            this.router.navigate(['/home']);
          }
        }),
        catchError((err: any) => {
          this.store.dispatch(new Auth.Unauthenticated());
          this.store.dispatch(new StopLoadingAction());
          return throwError('Error in call' + JSON.stringify(err.status));
        })
      ).subscribe(() => {
        this.store.dispatch(new StopLoadingAction());
      });
  }

}
