export interface PaginatorModel {
  currentPage: number;
  totalPages: number;
  lastPage: number;
  pagesInRange: number[];

  hasNextPage: boolean;
  hasPrevPage: boolean;

  perPage: number;
  docsFrom: number;
  docsTo: number;
  docsTotal: number;
}

export type PaginatorState = PaginatorModel | null;
