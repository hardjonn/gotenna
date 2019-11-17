import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ConfigModel, ConfigState } from '@core/models';
import { ConfigActionTypes, ConfigActions } from '@core/store/actions';

export const storeFeatureName = 'config';

const initialState: ConfigState = null;

export function reducer(
  state = initialState,
  action: ConfigActions
): ConfigState {
  switch (action.type) {
    case ConfigActionTypes.Init: {
      return { ...state, ...action.payload };
    }
  }
  return state;
}

export const getConfigState = (state: ConfigState) => state;
