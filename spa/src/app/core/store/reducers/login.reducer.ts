import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { LoginActions, LoginActionTypes } from '@core/store/actions';
import { LoginState } from '@core/models/login.model';

export const initialState: LoginState = {
  pending: false,
  error: null,
};

export const storeFeatureName = 'login';

export function reducer(
  state = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LoginActionTypes.Login: {
      return {
        ...state,
        pending: true,
        error: null,
      };
    }

    case LoginActionTypes.LoginFail: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    }

    case LoginActionTypes.LoginSuccess: {
      return initialState;
    }
  }

  return state;
}

export const getLoginPending = (state: LoginState) => state.pending;
export const getLoginError = (state: LoginState) => state.error;

export interface LoginFeatureState {
  state: LoginState;
}

export const reducers: ActionReducerMap<LoginFeatureState> = {
  state: reducer,
};

export const getLoginFeatureState = createFeatureSelector<LoginFeatureState>(
  storeFeatureName
);

export const LOGIN_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<LoginFeatureState>
>('Login Feature Reducers');

export function getReducers(): ActionReducerMap<LoginFeatureState> {
  return reducers;
}
