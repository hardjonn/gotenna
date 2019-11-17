import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from '@core/services/config.service';
import { RouterService } from '@core/services/router.service';
import { UiService } from '@core/services/ui.service';
import { ErrorHelper } from '@core/helpers/error.helper';

import { environment } from '@env';
import { UploadModel, ConfigModel } from '@core/models';

@Injectable()
export class UploadService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private errorHelper: ErrorHelper
  ) {}

  upload(payload: UploadModel): Observable<any> {
    const apiBaseUrl = this.apiBaseUrl();
    const apiUrl = `${apiBaseUrl}`;

    const { file } = payload;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post(apiUrl, formData)
      .pipe(catchError(this.errorHelper.handle));
  }

  private apiBaseUrl() {
    const config: ConfigModel = this.configService.getConfig();
    const { api } = config;
    const apiEndpoint = api.endpoints.upload;

    const apiUrl = this.configService.getApiBaseUrl(apiEndpoint);
    return apiUrl;
  }
}
