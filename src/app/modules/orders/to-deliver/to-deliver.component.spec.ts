import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToDeliverComponent } from './to-deliver.component';

describe('ToDeliverComponent', () => {
  let component: ToDeliverComponent;
  let fixture: ComponentFixture<ToDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDeliverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
