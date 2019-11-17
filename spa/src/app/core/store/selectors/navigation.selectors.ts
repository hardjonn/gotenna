import { createSelector } from '@ngrx/store';

import { getNavigationFeatureState } from '@core/store/reducers';
import * as fromNavigation from '@core/store/reducers/navigation.reducer';

export const getNavigationState = createSelector(
  getNavigationFeatureState,
  fromNavigation.getNavigationState
);

export const getNavigationCurrentUrl = createSelector(
  getNavigationState,
  fromNavigation.getNavigationCurrentUrl
);
export const getNavigationPreviousUrl = createSelector(
  getNavigationState,
  fromNavigation.getNavigationPreviousUrl
);
