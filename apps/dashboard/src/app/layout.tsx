import { ThemeProvider } from '@monday-whatsapp/components';

export const metadata = {
  title: 'VibeChat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
