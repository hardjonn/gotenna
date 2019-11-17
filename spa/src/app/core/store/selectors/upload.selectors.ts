import { createSelector } from '@ngrx/store';

import * as fromUpload from '@core/store/reducers/upload.reducer';

export const getUploadState = createSelector(
  fromUpload.getUploadFeatureState,
  (upload: fromUpload.UploadFeatureState) => upload.state
);

export const getUploadUploading = createSelector(
  getUploadState,
  fromUpload.getUploadUploading
);

export const getUploadError = createSelector(
  getUploadState,
  fromUpload.getUploadError
);
