import { Action } from '@ngrx/store';

import { UiNotifierPayload, UiFilterDimModel } from '@core/models';

export enum UiActionTypes {
  NotifierShow = '[APP UI] Notification Show',
  NotifierHide = '[APP UI] Notification Hide',

  FilterDimUpdate = '[FX IMAGE LOAD SUCCESS] Update Dim Filter',
  FilterDimApply = '[GALLERY PAGE] Filter Apply',
}

export class UiNotifierShow implements Action {
  readonly type = UiActionTypes.NotifierShow;
  constructor(public payload: UiNotifierPayload) {}
}

export class UiNotifierHide implements Action {
  readonly type = UiActionTypes.NotifierHide;
}

export class UiFilterDimApply implements Action {
  readonly type = UiActionTypes.FilterDimApply;
  constructor(public payload: UiFilterDimModel) {}
}

export class UiFilterDimUpdate implements Action {
  readonly type = UiActionTypes.FilterDimUpdate;
  constructor(public payload: UiFilterDimModel[]) {}
}

export type UiActions =
  | UiNotifierShow
  | UiNotifierHide
  | UiFilterDimApply
  | UiFilterDimUpdate;
