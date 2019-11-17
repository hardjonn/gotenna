import { NavigationState } from '@core/models/navigation.model';
import {
  NavigationActionTypes,
  NavigationActions,
} from '@core/store/actions/navigation.actions';

const initialState: NavigationState = {
  previousUrl: '/',
  currentUrl: '/',
};

export function reducer(
  state = initialState,
  action: NavigationActions
): NavigationState {
  switch (action.type) {
    case NavigationActionTypes.RotateUrl: {
      return {
        ...state,
        previousUrl: state.currentUrl,
        currentUrl: action.payload,
      };
    }
  }

  return state;
}

export const getNavigationState = (state: NavigationState) => state;
export const getNavigationCurrentUrl = (state: NavigationState) =>
  state.currentUrl;
export const getNavigationPreviousUrl = (state: NavigationState) =>
  state.previousUrl;
