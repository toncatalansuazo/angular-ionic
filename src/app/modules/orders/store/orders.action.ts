import { Order } from '../order.model';
import { Product } from 'src/app/core/http/product/product.model';
import { Action } from '@ngrx/store';
import { Payment } from 'src/app/core/http/payment/payment.model';

export const SET_ORDERS_COMPLETED_ACTION = '[ORDERS] set orders completed';
export const SET_PENDING_ORDERS_ACTION = '[ORDERS] set pending orders';
export const SET_ORDERS_TO_DELIVER_ACTION = '[ORDERS] set orders to deliver';
export const SET_PRODUCTS_IN_ORDER_ACTION = '[ORDERS] set products in orders';
export const SET_PAYMENT_ORDER_ACTION = '[ORDERS] set payment in orders';
export class SetOrdersCompletedAction implements Action {
    public type = SET_ORDERS_COMPLETED_ACTION;
    constructor(public payload: Order[]) {}
}

export class SetPendingOrdersAction implements Action {
    public type = SET_PENDING_ORDERS_ACTION;
    constructor(public payload: Order[]) {}
}

export class SetOrdersToDeliverAction implements Action {
    public type = SET_ORDERS_TO_DELIVER_ACTION;
    constructor(public payload: Order[]) {}
}

export class SetProductsInOrderAction implements Action {
    public type = SET_PRODUCTS_IN_ORDER_ACTION;
    constructor(public payload: Product[]) {}
}

export class SetPaymentOrderAction implements Action {
    public type = SET_PAYMENT_ORDER_ACTION;
    constructor(public payload: Payment) {}
}

export type OrdersActions = SetOrdersCompletedAction |
    SetPendingOrdersAction | SetOrdersToDeliverAction
    | SetProductsInOrderAction | SetPaymentOrderAction;
