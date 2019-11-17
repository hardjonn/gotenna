import { createSelector } from '@ngrx/store';

import { getPaginatorFeatureState } from '@core/store/reducers';
import * as fromPaginator from '@core/store/reducers/paginator.reducer';

export const getPaginatorState = createSelector(
  getPaginatorFeatureState,
  fromPaginator.getPaginatorState
);

export const getPaginatorCurrentPage = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorCurrentPage
);

export const getPaginatorLastPage = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorLastPage
);

export const getPaginatorDocsFrom = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorDocsFrom
);

export const getPaginatorDocsTo = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorDocsTo
);

export const getPaginatorDocsTotal = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorDocsTotal
);

export const getPaginatorTotalPages = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorTotalPages
);

export const getPaginatorPagesInRange = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorPagesInRange
);

export const getPaginatorHasNextPage = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorHasNextPage
);

export const getPaginatorHasPrevPage = createSelector(
  getPaginatorState,
  fromPaginator.getPaginatorHasPrevPage
);
