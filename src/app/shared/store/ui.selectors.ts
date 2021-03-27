import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from './ui.reducer';

export const getUiState = createFeatureSelector<State>(featureKey);
export const getIsLoadingProgressBar = createSelector(getUiState, (state: State) => state.isLoadingProgressBar);
export const getIsLoadingModal = createSelector(getUiState, (state: State) => state.isLoadingModal);
export const getError = createSelector(getUiState, (state: State) => state.error);
// export const selectProductInModal = createSelector(getUiState, (state: State) => state.productModal);
