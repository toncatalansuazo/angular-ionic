import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestCoreModule } from 'src/app/utils/test/test-core.module';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/authentication/auth/auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromRoot from '../../app.reducer' ;
import { FormBuilder } from '@angular/forms';
import { fromUiActions, fromUiSelectors } from 'src/app/shared/store';
import { fromAuthAction, fromAuthReducer } from 'src/app/core/store';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let store: Store<fromRoot.State>;
  // store function to spy
  let selectSpy, dispatchSpy;
  const mockCredentials = {
    email: 'some@gmail.com',
    password: 'someCoolPasswordCreatedByAnyGenerator'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService, FormBuilder, Store],
      imports: [
        IonicModule.forRoot(),
        TestCoreModule,
        StoreModule.forRoot(fromRoot.reducers),
        StoreDevtoolsModule.instrument({
          maxAge: 25
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    getProviders();
    spyStoreFunctionsBeforeInit();
    fixture.detectChanges();
    de = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on login init', () => {
    it(`should select loading progress bar and get login 
      error to display error msg in case of error`, () => {
      // select is spied on spyFunctionsBeforeInit()
      expect(selectSpy).toHaveBeenCalledTimes(2);
      expect(selectSpy).toHaveBeenCalledWith(fromUiSelectors.getIsLoadingProgressBar);
      expect(selectSpy).toHaveBeenCalledWith(fromAuthReducer.getLoginError);
    });

    it('form should be disabled by rules in form controls', () => {
      expect(component.loginForm.valid).toBeFalse();
    });
  });

  describe('on fill out form ', () => {
    beforeEach(() => {
      fillAndTouchForm();
    })
    it('and clicking submit button it should dispatch two actions', () => {
      const loginBtn: DebugElement = de.query(By.css('form'));
      console.log(loginBtn);
      loginBtn.triggerEventHandler('submit', null);
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(dispatchSpy).toHaveBeenCalledWith(fromAuthAction.login(mockCredentials));
      expect(dispatchSpy).toHaveBeenCalledWith(fromUiActions.startLoadingModal({message: 'Cargando...'}));
    });
  });
  

  // utils functions
  const getProviders = () => {
    store = TestBed.inject(Store);
  }

  const spyStoreFunctionsBeforeInit = () => {
    selectSpy = spyOn(store, 'select');
    dispatchSpy = spyOn(store, 'dispatch');
  }

  const fillAndTouchForm = () => {
    component.loginForm.patchValue(mockCredentials, {emitEvent: true, onlySelf: false});
    component.loginForm.markAsTouched();
  }
});
