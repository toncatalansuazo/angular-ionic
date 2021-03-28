import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/http/product/product.model';

enum ProductActionsType {
  GET_PRODUCTS = '[PRODUCTS] Get products',
  GET_PRODUCTS_FAIL = '[PRODUCTS] Get products fail',
  GET_PRODUCTS_SUCCESS = '[PRODUCTS] Get products success',
  SET_PRODUCT_SELECTED = "[PRODUCT] SET PRODUCT SELECTED",
  UPDATE_PRODUCT = "[PRODUCT] UPDATE_PRODUCT",
  UPDATE_PRODUCT_FAIL = "[PRODUCT] UPDATE_PRODUCT_FAIL",
  UPDATE_PRODUCT_SUCCESS = "[PRODUCT] UPDATE_PRODUCT_SUCCESS"
}

export const getProducts = createAction(ProductActionsType.GET_PRODUCTS);
export const getProductsSuccess = createAction(ProductActionsType.GET_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>());
export const setProductSelected = createAction(ProductActionsType.SET_PRODUCT_SELECTED,
    props<{ product: Product }>());
export const getProductsFail = createAction(ProductActionsType.GET_PRODUCTS_FAIL);
export const updateProduct = createAction(ProductActionsType.UPDATE_PRODUCT,
  props<{ product: Product }>());
export const updateProductSuccess = createAction(ProductActionsType.UPDATE_PRODUCT_SUCCESS,
  props<{ product: Product }>());
export const updateProductFail = createAction(ProductActionsType.UPDATE_PRODUCT_FAIL);

