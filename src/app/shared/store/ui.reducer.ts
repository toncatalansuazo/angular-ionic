import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromUiActions from './ui.actions';
import * as fromRoot from '../../../app/app.reducer'

export const featureKey = 'ui';
export interface State {
  isLoading: boolean;
  error: string;
}

const initialState: State = {
  isLoading: false,
  error: undefined
};

export const uiReducer = createReducer(initialState,
  on(fromUiActions.startLoading, (state: State) => ({
    ...state,
    isLoading: true
  })),
  on(fromUiActions.startLoading, (state: State) => ({
    ...state,
    isLoading: true
  })),
  on(fromUiActions.setError, (state: State, { error }) => ({
    ...state,
    error
  }))
);

export const getUiState = createFeatureSelector<State>(featureKey);
export const getIsLoading = createSelector(getUiState, (state: State) => state.isLoading);
export const getError = createSelector(getUiState, (state: State) => state.error);
