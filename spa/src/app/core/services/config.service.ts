import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';

import { mergeMap, take, catchError } from 'rxjs/operators';

import { ErrorHelper } from '@core/helpers/error.helper';
import { AppState } from '@core/store/reducers';
import { ConfigModel } from '@core/models/config.model';
import { ConfigInit } from '@core/store/actions';
import { getConfigSection, getConfig } from '@core/store/selectors';
import { of as ObservableOf } from 'rxjs';

@Injectable()
export class ConfigService {
  static settings: ConfigModel;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private errorHelper: ErrorHelper
  ) {}

  load(uri: string) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(uri)
        .pipe(
          mergeMap((response: ConfigModel) => {
            ConfigService.settings = response;

            const apiBaseUrl = this.getApiBaseUrl();
            const apiUrl = `${apiBaseUrl}/get`;

            // return this.http.get(apiUrl);
            return ObservableOf({});
          })
        )
        .toPromise()
        .then((response: ConfigModel) => {
          ConfigService.settings = { ...ConfigService.settings, ...response };

          this.store.dispatch(new ConfigInit(ConfigService.settings));

          resolve();
        })
        .catch((response: any) => {
          reject(`Failed to load config file from ${uri}`);
        });
    });
  }

  getConfigSection(sectionName: string): Partial<ConfigModel> {
    let section = null;

    this.store
      .pipe(select(getConfigSection(sectionName)), take(1))
      .subscribe(result => {
        section = result;
      });

    return section;
  }

  getConfig(): ConfigModel {
    let config = null;

    this.store.pipe(select(getConfig), take(1)).subscribe(result => {
      config = result;
    });

    return config;
  }

  save(config: ConfigModel) {
    const apiBaseUrl = this.getApiBaseUrl();
    const apiUrl = `${apiBaseUrl}/save`;

    return this.http
      .post(apiUrl, config)
      .pipe(catchError(this.errorHelper.handle));
  }

  getApiBaseUrl(apiEndpoint = '') {
    const apiConf = ConfigService.settings.api;
    const apiHost = apiConf.host;
    const apiVersion = apiConf.version;

    const apiUrl = `${apiHost}/${apiVersion}/${apiEndpoint}`;
    return apiUrl;
  }
}

export function initConfig(appConfigService: ConfigService) {
  return (): Promise<any> => {
    return appConfigService.load('assets/config/config.json');
  };
}
