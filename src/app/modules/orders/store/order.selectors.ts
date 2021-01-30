import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Payment } from 'src/app/core/http/payment/payment.model';
import { Order } from '../order.model';
import { OrderState, featureKey } from './order.reducer';

export const getOrdersState = createFeatureSelector<OrderState>(featureKey);
export const getCompleted = createSelector(getOrdersState, (state: OrderState) => state.completed);
export const getPending = createSelector(getOrdersState, (state: OrderState) => state.pending);
export const getToDeliver = createSelector(getOrdersState, (state: OrderState) => state.toDeliver);
export const getProductsInOrder = createSelector(getOrdersState, (state: OrderState, props) => state.productsInOrder[props.id]);
export const getPaymentOrder = createSelector(getOrdersState, (state: OrderState, props) => {
  console.log({props});
  console.log('paymentInOrder', state.paymentInOrder)
  return state.paymentInOrder[props.id];
});
export const getSelectedOrder = createSelector(getOrdersState, (state: OrderState): Order => state.selected);
