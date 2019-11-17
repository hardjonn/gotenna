import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { ImageCardsComponent } from './components/image-cards/image-cards.component';
import { FilterDimsComponent } from './components/filter-dims/filter-dims.component';

@NgModule({
  declarations: [HomePageComponent, ImageCardsComponent, FilterDimsComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
