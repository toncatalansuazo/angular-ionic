import * as fromRoot from '../../../app.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrdersActions, SetOrdersCompletedAction, SET_PENDING_ORDERS_ACTION,
  SetPendingOrdersAction, SET_ORDERS_TO_DELIVER_ACTION,
  SetOrdersToDeliverAction } from './orders.action';
import { Order } from '../order.model';
import { SET_ORDERS_COMPLETED_ACTION } from './orders.action';

export interface OrdersState {
    completed: Order[];
    pending: Order[];
    toDeliver: Order[];
}

export const initialState: OrdersState = {
    completed: [],
    pending: [],
    toDeliver: []
};

export interface State extends fromRoot.State {
  orders: OrdersState[];
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
    default: {
      return state;
    }
  }
}

export const getOrdersState = createFeatureSelector<OrdersState>('orders');

export const getCompleted = createSelector(getOrdersState, (state: OrdersState) => state.completed);
export const getPending = createSelector(getOrdersState, (state: OrdersState) => state.pending);
export const getToDeliver = createSelector(getOrdersState, (state: OrdersState) => state.toDeliver);
