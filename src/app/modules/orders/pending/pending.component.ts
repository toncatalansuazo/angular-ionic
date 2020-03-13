import { Component, OnInit } from '@angular/core';
import { OrderTableAbstract } from '../order-table-abstract';
import { OrderService } from 'src/app/core/http/order/order.service';
import { map } from 'rxjs/operators';
import { OrderResponse, Order } from '../order.model';
import { Store } from '@ngrx/store';
import * as fromOrder from '../store/order.reducer';
import { SetPendingOrdersAction } from '../store/orders.action';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent extends OrderTableAbstract implements OnInit {

  onSelectedOrder(row: any): void {
    console.log("Method not implemented.", row);
  }

  constructor(private ordersService: OrderService, private store: Store<fromOrder.OrdersState>) {super(); }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchPendingOrders();
    this.subscribeToOrder(fromOrder.getPending, this.store);
  }

  fetchPendingOrders() {
    this.ordersService.getPendingOrder()
      .pipe(this.closeOnDestroy$(),
        map((res: OrderResponse) => res.data)
      ).subscribe((orders: Order[]) => {
        this.store.dispatch(new SetPendingOrdersAction(orders));
      });
  }
}
