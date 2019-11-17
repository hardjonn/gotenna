import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState } from '@core/store/reducers';
import { ImageLoad } from '@core/store/actions';

@Injectable()
export class ImageLoadResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<boolean> {
    this.store.dispatch(new ImageLoad());

    return observableOf(true);
  }
}
