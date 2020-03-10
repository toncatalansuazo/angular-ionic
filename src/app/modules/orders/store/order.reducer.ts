import * as fromRoot from '../../../app.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrdersActions, SetOrdersCompletedAction } from './orders.action';
import { Order } from '../order.model';
import { SET_ORDERS_COMPLETED_ACTION } from './orders.action';

export interface OrdersState {
    completed: Order[];
}

const initialState: OrdersState = {
    completed: []
};

export interface State extends fromRoot.State {
  home: OrdersState[];
}

export function orderReducer(state = initialState, action: OrdersActions) {
  switch (action.type) {
    case SET_ORDERS_COMPLETED_ACTION:
      return {
        ...state,
        completed: (action as SetOrdersCompletedAction).payload
      };
    default: {
      return state;
    }
  }
}

export const getOrdersState = createFeatureSelector<OrdersState>('orders');

export const getCompleted = createSelector(getOrdersState, (state: OrdersState) => state.completed);
