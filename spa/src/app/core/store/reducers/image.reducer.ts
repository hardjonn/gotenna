import { InjectionToken } from '@angular/core';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { ImageActionTypes, ImageActions } from '@core/store/actions';
import { ImageModel, ImageState } from '@core/models/image.model';

export const storeFeatureName = 'image';

export const imageAdapter: EntityAdapter<ImageModel> = createEntityAdapter<
  ImageModel
>({ selectId: (image: ImageModel) => image.id });

const initialState: ImageState = imageAdapter.getInitialState({
  loading: false,
  error: null,
});

export function reducer(
  state = initialState,
  action: ImageActions
): ImageState {
  switch (action.type) {
    case ImageActionTypes.Load: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case ImageActionTypes.LoadFail: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case ImageActionTypes.LoadSuccess: {
      return imageAdapter.addAll(action.payload.imageList, {
        ...state,
        error: null,
        loading: false,
      });
    }

    case ImageActionTypes.FxApplySuccess: {
      const imageId = action.payload.id;
      return imageAdapter.updateOne(
        { id: imageId, changes: action.payload },
        state
      );
    }
  }

  return state;
}

export const getImageState = (state: ImageState) => state;
export const getImageLoading = (state: ImageState) => state.loading;
export const getImageError = (state: ImageState) => state.error;
