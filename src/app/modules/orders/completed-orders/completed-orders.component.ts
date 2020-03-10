import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { OrdersService } from 'src/app/core/http/orders/orders.service';
import { Destroyer } from 'src/app/utils/Destroyer';
import { OrderResponse, Order } from '../order.model';
import { map } from 'rxjs/operators';
import { OrderRow } from '../order-row';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss'],
})
export class CompletedOrdersComponent extends Destroyer implements OnInit {
  columns: any;
  rows: OrderRow[] = [];
  columMode: ColumnMode;
  orders: Order[];
  constructor(private ordService: OrdersService) {
    super();
   }

  ngOnInit() {
    this.setTableConfiguration();
    this.fetchOrdersCompleted();
    // subscribe to order completed
  }

  onSelect({ selected }) {
    console.log('Select Event', selected);
  }

  onActivate(event) {
    if (event.type === 'click') {
        console.log(event.row);
    }
  }

  ionViewDidEnter() {
    console.log('asdasd');
  }

  private fetchOrdersCompleted(): void {
    this.ordService.getCompletedOrders()
      .pipe(this.closeOnDestroy$(),
        map((res: OrderResponse) => res.data)
      ).subscribe((orders: Order[]) => {
        this.orders = orders;
        const orderRows = [];
        for (const order of this.orders) {
          const totalOrder: number = order.delivery_cost + order.total;
          // set orders completed in store
          orderRows.push({id: order.id, fecha: order.created_at.split(' ')[0], total: '$ ' + totalOrder});
        }
        this.rows = orderRows;
      });
  }

  private setTableConfiguration() {
    this.columMode = ColumnMode.force;
    this.columns = [
      { name: 'id', maxWidth: 50 },
      { name: 'fecha' },
      { name: 'total' }
    ];
  }
}
