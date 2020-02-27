import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestCoreModule } from 'src/app/utils/test/test-core.module';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/authentication/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let authService: AuthService;
  const routes: Routes = [{ path: 'a', redirectTo: '', pathMatch: 'full' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService],
      imports: [IonicModule.forRoot(), TestCoreModule, RouterTestingModule.withRoutes(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    authService = TestBed.get(AuthService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login on click button', () => {
    const spyAuthServ = spyOn(authService, 'login');
    const loginBtn: DebugElement = de.query(By.css('button'));
    loginBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spyAuthServ).toHaveBeenCalledTimes(1);
  });
});
