import { Alert } from '../alert/alert.model';
import * as fromHomeActions from './home.actions';
import { createSelector, createFeatureSelector, createReducer, on } from '@ngrx/store';

export const featureKey = 'home';
export interface HomeState {
    alerts: Alert[];
}

const initialState: HomeState = {
    alerts: []
};
export const homeReducer = createReducer(initialState,
    on(fromHomeActions.findAlertSuccess, (state: HomeState, { alerts }) => ({
      ...state,
      alerts
    }))
  );

export const getHomeState = createFeatureSelector<HomeState>(featureKey);

export const getAlerts = createSelector(getHomeState, (state: HomeState) => state.alerts);
