import { createSelector } from '@ngrx/store';

import { getUserFeatureState } from '@core/store/reducers';
import * as fromUser from '@core/store/reducers/user.reducer';

export const getUserState = createSelector(
  getUserFeatureState,
  fromUser.getUserState
);

export const getUserId = createSelector(
  getUserState,
  fromUser.getUserId
);
export const getUserName = createSelector(
  getUserState,
  fromUser.getUserName
);
export const getUserEmail = createSelector(
  getUserState,
  fromUser.getUserEmail
);
export const getUserRole = createSelector(
  getUserState,
  fromUser.getUserRole
);
export const getUserIsAdmin = createSelector(
  getUserState,
  fromUser.getUserIsAdmin
);
export const getUserIsLoggedIn = createSelector(
  getUserState,
  fromUser.getUserIsLoggedIn
);
