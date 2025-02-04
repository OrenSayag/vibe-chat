import { MainLayout } from '@monday-whatsapp/components';
import { auth, signOut } from '../../../auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'VibeChat - Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  }
  const onSignOut = async () => {
    'use server';
    await signOut();
  };
  return (
    <MainLayout
      headerProps={{
        profileName: session.user?.name ?? '',
        avatarSrc: session.user?.image ?? '',
        signOut: async () => {
          'use server';
          await onSignOut();
        },
      }}
    >
      {children}
    </MainLayout>
  );
}
