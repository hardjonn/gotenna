import { Action } from '@ngrx/store';

export enum NavigationActionTypes {
  RotateUrl = '[Navigation] Rotate Current and Previous urls',
  GuestGuardRedirect = '[GUEST GUARD] Redirect',
}

export class NavigationRotateUrl implements Action {
  readonly type = NavigationActionTypes.RotateUrl;
  constructor(public payload: string) {}
}

export class NavigationRedirect implements Action {
  readonly type = NavigationActionTypes.GuestGuardRedirect;
  constructor() {}
}

export type NavigationActions = NavigationRotateUrl | NavigationRedirect;
