import { Order } from './order.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { OrderRow } from './order-row';
import { Destroyer } from 'src/app/utils/Destroyer';
import { fromOrderReducer } from './store';
import { Store } from '@ngrx/store';

export abstract class OrderTableAbstract extends Destroyer {
    columns: any;
    rows: OrderRow[] = [];
    columMode: ColumnMode;
    orders: Order[];

    // constructor(private store: Store<fromOrderReducer.OrderState>) {
    //     super();
    // }

    abstract onSelectedOrder(row: OrderRow): void;

    getRowHeight(row) {
        // set default
        if (!row) return 50;

        // return my height
        return row.height;
    }

    onActivate(event) {
        if (event.type === 'click') {
            this.onSelectedOrder(event.row);
        }
    }

    setTableConfiguration() {
        this.columMode = ColumnMode.force;
        this.columns = [
            { name: 'Numero Orden', prop: 'id', maxWidth: 50 },
            { name: 'fecha creacion', prop: 'created_at' },
            { name: 'Productos', prop: 'total' },
            { name: 'Transporte', prop: 'delivery_cost' },
            { name: 'enviado', prop: 'delivered' }
        ];
    }

    showOrdersInTable() {
        const orderRows = [];
        for (const order of this.orders) {
            const totalOrder: number = order.delivery_cost + order.total;
            // orderRows.push(order);
            // orderRows.push({
            //     id: order.id,
            //     // fecha: order.created_at.split(' ')[0],
            //     total: '$ ' + totalOrder,
            //     status: order.status,
            //     delivered: order.delivered
            // });
            // this.rows = orderRows;
        }
    }

    // subscribeToOrder(selector) {
    //     this.store.select(selector)
    //       .pipe(this.closeOnDestroy$())
    //       .subscribe((orders) => {
    //         console.log('orders', orders);
    //         this.orders = orders;
    //         this.showOrdersInTable();
    //       });
    //   }
}
