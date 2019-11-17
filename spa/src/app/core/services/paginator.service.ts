import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState } from '@core/store/reducers';

@Injectable()
export class PaginatorService {
  constructor(private store: Store<AppState>) {}
}
