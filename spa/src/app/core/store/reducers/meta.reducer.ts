import { ActionReducer, MetaReducer } from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env';
import * as fromRoot from './index';

export function logger(
  reducer: ActionReducer<fromRoot.AppState>
): ActionReducer<fromRoot.AppState> {
  return (state: fromRoot.AppState, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<
  fromRoot.AppState
>[] = !environment.production ? [logger, storeFreeze] : [];
