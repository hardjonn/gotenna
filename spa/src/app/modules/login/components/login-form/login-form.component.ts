import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '@core/models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  private pendingState = false;

  @Input()
  error: null | any;

  @Input()
  set pending(pending: boolean) {
    if (pending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }

    this.pendingState = pending;
  }

  get pending() {
    return this.pendingState;
  }

  @Output()
  login = new EventEmitter<LoginModel>();

  get isDisabled() {
    return this.pendingState || this.loginForm.invalid;
  }

  constructor(private fb: FormBuilder) {
    this.initLoginForm();
  }

  ngOnInit() {}

  initLoginForm() {
    const emailValidators = Validators.compose([
      Validators.required,
      Validators.email,
    ]);

    const passwordValidators = Validators.compose([Validators.required]);

    this.loginForm = this.fb.group({
      email: [null, emailValidators],
      password: [null, passwordValidators],
    });
  }

  submit() {
    const data: LoginModel = this.loginForm.value;

    if (this.loginForm.valid) {
      this.login.emit(data);
    }
  }
}
