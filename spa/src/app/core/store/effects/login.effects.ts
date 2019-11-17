import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { exhaustMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

import * as fromServices from '@core/services';
import * as fromActions from '../actions/login.actions';
import * as fromUserActions from '@core/store/actions/user.actions';
import { AuthModel } from '@core/models/auth.model';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: fromServices.AuthService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.LoginActionTypes.Login),
    exhaustMap((action: fromActions.Login) =>
      this.authService.login(action.payload).pipe(
        map(result => new fromActions.LoginSuccess(result)),
        catchError(result =>
          observableOf(new fromActions.LoginFail(result.error))
        )
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<fromActions.LoginSuccess>(fromActions.LoginActionTypes.LoginSuccess),
    switchMap((action: fromActions.LoginSuccess) =>
      observableOf(new fromUserActions.UserLoginAuth(action.payload))
    )
  );
}

export const loginEffects: any[] = [LoginEffects];
