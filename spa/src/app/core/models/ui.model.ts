export enum UiNotifierTypes {
  Error = 'error',
  Ok = 'ok',
}

export interface UiNotifierPayload {
  message: string;
  type: UiNotifierTypes;
}

export interface UiFilterDimModel {
  width: number;
  height: number;
  key: string;
  qty: number;
  active: boolean;
}

export interface UiModel {
  notifierVisible: boolean;
  notifierMessage: string | null;
  notifierType: UiNotifierTypes | null;
  filterDim: UiFilterDimModel[] | null;
}

export type UiState = UiModel | null;
