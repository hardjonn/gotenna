import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material';

import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState } from '@core/store/reducers';
import { NotifierComponent } from '@shared/components/notifier/notifier.component';
import { ErrorUiNotifierDismiss } from '@core/store/actions';
import * as fromUi from '@core/store/selectors/ui.selectors';
import { UiNotifierTypes } from '@core/models';

@Injectable()
export class UiService {
  private snackBarRef: MatSnackBarRef<NotifierComponent>;
  private snackBarSubscription: Subscription;

  message$: Observable<string | null>;
  type$: Observable<UiNotifierTypes | null>;

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.message$ = this.store.pipe(select(fromUi.getUiNotifierMessage));
    this.type$ = this.store.pipe(select(fromUi.getUiNotifierType));
  }

  notifierShow() {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.data = {
      message$: this.message$,
      type$: this.type$,
    };

    this.snackBarRef = this.snackBar.openFromComponent(
      NotifierComponent,
      snackBarConfig
    );

    this.snackBarSubscription = this.snackBarRef.instance.dismissEvent.subscribe(
      () => {
        this.store.dispatch(new ErrorUiNotifierDismiss());
      }
    );
  }

  notifierHide() {
    this.snackBar.dismiss();
    if (this.snackBarSubscription) {
      this.snackBarSubscription.unsubscribe();
    }
  }
}
