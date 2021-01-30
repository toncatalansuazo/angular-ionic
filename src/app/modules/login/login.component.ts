import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { tap, catchError } from 'rxjs/operators';
import { Destroyer } from 'src/app/utils/Destroyer';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { fromUiReducers } from '../../shared/store';
import { fromAuthAction, fromAuthReducer } from '../../core/store'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Destroyer implements OnInit {
  loading$: Observable<boolean>;
  loginForm: FormGroup;
  error$: Observable<string>;

  constructor(private router: Router,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['ton_@live.cl', [
        Validators.required,
        Validators.min(3),
        Validators.email
      ]], password: ['ctoncton' , [
        Validators.required,
        Validators.min(3),
        // TODO min 1 number and one special character 
      ]]
    });
    this.loading$ = this.store.select(fromUiReducers.getIsLoading);
    this.error$ = this.store.select(fromAuthReducer.getLoginError);
  }

  onLogin(): void {
    console.log(this.loginForm);
    const user: User = this.loginForm.value;
    this.store.dispatch(fromAuthAction.login(this.loginForm.value));
  }

}
