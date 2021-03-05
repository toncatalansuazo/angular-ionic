import { Component, OnInit } from '@angular/core';
import { OrderTableAbstract } from '../order-table-abstract';
import { OrderService } from 'src/app/core/http/order/order.service';
import { map, tap } from 'rxjs/operators';
import { OrdersResponse, Order } from '../order.model';
import { Store } from '@ngrx/store';
// import * as fromOrder from '../store/order.reducer';
// import { SetPendingOrdersAction } from '../store/order.action';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { OrderRoute } from '../OrderRoute';
import { fromOrderAction, fromOrderReducer, fromOrderSelectors } from '../store';
import { Observable } from 'rxjs';
import { fromUiSelectors } from 'src/app/shared/store';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent extends OrderTableAbstract implements OnInit {
  // orders$: Observable<Order[]>;
  isLoading$: Observable<boolean>;
  lastOrderSelected$: Observable<Order>;

  constructor(private store: Store<fromOrderReducer.OrderState>,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchPendingOrders();
    this.currentOrdersInList$ = this.store.select(fromOrderSelectors.getPending);
    this.isLoading$ = this.store.select(fromUiSelectors.getIsLoadingProgressBar);
    this.lastOrderSelected$ = this.store.select(fromOrderSelectors.getSelectedOrder);
  }

  onSelectedOrder(row: Order): void {
    this.store.dispatch(fromOrderAction.selectOrder({ order: row, fromRoute: OrderRoute.PENDING }));
  }

  fetchPendingOrders() {
    this.store.dispatch(fromOrderAction.pendingOrders());
  }
}
