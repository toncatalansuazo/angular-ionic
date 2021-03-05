import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/http/product/product.model';

enum ProductActionsType {
  GET_PRODUCTS = '[PRODUCTS] Get products',
  GET_PRODUCTS_FAIL = '[PRODUCTS] Get products fail',
  GET_PRODUCTS_SUCCESS = '[PRODUCTS] Get products success',
  SET_PRODUCT = "[PRODUCT] SET PRODUCT"
}

export const getProducts = createAction(ProductActionsType.GET_PRODUCTS);
export const getProductsSuccess = createAction(ProductActionsType.GET_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>());
export const setProductSelected = createAction(ProductActionsType.SET_PRODUCT,
    props<{ product: Product }>());
export const getProductsFail = createAction(ProductActionsType.GET_PRODUCTS_FAIL);
