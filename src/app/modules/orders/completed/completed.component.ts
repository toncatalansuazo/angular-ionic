import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/http/order/order.service';
import { OrderResponse, Order } from '../order.model';
import { Store } from '@ngrx/store';
import * as fromOrders from '../store/order.reducer';
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
  }

  onSelectedOrder(order) {
  }

  private fetchOrdersCompleted(): void {
  }
}
