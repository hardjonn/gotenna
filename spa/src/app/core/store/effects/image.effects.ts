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

import { ImageService } from '@core/services';
import * as fromActions from '@core/store/actions';
import { ImageModel, ImageResponseModel, UiNotifierTypes } from '@core/models';

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions, private imageService: ImageService) {}

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ImageLoad | fromActions.UiFilterDimApply>(
      fromActions.ImageActionTypes.Load,
      fromActions.UiActionTypes.FilterDimApply
    ),
    switchMap(() =>
      this.imageService.load().pipe(
        map(
          (response: ImageResponseModel) =>
            new fromActions.ImageLoadSuccess(response)
        ),
        catchError(result =>
          observableOf(new fromActions.ImageLoadFail(result.error))
        )
      )
    )
  );

  @Effect()
  loadSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ImageLoadSuccess>(
      fromActions.ImageActionTypes.LoadSuccess
    ),
    map(action => action.payload),
    mergeMap(payload => [
      new fromActions.PaginatorUpdateImage(payload.paginator),
      new fromActions.UiFilterDimUpdate(payload.dimFilter),
    ])
  );

  @Effect()
  fxApply$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ImageFxApply>(fromActions.ImageActionTypes.FxApply),
    switchMap((action: fromActions.ImageFxApply) =>
      this.imageService.fxApply(action.payload).pipe(
        map(
          (response: ImageModel) =>
            new fromActions.ImageFxApplySuccess(response)
        ),
        catchError(result =>
          observableOf(new fromActions.ImageFxApplyFail(result.error))
        )
      )
    )
  );
}

export const imageEffects: any[] = [ImageEffects];
