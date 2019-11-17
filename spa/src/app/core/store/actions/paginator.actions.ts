import { Action } from '@ngrx/store';
import { PaginatorModel } from '@core/models/paginator.model';

export enum PaginatorActionTypes {
  UpdateImage = '[FX IMAGE LOAD SUCCESS] Paginator Update',
}

export class PaginatorUpdateImage implements Action {
  readonly type = PaginatorActionTypes.UpdateImage;
  constructor(public payload: PaginatorModel) {}
}

export type PaginatorActions = PaginatorUpdateImage;
