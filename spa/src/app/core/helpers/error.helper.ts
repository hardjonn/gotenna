import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHelper {
  public handle(event: any): Observable<never> {
    let errorMessage: string;

    if (event instanceof Error) {
      // client side
      errorMessage = event.message;
    } else {
      // server side
      errorMessage = event;
    }

    return throwError(errorMessage);
  }
}
