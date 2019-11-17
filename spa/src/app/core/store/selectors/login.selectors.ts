import { createSelector } from '@ngrx/store';

import * as fromLogin from '@core/store/reducers/login.reducer';

export const getLoginState = createSelector(
  fromLogin.getLoginFeatureState,
  (login: fromLogin.LoginFeatureState) => login.state
);

export const getLoginPending = createSelector(
  getLoginState,
  fromLogin.getLoginPending
);

export const getLoginError = createSelector(
  getLoginState,
  fromLogin.getLoginError
);
