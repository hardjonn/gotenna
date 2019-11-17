import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@core/store/reducers';
import { LoginModel } from '@core/models';
import * as fromLogin from '@core/store/selectors/login.selectors';
import { Login } from '@core/store/actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  error$: Observable<null | any>;
  pending$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.error$ = this.store.pipe(select(fromLogin.getLoginError));
    this.pending$ = this.store.pipe(select(fromLogin.getLoginPending));
  }

  onLogin(data: LoginModel) {
    this.store.dispatch(new Login(data));
  }
}
