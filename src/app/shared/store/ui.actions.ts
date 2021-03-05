import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/http/product/product.model';
import { ProductModalType } from 'src/app/model/ProductModalType';

enum uiActionTypes {
    START_LOADING_PROGRESSBAR = '[UI] Start loading',
    STOP_LOADING_PROGRESSBAR = '[UI] Stop loading',
    SET_ERROR = '[UI] error',
    SHOW_PRODUCT_IN_MODAL = '[UI] Show product in modal',
    START_LOADING_MODAL = "[UI] START_LOADING_MODAL",
    STOP_LOADING_MODAL = "[UI] STOP_LOADING_MODAL"
}

export const startLoadingProgressBar = createAction(uiActionTypes.START_LOADING_PROGRESSBAR);
export const stopLoadingProgressBar = createAction(uiActionTypes.STOP_LOADING_PROGRESSBAR);
export const startLoadingModal = createAction(uiActionTypes.START_LOADING_MODAL,
    props<{ cssClass?: string, message: string, duration?: number }>());
export const stopLoadingModal = createAction(uiActionTypes.STOP_LOADING_MODAL);
export const setError = createAction(uiActionTypes.SET_ERROR,
    props<{ error: string }>()
);
export const showProductInModal = createAction(uiActionTypes.SHOW_PRODUCT_IN_MODAL,
    props<{ product: Product, mode: ProductModalType }>()
);
