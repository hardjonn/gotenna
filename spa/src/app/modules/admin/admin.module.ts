import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  storeFeatureName,
  reducers,
  UPLOAD_REDUCER_TOKEN,
  getReducers,
} from '@core/store/reducers/upload.reducer';

import { SharedModule } from '@shared/shared.module';
import { uploadEffects } from '@core/store/effects';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './containers/admin-page/admin-page.component';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature(storeFeatureName, UPLOAD_REDUCER_TOKEN),
    EffectsModule.forFeature(uploadEffects),
  ],
  providers: [
    {
      provide: UPLOAD_REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
})
export class AdminModule {}
