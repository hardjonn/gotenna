import { createSelector } from '@ngrx/store';

import { getUiFeatureState } from '@core/store/reducers';
import * as fromUi from '@core/store/reducers/ui.reducer';

export const getUiState = createSelector(getUiFeatureState, fromUi.getUiState);

export const getUiNotifierVisible = createSelector(
  getUiState,
  fromUi.getUiNotifierVisible
);

export const getUiNotifierMessage = createSelector(
  getUiState,
  fromUi.getUiNotifierMessage
);

export const getUiNotifierType = createSelector(
  getUiState,
  fromUi.getUiNotifierType
);

export const getUiFilterDim = createSelector(getUiState, fromUi.getUiFilterDim);
