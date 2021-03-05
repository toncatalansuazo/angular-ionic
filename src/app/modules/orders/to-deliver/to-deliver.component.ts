import { Component, OnInit } from '@angular/core';
import { OrderTableAbstract } from '../order-table-abstract';
import * as fromOrder from '../store/order.reducer';
import { Store } from '@ngrx/store';
import { OrderService as OrderService } from 'src/app/core/http/order/order.service';
import { OrdersResponse, Order } from '../order.model';
// import { SetOrdersToDeliverAction } from '../store/order.action';
import { map } from 'rxjs/operators';
import { fromOrderAction, fromOrderSelectors } from '../store';
import { Observable } from 'rxjs';
import { OrderRoute } from '../OrderRoute';

@Component({
  selector: 'app-to-deliver',
  templateUrl: './to-deliver.component.html',
  styleUrls: ['./to-deliver.component.scss'],
})
export class ToDeliverComponent extends OrderTableAbstract implements OnInit {
  orders$: Observable<Order[]>;

  onSelectedOrder(row: any): void {
    this.store.dispatch(fromOrderAction.selectOrder({ order: row, fromRoute: OrderRoute.TO_DELIVER }));
  }

  constructor(private store: Store<fromOrder.OrderState>, private orderService: OrderService) {
    super(); 
  }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchPendingOrders();
    this.currentOrdersInList$ = this.store.select(fromOrderSelectors.getToDeliver);
  }

  fetchPendingOrders() {
    this.store.dispatch(fromOrderAction.getToDeliver());
  }

}
