import { TokenState } from './token.model';
import { UserState } from './user.model';

export interface AuthModel {
  user: UserState;
  token: TokenState;
}
