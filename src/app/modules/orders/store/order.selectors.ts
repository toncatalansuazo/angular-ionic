import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Payment } from 'src/app/core/http/payment/payment.model';
import { OrderRow } from '../order-row';
import { OrderState, featureKey } from './order.reducer';

export const getOrdersState = createFeatureSelector<OrderState>(featureKey);
export const getCompleted = createSelector(getOrdersState, (state: OrderState) => state.completed);
export const getPending = createSelector(getOrdersState, (state: OrderState) => state.pending);
export const getToDeliver = createSelector(getOrdersState, (state: OrderState) => state.toDeliver);
export const getOrderInProducts = createSelector(getOrdersState, (state: OrderState) => state.productsInOrder);
export const getPaymentOrder = createSelector(getOrdersState, (state: OrderState): Payment => state.paymentOrder);
export const getSelectedOrder = createSelector(getOrdersState, (state: OrderState): OrderRow => state.selected);
