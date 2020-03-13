import { Order } from '../order.model';

export const SET_ORDERS_COMPLETED_ACTION = '[ORDERS] set orders completed';
export const SET_PENDING_ORDERS_ACTION = '[ORDERS] set pending orders';
export const SET_ORDERS_TO_DELIVER_ACTION = '[ORDERS] set orders to deliver';
export class SetOrdersCompletedAction {
    public type = SET_ORDERS_COMPLETED_ACTION;
    constructor(public payload: Order[]) {}
}

export class SetPendingOrdersAction {
    public type = SET_PENDING_ORDERS_ACTION;
    constructor(public payload: Order[]) {}
}

export class SetOrdersToDeliverAction {
    public type = SET_ORDERS_TO_DELIVER_ACTION;
    constructor(public payload: Order[]) {}
}

export type OrdersActions = SetOrdersCompletedAction | 
    SetPendingOrdersAction | SetOrdersToDeliverAction;
