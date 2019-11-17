import { EntityState } from '@ngrx/entity';
import { PaginatorModel } from '@core/models/paginator.model';
import { UiFilterDimModel } from '@core/models/ui.model';

export interface ImageModel {
  id: number;
  url: string;
  imageId: number;
  width: number;
  height: number;
  filterGrayScale: boolean;
  filterBlur: number;
}

export interface ImageState extends EntityState<ImageModel> {
  loading: boolean;
  error: any | null;
}

export interface ImageResponseModel {
  imageList: ImageModel[];
  paginator: PaginatorModel;
  dimFilter: UiFilterDimModel[];
}
