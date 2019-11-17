import { PaginatorModel, PaginatorState } from '@core/models';
import { PaginatorActions, PaginatorActionTypes } from '@core/store/actions';

const initialState: PaginatorState = null;

export function reducer(
  state = initialState,
  action: PaginatorActions
): PaginatorState {
  switch (action.type) {
    case PaginatorActionTypes.UpdateImage: {
      return { ...state, ...action.payload };
    }
  }

  return state;
}

export const getPaginatorState = (paginator: PaginatorState) => paginator;

export const getPaginatorCurrentPage = (paginator: PaginatorState) =>
  paginator.currentPage;

export const getPaginatorTotalPages = (paginator: PaginatorState) =>
  paginator.totalPages;

export const getPaginatorLastPage = (paginator: PaginatorState) =>
  paginator.lastPage;

export const getPaginatorDocsFrom = (paginator: PaginatorState) =>
  paginator.docsFrom;

export const getPaginatorDocsTo = (paginator: PaginatorState) =>
  paginator.docsTotal;

export const getPaginatorDocsTotal = (paginator: PaginatorState) =>
  paginator.docsTotal;

export const getPaginatorPerPage = (paginator: PaginatorState) =>
  paginator.perPage;

export const getPaginatorPagesInRange = (paginator: PaginatorState) =>
  paginator.pagesInRange;

export const getPaginatorHasNextPage = (paginator: PaginatorState) =>
  paginator.hasNextPage;

export const getPaginatorHasPrevPage = (paginator: PaginatorState) =>
  paginator.hasPrevPage;
