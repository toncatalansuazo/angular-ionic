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
import { fromOrderAction, fromOrderReducer, fromOrderSelectors } from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent extends OrderTableAbstract implements OnInit {

  private orders$: Observable<Order[]>;
  onSelectedOrder(row: Order): void {
    this.store.dispatch(fromOrderAction.selectOrder({ order: row }));
  }

  constructor(private store: Store<fromOrderReducer.OrderState>,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchPendingOrders();
    this.orders$ = this.store.select(fromOrderSelectors.getPending);
    
  }

  fetchPendingOrders() {
    this.store.dispatch(fromOrderAction.pendingOrders());
  }
}
