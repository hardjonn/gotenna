export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginState {
  pending: boolean;
  error: string | null;
}
