import { UserState } from '@core/models/user.model';
import { UserActions, UserActionTypes } from '@core/store/actions/user.actions';
import { storageService } from '@core/services/storage.service';

export const initialState: UserState = storageService.getUser();

export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.Logout:
    case UserActionTypes.LogoutInterceptor: {
      return null;
    }
    case UserActionTypes.UserLoginAuth: {
      return {
        ...state,
        ...action.payload.user,
      };
    }
  }

  return state;
}

export const getUserState = (user: UserState) => user;
export const getUserId = (user: UserState) => user && user.id;
export const getUserName = (user: UserState) => user && user.name;
export const getUserEmail = (user: UserState) => user && user.email;
export const getUserRole = (user: UserState) => user && user.role;
export const getUserIsAdmin = (user: UserState) => user && user.isAdmin;
export const getUserIsLoggedIn = (user: UserState) => !!user;
