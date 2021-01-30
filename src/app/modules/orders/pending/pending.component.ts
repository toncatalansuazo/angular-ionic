import { Component, OnInit } from '@angular/core';
import { OrderTableAbstract } from '../order-table-abstract';
import { OrderService } from 'src/app/core/http/order/order.service';
import { map, tap } from 'rxjs/operators';
import { OrderResponse, Order } from '../order.model';
import { Store } from '@ngrx/store';
// import * as fromOrder from '../store/order.reducer';
// import { SetPendingOrdersAction } from '../store/order.action';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { OrderRoute } from '../OrderRoute';
import { OrderRow } from '../order-row';
import { fromOrderAction, fromOrderReducer, fromOrderSelectors } from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent extends OrderTableAbstract implements OnInit {

  private orders$: Observable<Order[]>;
  onSelectedOrder(row: OrderRow): void {
    this._store.dispatch(fromOrderAction.selectOrder({ order: row }));
    // this.router.navigate([`${OrderRoute.ORDERS}/${OrderRoute.DETAIL}`]);
  }

  constructor(private _store: Store<fromOrderReducer.OrderState>,
              private router: Router) {
    // super(_store);
    super();
  }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchPendingOrders();
    this.orders$ = this._store.select(fromOrderSelectors.getPending).pipe(tap(console.log));
    // this.subscribeToOrder(fromOrderSelectors.getPending);
  }

  fetchPendingOrders() {
    this._store.dispatch(fromOrderAction.pendingOrders());
    // this.ordersService.getPendingOrder()
    //   .pipe(this.closeOnDestroy$(),
    //     map((res: OrderResponse) => res.data)
    //   ).subscribe((orders: Order[]) => {
    //     this.store.dispatch(new SetPendingOrdersAction(orders));
    //   });
  }
}
