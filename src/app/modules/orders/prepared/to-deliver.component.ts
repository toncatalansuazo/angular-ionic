import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderTableAbstract } from '../order-table-abstract';
import { Order } from '../order.model';
import { OrderRoute } from '../OrderRoute';
import { fromOrderAction, fromOrderSelectors, fromOrderReducer } from '../store'
@Component({
  selector: 'app-prepared',
  templateUrl: './prepared.component.html',
  styleUrls: ['./prepared.component.scss'],
})
export class ToDeliver extends OrderTableAbstract implements OnInit {

  constructor(private store: Store<fromOrderReducer.OrderState>) {
    super();
   }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchOrdersCompleted();
    this.orders$ = this.store.select(fromOrderSelectors.getToDeliver);
    this.currentOrdersInList$ = this.orders$;
    this.lastOrderSelected$ = this.store.select(fromOrderSelectors.getSelectedOrder);
  }

  onSelectedOrder(order: Order) {
    this.store.dispatch(fromOrderAction.selectOrder({ order, fromRoute: OrderRoute.TO_DELIVER }));
  }

  private fetchOrdersCompleted(): void {
    this.store.dispatch(fromOrderAction.getPrepared());
  }
}
