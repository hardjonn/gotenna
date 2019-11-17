import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of as observableOf, from } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import * as fromActions from '@core/store/actions';
import { UiNotifierTypes } from '@core/models';

@Injectable()
export class ErrorEffects {
  constructor(private action$: Actions) {}

  @Effect()
  errorSetup$: Observable<Action> = this.action$.pipe(
    ofType<fromActions.ErrorInterceptorSetup>(
      fromActions.ErrorActionTypes.InterceptorSetup
    ),
    map(action => action.payload),
    map(payload => [payload.message || null, payload.error || null]),
    map(messages => messages.join(' ')),
    switchMap(message =>
      observableOf(
        new fromActions.UiNotifierShow({ message, type: UiNotifierTypes.Error })
      )
    )
  );

  @Effect()
  errorClear$: Observable<Action> = this.action$.pipe(
    ofType<
      fromActions.ErrorInterceptorClear | fromActions.ErrorUiNotifierDismiss
    >(
      fromActions.ErrorActionTypes.InterceptorClear,
      fromActions.ErrorActionTypes.UiNotifierDismiss
    ),
    switchMap(() => observableOf(new fromActions.UiNotifierHide()))
  );
}
