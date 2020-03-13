import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CompletedOrdersComponent } from './completed.component';
import { OrderService } from 'src/app/core/http/order/order.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockHeaderTemplate, MockOrderService } from 'src/app/utils/test/mock-order.spec';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as fromOrder from '../store/order.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const orderReducerInitialState = fromOrder.initialState;
fdescribe('CompletedOrdersComponent', () => {
  let component: CompletedOrdersComponent;
  let fixture: ComponentFixture<CompletedOrdersComponent>;

  beforeEach(async(() => {
    let store: MockStore<fromOrder.OrdersState>;
    const initialState = { 'orders': orderReducerInitialState };
    TestBed.configureTestingModule({
      declarations: [ CompletedOrdersComponent, MockHeaderTemplate ],
      imports: [CommonModule,
        IonicModule,
        HttpClientModule,
        NgxDatatableModule
      ],
      providers: [
        {
          provide: OrderService,
          useClass: MockOrderService
        },
        provideMockStore({initialState})
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    try {
      fixture = TestBed.createComponent(CompletedOrdersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
