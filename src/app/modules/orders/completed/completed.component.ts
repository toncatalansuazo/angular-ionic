import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/http/order/order.service';
import { OrdersResponse, Order } from '../order.model';
import { Store } from '@ngrx/store';
import * as fromOrders from '../store/order.reducer';
import { OrderTableAbstract } from '../order-table-abstract';
import { Router } from '@angular/router';
import { fromOrderAction, fromOrderSelectors } from '../store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { OrderRoute } from '../OrderRoute';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedOrdersComponent extends OrderTableAbstract implements OnInit {

  constructor(private store: Store<fromOrders.OrderState>,
              private router: Router) {
    super();
   }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchOrdersCompleted();
    this.orders$ = this.store.select(fromOrderSelectors.getCompleted);
    this.currentOrdersInList$ = this.orders$;
    this.lastOrderSelected$ = this.store.select(fromOrderSelectors.getSelectedOrder);
  }

  onSelectedOrder(order: Order) {
    this.store.dispatch(fromOrderAction.selectOrder({ order, fromRoute: OrderRoute.COMPLETED }));
  }

  private fetchOrdersCompleted(): void {
    this.store.dispatch(fromOrderAction.getCompleted());
  }
}
