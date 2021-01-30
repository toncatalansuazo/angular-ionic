import { Order } from './order.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Destroyer } from 'src/app/utils/Destroyer';

export abstract class OrderTableAbstract extends Destroyer {
    columns: any;
    rows: Order[] = [];
    columMode: ColumnMode;

    abstract onSelectedOrder(row: Order): void;

    onActivate(event) {
        if (event.type === 'click') {
            this.onSelectedOrder(event.row);
        }
    }

    setTableConfiguration() {
        this.columMode = ColumnMode.force;
        this.columns = [
            { name: 'Numero Orden', prop: 'id', maxWidth: 100 },
            { name: 'Fecha creacion', prop: 'created_at' },
            { name: 'Tot. Productos' , prop: 'total' },
            { name: 'Tot. Transporte', prop: 'delivery_cost' },
            { name: 'enviado', prop: 'delivered' }
        ];
    }
}
