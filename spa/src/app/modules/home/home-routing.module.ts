import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './containers/home-page/home-page.component';
import { ImageLoadResolver } from '@app/core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve: { resolve: ImageLoadResolver },
    runGuardsAndResolvers: 'paramsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
