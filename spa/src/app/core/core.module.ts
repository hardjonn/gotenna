import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { environment } from '@env';
import { reducers, rootEffects } from '@core/store';
import { metaReducers } from '@core/store/reducers/meta.reducer';
import { CustomSerializer } from '@core/store/reducers/router.reducer';

import * as fromGuards from '@core/guards';
import * as fromResolvers from '@core/resolvers';
import * as fromServices from '@core/services';
import * as fromHelpers from '@core/helpers';
import * as fromInterceptors from '@core/interceptors';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    EffectsModule.forRoot(rootEffects),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  exports: [],
  providers: [
    fromServices.PaginatorService,
    fromServices.RouterService,
    fromServices.UiService,
    fromServices.ConfigService,
    fromServices.ImageService,
    fromServices.UploadService,
    fromGuards.AdminGuard,
    fromGuards.GuestGuard,
    fromHelpers.ErrorHelper,
    fromResolvers.ImageLoadResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromInterceptors.TokenInterceptor,
      multi: true,
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromInterceptors.CacheInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromInterceptors.ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule already loaded. Import in root module only');
    }
  }
}
