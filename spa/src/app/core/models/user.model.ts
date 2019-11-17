export interface UserModel {
  id: number;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

export type UserState = UserModel | null;
