import { Action } from '@ngrx/store';
import { ConfigModel } from '@core/models';

export enum ConfigActionTypes {
  Init = '[CONFIG SERVICE] Init Config After Initial Loading',

  Save = '[DIALOG] Save Config Instance',
  SaveFail = '[CONFIG API] Save Fail',
  SaveSuccess = '[CONFIG API] Save Success',
}

export class ConfigInit implements Action {
  readonly type = ConfigActionTypes.Init;
  constructor(public payload: ConfigModel) {}
}

export class ConfigSave implements Action {
  readonly type = ConfigActionTypes.Save;
  constructor(public payload: ConfigModel) {}
}

export class ConfigSaveFail implements Action {
  readonly type = ConfigActionTypes.SaveFail;
  constructor(public payload: any) {}
}

export class ConfigSaveSuccess implements Action {
  readonly type = ConfigActionTypes.SaveSuccess;
  constructor(public payload: ConfigModel) {}
}

export type ConfigActions =
  | ConfigInit
  | ConfigSave
  | ConfigSaveFail
  | ConfigSaveSuccess;
