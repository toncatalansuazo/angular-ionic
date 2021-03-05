import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductReducer from './product.reducer';

export const getProductState = createFeatureSelector<fromProductReducer.State>(fromProductReducer.featureKey);
export const getProductSelected = createSelector(getProductState, (state: fromProductReducer.State) => state.selected);
export const getProducts = createSelector(getProductState, (state: fromProductReducer.State) => state.products);
export const getProductsOutStock = createSelector(getProductState, (state: fromProductReducer.State) => state.products.filter(product => product.stock <= 0));
