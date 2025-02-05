import { AuthError, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const appBaseUrl = process.env['DASHBOARD_BASE_URL'];

if (!appBaseUrl) {
  throw new Error('Missing env variable DASHBOARD_BASE_URL');
}

class InvalidCredentials extends AuthError {
  public readonly kind = 'signIn';

  constructor(message: string) {
    super(message);
    this.type = 'CredentialsSignin';
  }
}
export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
        type: {},
        redirect: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${appBaseUrl}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
            type: credentials.type,
          }),
        });
        const resBody = await res.json();
        if (res.status === 401) {
          throw new InvalidCredentials(resBody.message);
        }
        if (!res.ok) {
          throw new InvalidCredentials(`Error logging in|||`);
        }
        return resBody.data;
      },
    }),
  ],
} satisfies NextAuthConfig;
