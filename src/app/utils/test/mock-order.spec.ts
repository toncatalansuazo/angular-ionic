import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, empty, EMPTY, BehaviorSubject, of } from 'rxjs';
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
    constructor(private _initialState: any) {
        super(_initialState);
    }

    dispatch(data: any): void {}
    select(data): Observable<any> { return EMPTY; }
}

export class MockOrderService {
    getCompletedOrders(): Observable<any> {
        return of({});
    }

    getPendingOrder(): Observable<any> {
        return of({});
    }

    getOrdersToDeliver(): Observable<any> {
        return of({});
    }
}
