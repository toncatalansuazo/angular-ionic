import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, EMPTY, BehaviorSubject, of } from 'rxjs';
import { Order, OrderResponse } from '../../core/http/order/order.model';

export const mockOrderResponse: OrderResponse = {
    data: [{
        id: 12,
        user_id: 12,
        delivery_cost: 12,
        status: 12,
        total: 12,
        delivered: 12,
        created_at: 'string;',
        updated_at: 'string;'
    }],
    success: true
};
@Component({
    selector: 'ngx-datatable',
    template: ''
})
// tslint:disable-next-line: component-class-suffix
export class MockOrderTable {
    @Input() rows: any;
    @Input() columns: any;
    @Input() rowHeight: any;
    @Input() reorderable: any;
    @Input() columnMode: any;
    @Output() activate: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
    selector: 'app-header-template',
    template: ''
})
// tslint:disable-next-line: component-class-suffix
export class MockHeaderTemplate {
}

export class MockStoreService extends BehaviorSubject<any> {
    constructor(private initialState: any) {
        super(initialState);
    }

    dispatch(data: any): void {}
    select(data): Observable<any> { return of({}); }
}

export class MockOrderService {
    constructor() { }
    get url(): string {
        return '';
    }
    getCompletedOrders(): Observable<OrderResponse> {
        return of(mockOrderResponse);
    }

    getPendingOrder(): Observable<OrderResponse> {
        return of(mockOrderResponse);
    }

    getOrdersToDeliver(): Observable<OrderResponse> {
        return of(mockOrderResponse);
    }

    getOrderPrepared() {
        return of(mockOrderResponse);
    }

    setTransportOrder() {}

    setOrderAsPrepared() {}
  }
