import { UiState, UiFilterDimModel } from '@core/models/ui.model';
import { UiActions, UiActionTypes } from '@core/store/actions/ui.actions';

const initialState: UiState = {
  notifierVisible: false,
  notifierMessage: null,
  notifierType: null,
  filterDim: null,
};

export function reducer(state = initialState, action: UiActions): UiState {
  switch (action.type) {
    case UiActionTypes.NotifierShow: {
      return {
        ...state,
        notifierVisible: true,
        notifierMessage: action.payload.message,
        notifierType: action.payload.type,
      };
    }

    case UiActionTypes.NotifierHide: {
      return {
        ...state,
        notifierVisible: false,
        notifierMessage: null,
        notifierType: null,
      };
    }

    case UiActionTypes.FilterDimUpdate: {
      const filterDim = { filterDim: action.payload };
      return { ...state, ...filterDim };
    }

    case UiActionTypes.FilterDimApply: {
      return state;
    }
  }

  return state;
}

export const getUiState = (ui: UiState) => ui;
export const getUiNotifierVisible = (ui: UiState) => ui.notifierVisible;
export const getUiNotifierMessage = (ui: UiState) => ui.notifierMessage;
export const getUiNotifierType = (ui: UiState) => ui.notifierType;
export const getUiFilterDim = (ui: UiState) => ui.filterDim;
