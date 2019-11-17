import { Action } from '@ngrx/store';
import { LoginModel } from '@core/models/login.model';

export enum LoginActionTypes {
  Login = '[Login Page] Login',
  LoginFail = '[Auth API] Login Fail',
  LoginSuccess = '[Auth API] Login Success',
}

export class Login implements Action {
  readonly type = LoginActionTypes.Login;
  constructor(public payload: LoginModel) {}
}

export class LoginFail implements Action {
  readonly type = LoginActionTypes.LoginFail;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LoginSuccess;
  constructor(public payload: any) {}
}

export type LoginActions = Login | LoginFail | LoginSuccess;
