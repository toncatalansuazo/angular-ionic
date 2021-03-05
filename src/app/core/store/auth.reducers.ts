import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromAuth from "./auth.actions";
const featureKey = 'auth';

export interface State {
    isAuthenticated: boolean;
    error: string;
}

const initialState: State = {
    isAuthenticated: false,
    error: undefined
};

const _authReducer = createReducer(
  initialState,
  on(fromAuth.loginSuccess, (state: State) => ({
    ...state,
    isAuthenticated: true
  })),
  on(fromAuth.loginFailed, (state: State, { error }) => ({
    ...state,
    isAuthenticated: false,
    error
  }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}

export const getAuthState = createFeatureSelector<State>(featureKey);
export const isAuthenticated = createSelector(
  getAuthState,
  (state: State) => state.isAuthenticated
);
export const getLoginError = createSelector(
  getAuthState,
  (state: State) => state.error
);
