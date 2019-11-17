import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppModulePreloader } from '@core/app-module-preloader';
import * as fromGuards from '@core/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    data: { preload: true },
  },
  {
    path: 'page/:page',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    data: { preload: true },
  },
  {
    path: 'dims/:dims',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    data: { preload: true },
  },
  {
    path: 'dims/:dims/page/:page',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    data: { preload: true },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [fromGuards.GuestGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [fromGuards.AdminGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: AppModulePreloader,
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
  providers: [AppModulePreloader],
})
export class AppRoutingModule {}
