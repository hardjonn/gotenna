import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromStore from '@core/store';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private store: Store<fromStore.AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUserIsLoggedIn),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.store.dispatch(new fromStore.NavigationRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
