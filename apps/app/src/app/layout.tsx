import './global.css';
import "@vibe/core/tokens";

export const metadata = {
  title: 'monday Chat',
  description: 'Chat within monday',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
