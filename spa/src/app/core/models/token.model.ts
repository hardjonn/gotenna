export interface TokenModel {
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}

export type TokenState = TokenModel | null;
