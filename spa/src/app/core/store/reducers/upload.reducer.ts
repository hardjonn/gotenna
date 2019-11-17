import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { UploadActions, UploadActionTypes } from '@core/store/actions';
import { UploadState } from '@core/models/upload.model';

export const initialState: UploadState = {
  uploading: false,
  error: null,
};

export const storeFeatureName = 'upload';

export function reducer(
  state = initialState,
  action: UploadActions
): UploadState {
  switch (action.type) {
    case UploadActionTypes.Upload: {
      return {
        ...state,
        uploading: true,
        error: null,
      };
    }

    case UploadActionTypes.UploadFail: {
      return {
        ...state,
        uploading: false,
        error: action.payload,
      };
    }

    case UploadActionTypes.UploadSuccess: {
      return initialState;
    }
  }

  return state;
}

export const getUploadUploading = (state: UploadState) => state.uploading;
export const getUploadError = (state: UploadState) => state.error;

export interface UploadFeatureState {
  state: UploadState;
}

export const reducers: ActionReducerMap<UploadFeatureState> = {
  state: reducer,
};

export const getUploadFeatureState = createFeatureSelector<UploadFeatureState>(
  storeFeatureName
);

export const UPLOAD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<UploadFeatureState>
>('Upload Feature Reducers');

export function getReducers(): ActionReducerMap<UploadFeatureState> {
  return reducers;
}
