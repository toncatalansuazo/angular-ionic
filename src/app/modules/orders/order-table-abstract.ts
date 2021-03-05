import { Order } from './order.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Destroyer } from 'src/app/utils/Destroyer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class OrderTableAbstract extends Destroyer {
    columns: any;
    rows: Order[] = [];
    columMode: ColumnMode;
    currentOrdersInList$: Observable<Order[]>;
    orders$: Observable<Order[]>;
    lastOrderSelected$: Observable<Order>;

    abstract onSelectedOrder(row: Order): void;

    onActivate(event) {
        if (event.type === 'click') {
            this.onSelectedOrder(event.row);
        }
    }

    // filters table list
    onFilterList($event) {
        console.log($event.detail);
        const value: string = $event.srcElement.value;
        if (value.length === 0)
            this.currentOrdersInList$ = this.orders$;
        else {
            this.currentOrdersInList$ = this.orders$.pipe(
                map((orders: Order[]) => orders.filter(order => order.id.toString().indexOf(value) !== -1)
                ));   
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
