import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromStore from '@core/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  userIsLoggedIn$: Observable<boolean>;
  userIsAdmin$: Observable<boolean>;

  configStatus$: Observable<string | null>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromStore.AppState>
  ) {
    this.userIsLoggedIn$ = this.store.pipe(select(fromStore.getUserIsLoggedIn));
    this.userIsAdmin$ = this.store.pipe(select(fromStore.getUserIsAdmin));
  }

  ngOnInit() {}

  onLogout() {
    this.store.dispatch(new fromStore.Logout());
  }
}
