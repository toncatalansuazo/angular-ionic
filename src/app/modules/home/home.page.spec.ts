import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HeaderTemplateComponent } from 'src/app/shared/ui/header-template/header-template.component';
import { AlertService } from 'src/app/core/http/alert/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertComponent } from './alert/alert.component';
import { EMPTY, Observable } from 'rxjs';

export class MockAlertService {
  getAlerts(): Observable<any> {
    return EMPTY;
  }
}
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        HeaderTemplateComponent,
        AlertComponent
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        {
          provide: AlertService,
          useClass: MockAlertService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
