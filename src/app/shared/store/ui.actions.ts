import { createAction, props } from '@ngrx/store';

enum uiActionTypes {
    START_LOADING = '[UI] Start loading',
    STOP_LOADING = '[UI] Stop loading',
    SET_ERROR = '[UI] error'
}

export const startLoading = createAction(uiActionTypes.START_LOADING);
export const stopLoading = createAction(uiActionTypes.STOP_LOADING);
export const setError = createAction(uiActionTypes.SET_ERROR,
    props<{ error: string }>()
);
