import NextAuth from 'next-auth';
import { accounts, db, sessions, users } from '@monday-whatsapp/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    sessionsTable: sessions,
    accountsTable: accounts,
  }),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    ...authConfig.callbacks,
  },
});
