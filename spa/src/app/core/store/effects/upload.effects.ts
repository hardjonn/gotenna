import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { exhaustMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

import * as fromServices from '@core/services';
import * as fromActions from '@core/store/actions';
import { UploadModel, UiNotifierTypes } from '@core/models';

@Injectable()
export class UploadEffects {
  constructor(
    private actions$: Actions,
    private uploadService: fromServices.UploadService
  ) {}

  @Effect()
  upload$ = this.actions$.pipe(
    ofType<fromActions.Upload>(fromActions.UploadActionTypes.Upload),
    exhaustMap((action: fromActions.Upload) =>
      this.uploadService.upload(action.payload).pipe(
        map(result => new fromActions.UploadSuccess(result)),
        catchError(result =>
          observableOf(new fromActions.UploadFail(result.error))
        )
      )
    )
  );

  @Effect()
  uploadSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.UploadSuccess>(
      fromActions.UploadActionTypes.UploadSuccess
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

export const uploadEffects: any[] = [UploadEffects];
