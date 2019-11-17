import { EntityState } from '@ngrx/entity';

export interface PaginationConfigModel {
  pagesPerRange: number;
  perPageList: number[];
  perPageDefault: number;
}

export interface ConfigApiModel {
  host: string;
  version: string;
  endpoints: {
    auth: string;
    image: string;
    upload: string;
  };
}

export interface ConfigModel {
  api: ConfigApiModel;
  pagination: PaginationConfigModel;
}

export type ConfigState = ConfigModel | null;
