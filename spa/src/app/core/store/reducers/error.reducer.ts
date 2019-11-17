import { ErrorState } from '@core/models';
import { ErrorActionTypes, ErrorActions } from '@core/store/actions';

const initialState: ErrorState = {
  http: null,
};

export function reducer(state = initialState, action: ErrorActions) {
  switch (action.type) {
    case ErrorActionTypes.InterceptorSetup: {
      return { ...state, http: action.payload };
    }

    case ErrorActionTypes.UiNotifierDismiss:
    case ErrorActionTypes.InterceptorClear: {
      return { ...state, http: null };
    }
  }

  return state;
}

export const getErrorState = (error: ErrorState) => error;
export const getErrorHttp = (error: ErrorState) => error.http;
