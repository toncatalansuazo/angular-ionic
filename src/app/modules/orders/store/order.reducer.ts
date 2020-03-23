import * as fromRoot from '../../../app.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrdersActions, SetOrdersCompletedAction, SET_PENDING_ORDERS_ACTION,
  SetPendingOrdersAction, SET_ORDERS_TO_DELIVER_ACTION,
  SetOrdersToDeliverAction, 
  SET_PRODUCTS_IN_ORDER_ACTION,
  SetProductsInOrderAction,
  SET_PAYMENT_ORDER_ACTION,
  SetPaymentOrderAction} from './orders.action';
import { Order } from '../order.model';
import { SET_ORDERS_COMPLETED_ACTION } from './orders.action';
import { Product } from 'src/app/core/http/product/product.model';

export interface OrdersState {
    completed: Order[];
    pending: Order[];
    toDeliver: Order[];
    productsInOrder: Product[];
    paymentOrder: Payment;
}

export const initialState: OrdersState = {
    completed: [],
    pending: [],
    toDeliver: [],
    productsInOrder: [],
    paymentOrder: null
};

export interface State extends fromRoot.State {
  orders: OrdersState[];
}

function setProductsInOrder(state, action: SetProductsInOrderAction): OrdersState {
  const products: Product[] = action.payload;
  return {
    ...state,
    productsInOrder: action.payload
  };
}

function setPaymentOrder(state, action: SetPaymentOrderAction): OrdersState {
  return {
    ...state,
    paymentOrder: action.payload
  };
}

export function orderReducer(state = initialState, action: OrdersActions): OrdersState {
  switch (action.type) {
    case SET_ORDERS_COMPLETED_ACTION:
      return {
        ...state,
        completed: (action as SetOrdersCompletedAction).payload
      };
    case SET_PENDING_ORDERS_ACTION:
        return {
          ...state,
          pending: (action as SetPendingOrdersAction).payload
        };
    case SET_ORDERS_TO_DELIVER_ACTION:
      return {
        ...state,
        toDeliver: (action as SetOrdersToDeliverAction).payload
      };
    case SET_PRODUCTS_IN_ORDER_ACTION:
      return setProductsInOrder(state, action as SetProductsInOrderAction);
    case SET_PAYMENT_ORDER_ACTION:
      return setPaymentOrder(state, action as SetPaymentOrderAction);
    default: {
      return state;
    }
  }
}



export const getOrdersState = createFeatureSelector<OrdersState>('orders');
export const getCompleted = createSelector(getOrdersState, (state: OrdersState) => state.completed);
export const getPending = createSelector(getOrdersState, (state: OrdersState) => state.pending);
export const getToDeliver = createSelector(getOrdersState, (state: OrdersState) => state.toDeliver);
export const getOrderInProducts = createSelector(getOrdersState, (state: OrdersState) => state.productsInOrder);
export const getPaymentOrder = createSelector(getOrdersState, (state: OrdersState): Payment => state.paymentOrder);
