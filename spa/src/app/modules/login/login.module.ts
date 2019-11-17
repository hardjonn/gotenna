import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  storeFeatureName,
  reducers,
  LOGIN_REDUCER_TOKEN,
  getReducers,
} from '@core/store/reducers/login.reducer';
import { loginEffects } from '@core/store/effects';

import { SharedModule } from '@shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature(storeFeatureName, LOGIN_REDUCER_TOKEN),
    EffectsModule.forFeature(loginEffects),
  ],
  providers: [
    {
      provide: LOGIN_REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
})
export class LoginModule {}
