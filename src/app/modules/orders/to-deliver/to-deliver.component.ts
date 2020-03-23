import { Component, OnInit } from '@angular/core';
import { OrderTableAbstract } from '../order-table-abstract';
import * as fromOrder from '../store/order.reducer';
import { Store } from '@ngrx/store';
import { OrderService as OrderService } from 'src/app/core/http/order/order.service';
import { OrderResponse, Order } from '../order.model';
import { SetOrdersToDeliverAction } from '../store/orders.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-to-deliver',
  templateUrl: './to-deliver.component.html',
  styleUrls: ['./to-deliver.component.scss'],
})
export class ToDeliverComponent extends OrderTableAbstract implements OnInit {

  onSelectedOrder(row: any): void {
    console.log("Method not implemented.");
  }

  constructor(private store: Store<fromOrder.OrdersState>, private orderService: OrderService) { super(); }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchPendingOrders();
    this.subscribeToOrder(fromOrder.getToDeliver, this.store);
  }

  fetchPendingOrders() {
    this.orderService.getOrdersToDeliver()
      .pipe(this.closeOnDestroy$(),
        map((res: OrderResponse) => res.data)
      ).subscribe((orders: Order[]) => {
        this.store.dispatch(new SetOrdersToDeliverAction(orders));
      });
  }

}
