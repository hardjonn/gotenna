import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, take } from 'rxjs/operators';

import { AuthModel } from '@core/models/auth.model';
import { StorageService } from '@core/services/storage.service';
import * as fromActions from '@core/store/actions/user.actions';
import { AppState } from '@core/store/reducers';
import { getNavigationPreviousUrl } from '@core/store/selectors/navigation.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private storage: StorageService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  @Effect({ dispatch: false })
  userAuthenticated$ = this.actions$.pipe(
    ofType<fromActions.UserLoginAuth>(
      fromActions.UserActionTypes.UserLoginAuth
    ),
    tap((action: fromActions.UserLoginAuth) => {
      this.storage.saveToken(action.payload.token);
      this.storage.saveUser(action.payload.user);
      this.router.navigate([this.previousUrl]);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<fromActions.Logout>(
      fromActions.UserActionTypes.Logout,
      fromActions.UserActionTypes.LogoutInterceptor
    ),
    tap(() => {
      this.storage.removeToken();
      this.storage.removeUser();
      this.router.navigate(['/']);
    })
  );

  private get previousUrl(): string {
    let previousUrl = '/';

    this.store
      .pipe(select(getNavigationPreviousUrl), take(1))
      .subscribe(result => {
        previousUrl = result;
      });

    return previousUrl;
  }
}
