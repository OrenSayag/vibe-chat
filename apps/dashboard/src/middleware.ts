import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { routing } from '@monday-whatsapp/next-services/server';

const locales = ['en', 'he'];

const publicPages = ['/auth'];
const handleI18nRouting = createMiddleware(routing);

const { auth } = NextAuth(authConfig);
const authMiddleware = auth((req) => {
  return handleI18nRouting(req);
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) return handleI18nRouting(req);
  else return (authMiddleware as any)(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
