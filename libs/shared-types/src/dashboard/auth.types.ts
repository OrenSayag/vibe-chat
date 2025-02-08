export enum LoginType {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

export type User = {
  mail: string;
  image?: string | null;
  name?: string | null;
  id: string;
};

export type LoginForm = { username: string; password: string };

export enum CredentialsLoginErrorKind {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USERNAME_EXISTS = 'USERNAME_EXISTS',
}
