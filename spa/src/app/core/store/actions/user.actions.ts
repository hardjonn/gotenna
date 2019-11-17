import { Action } from '@ngrx/store';
import { AuthModel } from '@core/models/auth.model';

export enum UserActionTypes {
  Logout = '[Menu] Logout',
  LogoutInterceptor = '[Interceptor 401] Logout',

  UserLoginAuth = '[FX Login] User Logged In',
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class LogoutInterceptor implements Action {
  readonly type = UserActionTypes.LogoutInterceptor;
}

export class UserLoginAuth implements Action {
  readonly type = UserActionTypes.UserLoginAuth;
  constructor(public payload: AuthModel) {}
}

export type UserActions = Logout | LogoutInterceptor | UserLoginAuth;
