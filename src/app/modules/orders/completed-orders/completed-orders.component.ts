import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { OrdersService } from 'src/app/core/http/orders/orders.service';
import { Destroyer } from 'src/app/utils/Destroyer';
import { OrderResponse, Order } from '../order.model';
import { map } from 'rxjs/operators';
import { OrderRow } from '../order-row';
import { Store } from '@ngrx/store';
import * as fromOrders from '../store/order.reducer';
import { SetOrdersCompletedAction } from '../store/orders.action';
import { OrderTableAbstract } from '../order-table-abstract';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss'],
})
export class CompletedOrdersComponent extends OrderTableAbstract implements OnInit {

  constructor(private ordService: OrdersService, private store: Store<fromOrders.OrdersState>) {
    super();
   }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchOrdersCompleted();
    this.subscribeToOrdersCompleted();
  }

  onSelectedOrder(row) {
    console.log('selected row', row);
  }

  private fetchOrdersCompleted(): void {
    this.ordService.getCompletedOrders()
      .pipe(this.closeOnDestroy$(),
        map((res: OrderResponse) => res.data)
      ).subscribe((orders: Order[]) => {
        this.store.dispatch(new SetOrdersCompletedAction(orders));
        this.orders = orders;
      });
  }

  private subscribeToOrdersCompleted() {
    this.store.select(fromOrders.getCompleted)
      .pipe(this.closeOnDestroy$()).subscribe((orders) => {
        this.orders = orders;
        this.showOrdersInTable();
      });
  }
}
