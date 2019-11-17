import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppState } from '@core/store/reducers';
import {
  ErrorInterceptorSetup,
  ErrorInterceptorClear,
} from '@core/store/actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(new ErrorInterceptorClear());

    return next.handle(request).pipe(
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          this.store.dispatch(new ErrorInterceptorSetup(response));
        }

        return throwError(response);
      })
    );
  }
}
