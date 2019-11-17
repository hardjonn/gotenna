import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  InterceptorSetup = '[ERROR INTERCEPTOR] Error Setup',
  InterceptorClear = '[ERROR INTERCEPTOR] Error Clear',
  UiNotifierDismiss = '[UI NOTIFIER] Error Dismiss',
}

export class ErrorInterceptorSetup implements Action {
  readonly type = ErrorActionTypes.InterceptorSetup;
  constructor(public payload: any) {}
}

export class ErrorInterceptorClear implements Action {
  readonly type = ErrorActionTypes.InterceptorClear;
}

export class ErrorUiNotifierDismiss implements Action {
  readonly type = ErrorActionTypes.UiNotifierDismiss;
}

export type ErrorActions =
  | ErrorInterceptorClear
  | ErrorInterceptorSetup
  | ErrorUiNotifierDismiss;
