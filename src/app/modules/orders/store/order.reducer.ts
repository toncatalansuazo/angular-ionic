import * as fromRoot from '../../../app.reducer';
import { createSelector, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Order } from '../order.model';
import { SET_ORDERS_COMPLETED_ACTION } from './order.action';
import { Product } from 'src/app/core/http/product/product.model';
import { Payment } from '../../../core/http/payment/payment.model';
import * as fromOrderAction  from "./order.action";

export const featureKey = 'orders';

export interface OrderState {
    completed: Order[];
    pending: Order[];
    toDeliver: Order[];
    productsInOrder: { [key: number]: Product[] };
    paymentInOrder: { [key: number]: Payment };
    // current order selected
    selected: Order;
}

export const initialState: OrderState = {
    completed: undefined,
    pending: [],
    toDeliver: [],
    productsInOrder: [],
    paymentInOrder: [],
    selected: undefined
};

export const orderReducer = createReducer(initialState, 
  on(fromOrderAction.pendingOrdersSuccess, (state: OrderState, { orders }) => ({
    ...state,
    pending: orders
  })),
  on(fromOrderAction.selectOrder, (state: OrderState, { order }) => ({
    ...state,
    selected: order
  })),
  on(fromOrderAction.getProductsSuccess, (state: OrderState, { orderId, products}) => {
    let orderProductsToAdd = {};
    orderProductsToAdd[orderId] = products;
    return {
      ...state,
      productsInOrder: {...state.productsInOrder, ...orderProductsToAdd}
    };
  }),
  on(fromOrderAction.getPaymentSuccess, (state: OrderState, { orderId, payment}) => {
    let orderPaymentToAdd = {};
    orderPaymentToAdd[orderId] = payment;
    return {
      ...state,
      paymentInOrder: { ...state.paymentInOrder, ...orderPaymentToAdd }
    };
  }),
  on(fromOrderAction.getCompletedSuccess, (state: OrderState, { orders }) => {
    return {
      ...state,
      completed: orders
    };
  }),
  on(fromOrderAction.getToDeliverSuccess, (state: OrderState, { orders }) => {
    return {
      ...state,
      toDeliver: orders
    };
  }),
  on(fromOrderAction.setOrderAsPreparedSuccess, (state: OrderState, { order }) => {
    const pendingOrders = [...state.pending];
    const index = pendingOrders.findIndex(pendingOrder => pendingOrder.id === order.id);
    pendingOrders[index] = order;
    return {
      ...state,
      selected: order,
      pending: pendingOrders
    };
  }),
  on(fromOrderAction.setDeliveryInfoToToDeliverOrderSuccess, (state: OrderState, { order, deliveryInfo }) => {
    const paymentsInOrder = {...state.paymentInOrder};
    paymentsInOrder[order.id] = { ...paymentsInOrder[order.id], ...deliveryInfo };
    return {
      ...state,
      paymentInOrder: paymentsInOrder
    };
  }),
  on(fromOrderAction.setDeliveryInfoToPendingOrderSuccess, (state: OrderState, { order, deliveryInfo }) => {
    console.log('setDeliveryInfoToPendingOrderSuccess');
    const paymentsInOrder = {...state.paymentInOrder}
    paymentsInOrder[order.id] = { ...paymentsInOrder[order.id], ...deliveryInfo };
    return {
      ...state,
      paymentInOrder: paymentsInOrder
    };
  })
);
