import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Params, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState } from '@core/store/reducers';
import {
  getRouterData,
  getRouterParamId,
  getRouterParamPage,
  getRouterParamByName,
  getRouterQueryByName,
} from '@core/store/selectors';

@Injectable()
export class RouterService {
  constructor(private store: Store<AppState>) {}

  getRoutedData(): Data | null {
    let data = null;

    this.store.pipe(select(getRouterData), take(1)).subscribe(result => {
      data = result;
    });

    return data;
  }

  getRoutedId(): string {
    let id = '0';

    this.store.pipe(select(getRouterParamId), take(1)).subscribe(result => {
      id = result;
    });

    return id;
  }

  getRoutedPage(): string {
    let page = '1';

    this.store.pipe(select(getRouterParamPage), take(1)).subscribe(result => {
      page = result;
    });

    return page;
  }

  getRoutedParamByName(paramName: string): any {
    let param = '';

    this.store
      .pipe(select(getRouterParamByName(paramName)), take(1))
      .subscribe(result => {
        param = result;
      });

    return param;
  }

  getRoutedQueryByName(paramName: string): any {
    let param = '';

    this.store
      .pipe(select(getRouterQueryByName(paramName)), take(1))
      .subscribe(result => {
        param = result;
      });

    return param;
  }
}
