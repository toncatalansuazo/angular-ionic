import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { fromUiReducers, fromUiActions } from './shared/store';
import { fromAuthAction, fromAuthReducer } from './core/store';

export interface State {
  ui: fromUiReducers.State;
  auth: fromAuthReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUiReducers.uiReducer,
  auth: fromAuthReducer.authReducer
};
