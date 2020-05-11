import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CompletedOrdersComponent } from './completed.component';
import { OrderService } from 'src/app/core/http/order/order.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockHeaderTemplate, mockOrderResponse, MockOrderService } from 'src/app/utils/test/mock-order.spec';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as fromOrder from '../store/order.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const orderReducerInitialState = fromOrder.initialState;

describe('CompletedOrdersComponent', () => {
  let component: CompletedOrdersComponent;
  let fixture: ComponentFixture<CompletedOrdersComponent>;
  let orderServiceSpy: OrderService;

  beforeEach(async(() => {
    // let store: MockStore<fromOrder.OrdersState>;
    const initialState = { orders: orderReducerInitialState };
    TestBed.configureTestingModule({
      declarations: [ CompletedOrdersComponent, MockHeaderTemplate ],
      imports: [CommonModule,
        IonicModule,
        HttpClientModule,
        NgxDatatableModule,
        RouterModule,
        RouterTestingModule
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

    fixture = TestBed.createComponent(CompletedOrdersComponent);
    component = fixture.componentInstance;
    orderServiceSpy = TestBed.get<OrderService>(OrderService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould fetch orders completed', () => {
    const orderSpy = spyOn(orderServiceSpy, 'getCompletedOrders').and.callThrough();
    component.ngOnInit();
    expect(orderSpy).toHaveBeenCalledTimes(1);
  });

  it('sould call subscribeToOrder', () => {
    const subscribeToOrderSpy = spyOn(component, 'subscribeToOrder').and.callThrough();
    component.ngOnInit();
    expect(subscribeToOrderSpy).toHaveBeenCalledTimes(1);
  });

  it('sould call setTableConfiguration', () => {
    const setTableConfigurationSpy = spyOn(component, 'setTableConfiguration').and.callThrough();
    component.ngOnInit();
    expect(setTableConfigurationSpy).toHaveBeenCalledTimes(1);
  });

});
