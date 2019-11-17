import { Injectable } from '@angular/core';

import { TokenState } from '@core/models/token.model';
import { UserState } from '@core/models/user.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage: Storage;
  private prefix = 'gp_tenna_';

  constructor() {
    this.storage = localStorage;
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(`${this.prefix}${key}`);
  }

  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(`${this.prefix}${key}`));
  }

  getToken(): TokenState {
    return this.getItem('token');
  }

  saveToken(token: TokenState): void {
    this.setItem('token', token);
  }

  removeToken(): void {
    this.removeItem('token');
  }

  getUser(): UserState {
    return this.getItem('user');
  }

  saveUser(user: UserState): void {
    this.setItem('user', user);
  }

  removeUser(): void {
    this.removeItem('user');
  }
}

export const storageService = new StorageService();
