import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import {
  RouterStateUrl,
  NavigationState,
  UserState,
  PaginatorState,
  UiState,
  ErrorState,
  ConfigState,
  ImageState,
} from '@core/models';

import * as fromNavigation from './navigation.reducer';
import * as fromUser from './user.reducer';
import * as fromPaginator from './paginator.reducer';
import * as fromUi from './ui.reducer';
import * as fromError from './error.reducer';
import * as fromConfig from './config.reducer';
import * as fromImage from './image.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  navigation: NavigationState;
  user: UserState;
  paginator: PaginatorState;
  ui: UiState;
  error: ErrorState;
  config: ConfigState;
  image: ImageState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  navigation: fromNavigation.reducer,
  user: fromUser.reducer,
  paginator: fromPaginator.reducer,
  ui: fromUi.reducer,
  error: fromError.reducer,
  config: fromConfig.reducer,
  image: fromImage.reducer,
};

export const getRouterFeatureState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const getNavigationFeatureState = createFeatureSelector<NavigationState>(
  'navigation'
);

export const getPaginatorFeatureState = createFeatureSelector<PaginatorState>(
  'paginator'
);

export const getConfigFeatureState = createFeatureSelector<ConfigState>(
  'config'
);

export const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUiFeatureState = createFeatureSelector<UiState>('ui');

export const getErrorFeatureState = createFeatureSelector<ErrorState>('error');

export const getImageFeatureState = createFeatureSelector<ImageState>('image');
