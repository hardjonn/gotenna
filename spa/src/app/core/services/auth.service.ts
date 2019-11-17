import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from '@core/services/config.service';
import { RouterService } from '@core/services/router.service';
import { UiService } from '@core/services/ui.service';
import { ErrorHelper } from '@core/helpers/error.helper';

import { environment } from '@env';
import { LoginModel, ConfigModel } from '@core/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private errorHelper: ErrorHelper
  ) {}

  login(payload: LoginModel): Observable<any> {
    const apiBaseUrl = this.apiBaseUrl();
    const apiUrl = `${apiBaseUrl}/login`;

    return this.http
      .post(apiUrl, payload)
      .pipe(catchError(this.errorHelper.handle));
  }

  private apiBaseUrl() {
    const config: ConfigModel = this.configService.getConfig();
    const { api } = config;
    const apiEndpoint = api.endpoints.auth;

    const apiUrl = this.configService.getApiBaseUrl(apiEndpoint);
    return apiUrl;
  }
}
