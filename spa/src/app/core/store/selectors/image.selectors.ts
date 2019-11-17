import { createSelector } from '@ngrx/store';

import { getImageFeatureState } from '@core/store/reducers';
import * as fromImage from '@core/store/reducers/image.reducer';

export const getImageState = createSelector(
  getImageFeatureState,
  fromImage.getImageState
);

export const getImageLoading = createSelector(
  getImageState,
  fromImage.getImageLoading
);

export const getImageError = createSelector(
  getImageState,
  fromImage.getImageError
);

export const {
  selectAll: getImageAll,
  selectTotal: getImageTotal,
  selectEntities: getImageEntities,
  selectIds: getImageIds,
} = fromImage.imageAdapter.getSelectors(getImageState);

export const getImageList = createSelector(
  getImageIds,
  getImageEntities,
  (imageIds, entities) => {
    const ids: (string | number)[] = imageIds;
    return !!entities ? ids.map(id => entities[id]) : [];
  }
);
