import { Action } from '@ngrx/store';
import { ImageResponseModel, ImageModel } from '@core/models';

export enum ImageActionTypes {
  Load = '[Load Images Resolver] Load Images',
  LoadFail = '[IMAGE API] Load Fail',
  LoadSuccess = '[IMAGE API] Load Success',

  FxApply = '[Gallery Page] Apply Fx',
  FxApplyFail = '[IMAGE API] Fx Fail',
  FxApplySuccess = '[IMAGE API] Fx Success',
}

export class ImageLoad implements Action {
  readonly type = ImageActionTypes.Load;
  constructor() {}
}

export class ImageLoadFail implements Action {
  readonly type = ImageActionTypes.LoadFail;
  constructor(public payload: any) {}
}

export class ImageLoadSuccess implements Action {
  readonly type = ImageActionTypes.LoadSuccess;
  constructor(public payload: ImageResponseModel) {}
}

export class ImageFxApply implements Action {
  readonly type = ImageActionTypes.FxApply;
  constructor(public payload: ImageModel) {}
}

export class ImageFxApplyFail implements Action {
  readonly type = ImageActionTypes.FxApplyFail;
  constructor(public payload: any) {}
}

export class ImageFxApplySuccess implements Action {
  readonly type = ImageActionTypes.FxApplySuccess;
  constructor(public payload: ImageModel) {}
}

export type ImageActions =
  | ImageLoad
  | ImageLoadFail
  | ImageLoadSuccess
  | ImageFxApply
  | ImageFxApplyFail
  | ImageFxApplySuccess;
