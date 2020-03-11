import { Order } from './order.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { OrderRow } from './order-row';
import { Destroyer } from 'src/app/utils/Destroyer';

export abstract class OrderTableAbstract extends Destroyer {
    columns: any;
    rows: OrderRow[] = [];
    columMode: ColumnMode;
    orders: Order[];

    abstract onSelectedOrder(row: any): void;

    onActivate(event) {
        if (event.type === 'click') {
            this.onSelectedOrder(event.row);
        }
    }

    setTableConfiguration() {
        this.columMode = ColumnMode.force;
        this.columns = [
            { name: 'id', maxWidth: 50 },
            { name: 'fecha' },
            { name: 'total' }
        ];
    }

    showOrdersInTable() {
        const orderRows = [];
        for (const order of this.orders) {
            const totalOrder: number = order.delivery_cost + order.total;
            orderRows.push({id: order.id, fecha: order.created_at.split(' ')[0], total: '$ ' + totalOrder});
            this.rows = orderRows;
        }
    }
}
