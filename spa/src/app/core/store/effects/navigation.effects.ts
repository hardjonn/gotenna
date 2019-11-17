import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  ROUTER_NAVIGATION,
  ROUTER_CANCEL,
  RouterNavigationAction,
} from '@ngrx/router-store';

import { Observable, of as observableOf } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import * as fromActions from '@core/store/actions';

@Injectable()
export class NavigationEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect()
  routerNavigation$: Observable<Action> = this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
    switchMap(action => {
      return observableOf(
        new fromActions.NavigationRotateUrl(action.payload.routerState.url)
      );
    })
  );

  @Effect({ dispatch: false })
  routerCancel$: Observable<Action> = this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_CANCEL),
    tap(() => {
      // this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  routerRedirect$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.NavigationRedirect>(
      fromActions.NavigationActionTypes.GuestGuardRedirect
    ),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
}
