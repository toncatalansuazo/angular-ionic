import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { Destroyer } from 'src/app/utils/Destroyer';
import { Observable, Subject, Subscriber } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { fromUiActions, fromUiSelectors } from '../../shared/store';
import { fromAuthAction, fromAuthReducer } from '../../core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Destroyer implements OnInit {
  loading$: Observable<boolean>;
  loginForm: FormGroup;
  error$: Observable<string>;
  passwordType = 'password';
  constructor(private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {
    super();
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.min(3),
        Validators.email
      ]], password: ['' , [
        Validators.required,
        Validators.min(3),
        // TODO min 1 number and one special character 
      ]]
    });
    this.loading$ = this.store.select(fromUiSelectors.getIsLoadingProgressBar);
    this.error$ = this.store.select(fromAuthReducer.getLoginError);
  }

  onLogin(): void {
    const user: User = this.loginForm.value;
    this.store.dispatch(fromUiActions.startLoadingModal({message: 'Cargando...'}));
    this.store.dispatch(fromAuthAction.login({ user }));
  }

  showPassword() {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }
}
