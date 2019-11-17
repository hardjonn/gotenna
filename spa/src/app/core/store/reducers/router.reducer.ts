import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@core/models/router.model';

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params, data } = state;
    const fixedUrl = url || '/';

    return { url: fixedUrl, queryParams, params, data };
  }
}

export const getRouterState = (
  router: fromRouter.RouterReducerState<RouterStateUrl>
) => router.state;
export const getRouterUrl = (state: RouterStateUrl) => state.url;
export const getRouterData = (state: RouterStateUrl) => state.data;
export const getRouterParams = (state: RouterStateUrl) => state.params;
export const getRouterQueryParams = (state: RouterStateUrl) =>
  state.queryParams;
