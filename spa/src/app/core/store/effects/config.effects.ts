import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of as observableOf } from 'rxjs';
import {
  map,
  catchError,
  exhaustMap,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';

import { ConfigService } from '@core/services';
import * as fromActions from '@core/store/actions';
import { ConfigModel, UiNotifierTypes } from '@core/models';

@Injectable()
export class ConfigEffects {
  constructor(
    private actions$: Actions,
    private configService: ConfigService
  ) {}

  @Effect()
  save$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ConfigSave>(fromActions.ConfigActionTypes.Save),
    exhaustMap((action: fromActions.ConfigSave) =>
      this.configService.save(action.payload).pipe(
        map((result: ConfigModel) => new fromActions.ConfigSaveSuccess(result)),
        catchError(result =>
          observableOf(new fromActions.ConfigSaveFail(result.error))
        )
      )
    )
  );

  @Effect()
  actionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ConfigSaveSuccess>(
      fromActions.ConfigActionTypes.SaveSuccess
    ),
    switchMap(() =>
      observableOf(
        new fromActions.UiNotifierShow({
          message: 'Success',
          type: UiNotifierTypes.Ok,
        })
      )
    )
  );
}

export const configEffects: any[] = [ConfigEffects];
