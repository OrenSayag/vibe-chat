import { AuthError, NextAuthConfig, User } from 'next-auth';
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

        // Map the response data to the expected user object structure
        const userData = resBody.data;
        const returnVal: User = {
          id: userData.id,
          name: userData.name,
          email: userData.mail,
          image: userData.image,
        };
        return returnVal;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: token.sub }; // Save id to token as docs says: https://next-auth.js.org/configuration/callbacks
      }
      return token;
    },
    session: ({ session, token }) => {
      const returnValue = {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string, // Get id from token instead
        },
      };
      return returnValue;
    },
  },
} satisfies NextAuthConfig;
