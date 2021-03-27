import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/http/product/product.model';
import * as fromProductActions from './product.action';


export const featureKey = 'products';

export interface State {
  products: Product[];
  selected: Product| undefined;
}

const initialState: State = {
  products: [],
  selected: undefined,
};

export const productReducer = createReducer(initialState,
  on(fromProductActions.getProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  on(fromProductActions.getProductsFail, (state) => ({
    ...state,
    products: []
  })),
  on(fromProductActions.setProductSelected, (state, product) => ({
    ...state,
    product
  }))
);