import { createSelector } from '@ngrx/store';

import { getConfigFeatureState } from '@core/store/reducers';
import * as fromConfig from '@core/store/reducers/config.reducer';

export const getConfigState = createSelector(
  getConfigFeatureState,
  fromConfig.getConfigState
);

export const getConfig = createSelector(
  getConfigFeatureState,
  fromConfig.getConfigState
);

export const getConfigSection = (sectionName: string) =>
  createSelector(getConfig, config => (!!config ? config[sectionName] : null));
