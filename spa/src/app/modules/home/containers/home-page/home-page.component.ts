import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@core/store/reducers';
import { ImageModel, PaginatorModel, UiFilterDimModel } from '@core/models';
import { RouterService } from '@app/core/services';
import * as fromImage from '@core/store/selectors/image.selectors';
import * as fromUi from '@core/store/selectors/ui.selectors';
import * as fromPaginator from '@core/store/selectors/paginator.selectors';
import { ImageFxApply } from '@core/store/actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<null | string>;

  imageList$: Observable<ImageModel[]>;
  paginator$: Observable<PaginatorModel>;
  filterDim$: Observable<UiFilterDimModel[]>;

  constructor(private store: Store<AppState>, private router: RouterService) {
    this.loading$ = this.store.pipe(select(fromImage.getImageLoading));
    this.error$ = this.store.pipe(select(fromImage.getImageError));

    this.imageList$ = this.store.pipe(select(fromImage.getImageList));
    this.paginator$ = this.store.pipe(select(fromPaginator.getPaginatorState));
    this.filterDim$ = this.store.pipe(select(fromUi.getUiFilterDim));
  }

  ngOnInit() {}

  filterApply(image: ImageModel) {
    this.store.dispatch(new ImageFxApply(image));
  }
}
