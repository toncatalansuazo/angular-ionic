import { Alert } from '../alert/alert.model';
import { SET_ALERTS, HomeActions, SetAlertsAction } from './home.action';
import * as fromRoot from '../../../app.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface HomeState {
    alerts: Alert[];
}

const initialState: HomeState = {
    alerts: []
};

export interface State extends fromRoot.State {
  home: HomeState[];
}

export function homeReducer(state = initialState, action: HomeActions) {
  switch (action.type) {
    case SET_ALERTS:
      return {
        ...state,
        alerts: (action as SetAlertsAction).payload
      };
    default: {
      return state;
    }
  }
}

export const getHomeState = createFeatureSelector<HomeState>('home');

export const getAlerts = createSelector(getHomeState, (state: HomeState) => state.alerts);
