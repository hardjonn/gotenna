import { Action } from '@ngrx/store';
import { UploadModel } from '@core/models/upload.model';

export enum UploadActionTypes {
  Upload = '[Admin Page] Upload',
  UploadFail = '[Upload API] Upload Fail',
  UploadSuccess = '[Upload API] Upload Success',
}

export class Upload implements Action {
  readonly type = UploadActionTypes.Upload;
  constructor(public payload: UploadModel) {}
}

export class UploadFail implements Action {
  readonly type = UploadActionTypes.UploadFail;
  constructor(public payload: any) {}
}

export class UploadSuccess implements Action {
  readonly type = UploadActionTypes.UploadSuccess;
  constructor(public payload: any) {}
}

export type UploadActions = Upload | UploadFail | UploadSuccess;
