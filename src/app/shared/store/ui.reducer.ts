import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromUiActions from './ui.actions';
import { Product } from 'src/app/core/http/product/product.model';

export const featureKey = 'ui';
export interface State {
  isLoadingProgressBar: boolean;
  isLoadingModal: boolean;
  error: string| undefined;
  // productModal: Product;
}

const initialState: State = {
  isLoadingProgressBar: false,
  isLoadingModal: false,
  error: undefined,
  // productModal: undefined
};

export const uiReducer = createReducer(initialState,
  on(fromUiActions.startLoadingModal, (state: State) => ({
    ...state,
    isLoadingModal: true
  })),
  on(fromUiActions.stopLoadingModal, (state: State) => ({
    ...state,
    isLoadingModal: false
  })),
  on(fromUiActions.startLoadingProgressBar, (state: State) => ({
    ...state,
    isLoadingProgressBar: true
  })),
  on(fromUiActions.stopLoadingProgressBar, (state: State) => ({
    ...state,
    isLoadingProgressBar: false
  })),
  // on(fromUiActions.showProductInModal, (state: State, { product }) => ({
  //   ...state,
  //   productModal: product
  // })),
  on(fromUiActions.setError, (state: State, { error }) => ({
    ...state,
    error
  }))
);
