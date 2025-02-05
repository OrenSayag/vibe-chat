import { ThemeProvider } from '@monday-whatsapp/components';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import NotFound from './not-found';
import { routing } from '@monday-whatsapp/next-services/server';

export const metadata = {
  title: 'VibeChat',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  const notFound = !routing.locales.includes(params.locale as any);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={params.locale ?? 'en'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {notFound && <NotFound />}
          {!notFound && <ThemeProvider>{children}</ThemeProvider>}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
