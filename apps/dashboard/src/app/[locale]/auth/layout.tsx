import { auth } from '../../../auth';
import { redirect } from '@monday-whatsapp/next-services/server';

export default async function AuthLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  if (session) {
    redirect({
      href: '/dashboard',
      locale,
    });
  }

  return children;
}
