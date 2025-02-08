import { Header } from '@vibe-chat/components';
import { auth, signOut } from '../../../auth';
import { redirect } from '@vibe-chat/next-services/server';

export const metadata = {
  title: 'VibeChat - Create Organization',
};

export default async function CreateOrganizationLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();
  if (!session) {
    redirect({ href: '/auth/login', locale });
  }

  const onSignOut = async () => {
    'use server';
    await signOut();
  };

  return (
    <>
      <Header
        profileName={session!.user?.name ?? ''}
        avatarSrc={session!.user?.image ?? ''}
        signOut={async () => {
          'use server';
          await onSignOut();
        }}
      />
      {children}
    </>
  );
}
