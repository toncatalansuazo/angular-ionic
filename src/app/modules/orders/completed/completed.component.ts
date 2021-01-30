import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/http/order/order.service';
import { OrderResponse, Order } from '../order.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromOrders from '../store/order.reducer';
import { SetOrdersCompletedAction } from '../store/order.action';
import { OrderTableAbstract } from '../order-table-abstract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedOrdersComponent extends OrderTableAbstract implements OnInit {

  constructor(private orderService: OrderService, private _store: Store<fromOrders.OrderState>,
              private router: Router) {
    super();
   }

  ngOnInit() {
    // this.setTableConfiguration();
    // this.fetchOrdersCompleted();
    // this.subscribeToOrder(fromOrders.getCompleted, this._store);
  }

  onSelectedOrder(row) {
    console.log('selected row', row);
    this.router.navigate(['orders/detail']);
  }

  private fetchOrdersCompleted(): void {
    this.orderService.getCompletedOrders()
      .pipe(this.closeOnDestroy$(),
        map((res: OrderResponse) => res.data)
      ).subscribe((orders: Order[]) => {
        this._store.dispatch(new SetOrdersCompletedAction(orders));
      });
  }
}
