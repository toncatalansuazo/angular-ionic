import { Order } from '../order.model';

export const SET_ORDERS_COMPLETED_ACTION = '[ORDERS] set orders completed';

export class SetOrdersCompletedAction {
    public type = SET_ORDERS_COMPLETED_ACTION;
    constructor(public payload: Order[]) {}
}

export type OrdersActions = SetOrdersCompletedAction;
