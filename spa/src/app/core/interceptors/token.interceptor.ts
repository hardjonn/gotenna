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

import { StorageService } from '@core/services/storage.service';
import { TokenState } from '@core/models';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: TokenState = this.storage.getToken();

    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${token.accessToken}`
        ),
      });

      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
