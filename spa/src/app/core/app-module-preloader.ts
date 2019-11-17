import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of as ObservableOf } from 'rxjs';

export class AppModulePreloader implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? load() : ObservableOf(null);
  }
}
