import { Order } from '../order.model';
import { Product } from 'src/app/core/http/product/product.model';
import { Action, createAction, props } from '@ngrx/store';
import { Payment } from 'src/app/core/http/payment/payment.model';
import { OrderRow } from '../order-row';

export const SET_ORDERS_COMPLETED_ACTION = '[ORDERS] set orders completed';
export const SET_PENDING_ORDERS_ACTION = '[ORDERS] set pending orders';
export const SET_ORDERS_TO_DELIVER_ACTION = '[ORDERS] set orders to deliver';
export const SET_PRODUCTS_IN_ORDER_ACTION = '[ORDERS] set products in orders';
export const SET_PAYMENT_ORDER_ACTION = '[ORDERS] set payment in orders';

enum OrderActionsType {
    PENDING_ORDERS = '[ORDERS] PENDING',
    PENDING_ORDERS_SUCCESS = '[ORDERS] PENDING SUCCESS',
    PENDING_ORDERS_FAIL = '[ORDERS] PENDING FAIL',
    SELECT_ORDER = "[ORDERS] SELECT ORDER",
    GET_PRODUCTS = '[ORDERS] GET_PRODUCTS',
    GET_PRODUCTS_SUCCESS = '[ORDERS] GET PRODUCTS SUCCESS',
    GET_PRODUCTS_FAIL = '[ORDERS] GET_PRODUCTS_FAIL'
}

export const pendingOrders = createAction(
    OrderActionsType.PENDING_ORDERS
);
export const pendingOrdersSuccess = createAction(
    OrderActionsType.PENDING_ORDERS_SUCCESS,
    props<{ orders: Order[] }>()
);
export const pendingOrdersFail = createAction(
    OrderActionsType.PENDING_ORDERS_SUCCESS,
    props<{ orders: Order[] }>()
);
export const selectOrder = createAction(
    OrderActionsType.SELECT_ORDER,
    props<{ order: OrderRow }>()
);
export const getProducts = createAction(
    OrderActionsType.GET_PRODUCTS
);
export const getProductsSuccess = createAction(
    OrderActionsType.GET_PRODUCTS_SUCCESS,
    props<{ products: Product[] }>()
);
export const getProductsFail = createAction(
    OrderActionsType.GET_PRODUCTS_FAIL,
    props<{ orderId: number }>()
);
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
