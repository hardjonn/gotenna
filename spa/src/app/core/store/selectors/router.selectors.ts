import { createSelector } from '@ngrx/store';
import { Params, Data } from '@angular/router';

import { getRouterFeatureState } from '@core/store/reducers';
import * as fromRouter from '@core/store/reducers/router.reducer';

export const getRouterState = createSelector(
  getRouterFeatureState,
  fromRouter.getRouterState
);

export const getRouterUrl = createSelector(
  getRouterState,
  fromRouter.getRouterUrl
);

export const getRouterData = createSelector(
  getRouterState,
  fromRouter.getRouterData
);

export const getRouterParams = createSelector(
  getRouterState,
  fromRouter.getRouterParams
);

export const getRouterQueryParams = createSelector(
  getRouterState,
  fromRouter.getRouterQueryParams
);

export const getRouterParamId = createSelector(
  getRouterParams,
  (params: Params) => (!!params.id ? params.id : '0')
);

export const getRouterParamPage = createSelector(
  getRouterParams,
  (params: Params) => (!!params.page ? params.page : '1')
);

export const getRouterParamByName = (paramName: string) =>
  createSelector(getRouterParams, params => params[paramName] || '');

export const getRouterQueryByName = (paramName: string) =>
  createSelector(getRouterQueryParams, params => params[paramName] || '');
