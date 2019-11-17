import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { ConfigService } from '@core/services/config.service';
import { RouterService } from '@core/services/router.service';
import { UiService } from '@core/services/ui.service';
import { ErrorHelper } from '@core/helpers/error.helper';
import { ImageModel, ConfigModel } from '@core/models';

@Injectable()
export class ImageService {
  constructor(
    private http: HttpClient,
    private router: RouterService,
    private configService: ConfigService,
    private uiService: UiService,
    private errorHelper: ErrorHelper
  ) {}

  load() {
    const page = this.router.getRoutedPage();
    const dims = this.router.getRoutedParamByName('dims');

    let params = { page };

    if (dims) {
      params = { ...params, ...{ dims } };
    }

    const apiBaseUrl = this.apiBaseUrl();
    const apiUrl = `${apiBaseUrl}/list`;

    const options = {
      params,
    };

    return this.http
      .get(apiUrl, options)
      .pipe(catchError(this.errorHelper.handle));
  }

  fxApply(image: ImageModel) {
    const apiBaseUrl = this.apiBaseUrl();
    const apiUrl = `${apiBaseUrl}/fx`;

    return this.http
      .post(apiUrl, image)
      .pipe(catchError(this.errorHelper.handle));
  }

  private apiBaseUrl() {
    const config: ConfigModel = this.configService.getConfig();
    const { api } = config;
    const apiEndpoint = api.endpoints.image;

    const apiUrl = this.configService.getApiBaseUrl(apiEndpoint);
    return apiUrl;
  }
}
