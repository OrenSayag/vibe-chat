import NextAuth, { AuthError, CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {
  accounts,
  createUser,
  db,
  getUserByLogin,
  sessions,
  users,
} from '@monday-whatsapp/db';
import {
  CredentialsLoginErrorKind,
  LoginType,
  User,
} from '@monday-whatsapp/shared-types';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

class InvalidCredentials extends AuthError {
  public readonly kind = 'signIn';

  constructor(message: string) {
    super(message);
    this.type = 'CredentialsSignin';
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    sessionsTable: sessions,
    accountsTable: accounts,
  }),
  // debug: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
        type: {},
        redirect: {},
      },
      authorize: async (credentials) => {
        try {
          let user: null | User = null;

          switch (credentials.type as LoginType) {
            case LoginType.SIGN_UP:
              user = (
                await getUserByLogin({
                  loginForm: {
                    username: credentials.username as string,
                    password: credentials.password as string,
                  },
                })
              ).user;
              if (user) {
                throw new InvalidCredentials(
                  CredentialsLoginErrorKind.USERNAME_EXISTS
                );
              }
              await createUser({
                username: credentials.username as string,
                password: credentials.password as string,
              });
              user = {
                mail: credentials.username as string,
              };
              break;
            case LoginType.SIGN_IN:
              user = (
                await getUserByLogin({
                  loginForm: {
                    username: credentials.username as string,
                    password: credentials.password as string,
                  },
                })
              ).user;
              if (!user) {
                throw new InvalidCredentials(
                  CredentialsLoginErrorKind.INVALID_CREDENTIALS
                );
              }
              break;
          }

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
