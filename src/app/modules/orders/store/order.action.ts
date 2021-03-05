import { Order } from '../order.model';
import { Product } from 'src/app/core/http/product/product.model';
import { Action, createAction, props } from '@ngrx/store';
import { Payment } from 'src/app/core/http/payment/payment.model';
import { OrderRoute } from '../OrderRoute';
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
    LOAD_PRODUCTS = '[ORDERS] LOAD PRODUCTS',
    LOAD_PRODUCTS_SUCCESS = '[ORDERS] GET PRODUCTS SUCCESS',
    LOAD_PRODUCTS_FAIL = '[ORDERS] LOAD PRODUCTS_FAIL',
    LOAD_PAYMENT_FAIL = "[ORDERS] PAYMENT FAIL",
    LOAD_PAYMENT_SUCCESS = "[ORDERS] PAYMENT SUCCESS",
    LOAD_PAYMENT = "[ORDERS] PAYMENT",
    LOAD_COMPLETED = "[ORDERS] COMPLETED",
    LOAD_COMPLETED_SUCCESS = "[ORDERS] COMPLETED SUCCESS",
    LOAD_COMPLETED_FAIL = "[ORDERS] COMPLETED FAIL",
    LOAD_TO_DELIVER = "[ORDERS] TO DELIVER",
    LOAD_TO_DELIVER_SUCCESS = "[ORDERS] TO DELIVER SUCCESS",
    LOAD_TO_DELIVER_FAIL = "[ORDERS] TO DELIVER FAIL",
    LOAD_PREPARED_FAIL = "GET PREPARED FAIL",
    LOAD_PREPARED_SUCCESS = "GET PREPARED SUCCESS",
    LOAD_PREPARED = "GET PREPARED",

    SER_ORDER_AS_PREPARED = '[ORDER] SET AS PREPARED',
    SET_ORDER_AS_PREPARED_SUCCESS = '[ORDER] SET AS PREPARED SUCCESS',
    SET_ORDER_AS_PREPARED_FAIL = '[ORDER] SET AS PREPARED FAIL'
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
    props<{ order: Order, fromRoute: OrderRoute }>()
);
export const getProducts = createAction(
    OrderActionsType.LOAD_PRODUCTS
);
export const getProductsSuccess = createAction(
    OrderActionsType.LOAD_PRODUCTS_SUCCESS,
    props<{ orderId: number, products: Product[] }>()
);
export const getProductsFail = createAction(
    OrderActionsType.LOAD_PRODUCTS_FAIL,
    props<{ orderId: number }>()
);
export const getPayment = createAction(
    OrderActionsType.LOAD_PAYMENT
);
export const getPaymentSuccess = createAction(
    OrderActionsType.LOAD_PAYMENT_SUCCESS,
    props<{ orderId: number, payment: Payment }>()
);
export const getPaymentFail = createAction(
    OrderActionsType.LOAD_PAYMENT_FAIL
);
export const getCompleted = createAction(
    OrderActionsType.LOAD_COMPLETED
);
export const getCompletedSuccess = createAction(
    OrderActionsType.LOAD_COMPLETED_SUCCESS,
    props<{ orders: Order[] }>()
);
export const getCompletedFail = createAction(
    OrderActionsType.LOAD_COMPLETED_FAIL,
    props<{ orders: Order[] }>()
);
export const getToDeliver = createAction(
    OrderActionsType.LOAD_TO_DELIVER
);
export const getToDeliverSuccess = createAction(
    OrderActionsType.LOAD_TO_DELIVER_SUCCESS,
    props<{ orders: Order[] }>()
);
export const getToDeliverFail = createAction(
    OrderActionsType.LOAD_TO_DELIVER_FAIL
);

export const getPrepared = createAction(
    OrderActionsType.LOAD_PREPARED
);
export const getPreparedSuccess = createAction(
    OrderActionsType.LOAD_PREPARED_SUCCESS,
    props<{ orders: Order[] }>()
);
export const getPreparedFail = createAction(
    OrderActionsType.LOAD_PREPARED_FAIL
);
export const setOrderAsPrepared = createAction(
    OrderActionsType.SER_ORDER_AS_PREPARED
);
export const setOrderAsPreparedSuccess = createAction(
    OrderActionsType.SET_ORDER_AS_PREPARED_SUCCESS,
    props<{ order: Order }>()
);
export const setOrderAsPreparedFail = createAction(
    OrderActionsType.SET_ORDER_AS_PREPARED_FAIL
);
