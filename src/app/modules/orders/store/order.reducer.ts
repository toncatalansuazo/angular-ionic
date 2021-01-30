import * as fromRoot from '../../../app.reducer';
import { createSelector, createFeatureSelector, createReducer, on, State } from '@ngrx/store';
import { OrdersActions,
  SetOrdersCompletedAction,
  SET_PENDING_ORDERS_ACTION,
  SetPendingOrdersAction,
  SET_ORDERS_TO_DELIVER_ACTION,
  SetOrdersToDeliverAction,
  SET_PRODUCTS_IN_ORDER_ACTION,
  SetProductsInOrderAction,
  SET_PAYMENT_ORDER_ACTION,
  SetPaymentOrderAction} from './order.action';
import { Order } from '../order.model';
import { SET_ORDERS_COMPLETED_ACTION } from './order.action';
import { Product } from 'src/app/core/http/product/product.model';
import { Payment } from '../../../core/http/payment/payment.model';
import * as fromOrderAction  from "./order.action";
import { OrderRow } from '../order-row';

export const featureKey = 'orders';

export interface OrderState {
    completed: Order[];
    pending: Order[];
    toDeliver: Order[];
    productsInOrder: Product[];
    paymentOrder: Payment;
    selected: OrderRow;
}

export const initialState: OrderState = {
    completed: [],
    pending: [],
    toDeliver: [],
    productsInOrder: [],
    paymentOrder: undefined,
    selected: undefined
};

export interface State extends fromRoot.State {
  orders: OrderState[];
}

export const orderReducer = createReducer(initialState, 
  on(fromOrderAction.pendingOrdersSuccess, (state: OrderState, { orders }) => ({
    ...state,
    pending: orders
  })),
  on(fromOrderAction.selectOrder, (state: OrderState, { order }) => ({
    ...state,
    selected: order
  }))
);

// function setProductsInOrder(state, action: SetProductsInOrderAction): OrderState {
//   const products: Product[] = action.payload;
//   return {
//     ...state,
//     productsInOrder: action.payload
//   };
// }

// function setPaymentOrder(state, action: SetPaymentOrderAction): OrderState {
//   return {
//     ...state,
//     paymentOrder: action.payload
//   };
// }

// export function orderReducer(state = initialState, action: OrdersActions): OrderState {
//   switch (action.type) {
//     case SET_ORDERS_COMPLETED_ACTION:
//       return {
//         ...state,
//         completed: (action as SetOrdersCompletedAction).payload
//       };
//     case SET_PENDING_ORDERS_ACTION:
//         return {
//           ...state,
//           pending: (action as SetPendingOrdersAction).payload
//         };
//     case SET_ORDERS_TO_DELIVER_ACTION:
//       return {
//         ...state,
//         toDeliver: (action as SetOrdersToDeliverAction).payload
//       };
//     case SET_PRODUCTS_IN_ORDER_ACTION:
//       return setProductsInOrder(state, action as SetProductsInOrderAction);
//     case SET_PAYMENT_ORDER_ACTION:
//       return setPaymentOrder(state, action as SetPaymentOrderAction);
//     default: {
//       return state;
//     }
//   }
// }
