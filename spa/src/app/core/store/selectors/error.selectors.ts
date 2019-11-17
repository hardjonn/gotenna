import { createSelector } from '@ngrx/store';

import { getErrorFeatureState } from '@core/store/reducers';
import * as fromError from '@core/store/reducers/error.reducer';

export const getErrorState = createSelector(
  getErrorFeatureState,
  fromError.getErrorState
);

export const getErrorHttp = createSelector(
  getErrorState,
  fromError.getErrorHttp
);
