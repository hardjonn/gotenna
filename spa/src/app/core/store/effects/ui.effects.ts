import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of as observableOf } from 'rxjs';
import { tap, delay, switchMap, filter } from 'rxjs/operators';

import { UiService } from '@core/services/ui.service';
import * as fromActions from '@core/store/actions';
import { AppState } from '@core/store/reducers';
import { UiNotifierTypes } from '@core/models';

@Injectable()
export class UiEffects {
  constructor(
    private action$: Actions,
    private uiService: UiService,
    private store: Store<AppState>
  ) {}

  @Effect({ dispatch: false })
  notifierShow$ = this.action$.pipe(
    ofType<fromActions.UiNotifierShow>(fromActions.UiActionTypes.NotifierShow),
    tap(() => {
      this.uiService.notifierShow();
    }),
    delay(3000),
    tap(action => {
      if (action.payload.type === UiNotifierTypes.Ok) {
        this.store.dispatch(new fromActions.UiNotifierHide());
      }
    })
  );

  @Effect({ dispatch: false })
  notifierHide$ = this.action$.pipe(
    ofType<fromActions.UiNotifierHide>(fromActions.UiActionTypes.NotifierHide),
    tap(() => {
      this.uiService.notifierHide();
    })
  );
}
